/**
 * ResourceDataView Component
 * Generic renderer able to display ANY PokeAPI resource:
 * - primitives              -> InfoRow
 * - localized arrays        -> text in the selected language
 * - NamedAPIResource/url    -> tappable InfoRow (navigates)
 * - NamedAPIResource[]      -> ResourceChipList
 * - nested objects / arrays -> recursive cards
 */

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Chip, Text } from '@/components/atoms';
import {
  InfoRow,
  ResourceChipList,
  SectionHeader,
} from '@/components/molecules';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { NamedAPIResource } from '@/types/pokeapi';
import { cleanFlavorText, formatKey, formatName } from '@/utils/formatters';
import { pickLocalized } from '@/utils/localization';
import {
  getIdFromUrl,
  isResourceUrl,
  parseResourceUrl,
} from '@/utils/resourceUrl';

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type JsonObject = { [key: string]: Json };

export interface ResourceDataViewProps {
  data: JsonObject;
  language: string;
  onPressUrl: (url: string) => void;
  /** Keys rendered elsewhere by the screen */
  hiddenKeys?: string[];
}

const TEXT_KEYS = [
  'name',
  'description',
  'short_effect',
  'effect',
  'flavor_text',
  'genus',
  'awesome_name',
  'text',
];
const MAX_DEPTH = 3;
const ARRAY_PREVIEW = 8;

const isObject = (value: Json): value is JsonObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isNamedResource = (value: Json): value is { name: string; url: string } =>
  isObject(value) &&
  typeof value.name === 'string' &&
  isResourceUrl(value.url) &&
  Object.keys(value).length === 2;

const isUrlResource = (value: Json): value is { url: string } =>
  isObject(value) &&
  isResourceUrl(value.url) &&
  Object.keys(value).length === 1;

const isLocalizedArray = (value: Json): value is JsonObject[] =>
  Array.isArray(value) &&
  value.length > 0 &&
  value.every(item => isObject(item) && isObject(item.language));

const getLocalizedText = (entries: JsonObject[], language: string) => {
  const entry = pickLocalized(
    entries as unknown as { language: NamedAPIResource }[],
    language,
  ) as unknown as JsonObject | undefined;
  if (!entry) {
    return undefined;
  }
  const key = TEXT_KEYS.find(k => typeof entry[k] === 'string');
  return key ? cleanFlavorText(entry[key] as string) : undefined;
};

const urlLabel = (url: string): string => {
  const parsed = parseResourceUrl(url);
  return parsed ? `${formatName(parsed.resource)} #${parsed.id}` : url;
};

interface NodeProps {
  label: string;
  value: Json;
  depth: number;
  language: string;
  onPressUrl: (url: string) => void;
}

interface ArrayOfObjectsProps extends Omit<NodeProps, 'value'> {
  value: JsonObject[];
}

function ArrayOfObjects({
  label,
  value,
  depth,
  language,
  onPressUrl,
}: ArrayOfObjectsProps) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? value : value.slice(0, ARRAY_PREVIEW);
  return (
    <View style={styles.block}>
      <Text variant="label">{`${label} (${value.length})`}</Text>
      {visible.map((item, index) => (
        <Card key={index} style={styles.nestedCard}>
          {Object.entries(item).map(([key, child]) => (
            <DataNode
              key={key}
              label={formatKey(key)}
              value={child}
              depth={depth + 1}
              language={language}
              onPressUrl={onPressUrl}
            />
          ))}
        </Card>
      ))}
      {value.length > visible.length ? (
        <Chip
          label={`Show all ${value.length}`}
          onPress={() => setExpanded(true)}
          style={styles.showAll}
        />
      ) : null}
    </View>
  );
}

function DataNode({ label, value, depth, language, onPressUrl }: NodeProps) {
  if (value === null || value === undefined || value === '') {
    return <InfoRow label={label} value="—" />;
  }

  if (typeof value === 'boolean') {
    return <InfoRow label={label} value={value ? 'Yes' : 'No'} />;
  }

  if (typeof value === 'number') {
    return <InfoRow label={label} value={value} />;
  }

  if (typeof value === 'string') {
    if (isResourceUrl(value)) {
      return (
        <InfoRow
          label={label}
          value={urlLabel(value)}
          onPress={() => onPressUrl(value)}
        />
      );
    }
    return value.length > 40 ? (
      <View style={styles.block}>
        <Text variant="label">{label}</Text>
        <Text variant="body">{cleanFlavorText(value)}</Text>
      </View>
    ) : (
      <InfoRow label={label} value={formatName(value)} />
    );
  }

  if (isNamedResource(value)) {
    return (
      <InfoRow
        label={label}
        value={formatName(value.name)}
        onPress={() => onPressUrl(value.url)}
      />
    );
  }

  if (isUrlResource(value)) {
    return (
      <InfoRow
        label={label}
        value={urlLabel(value.url)}
        onPress={() => onPressUrl(value.url)}
      />
    );
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <InfoRow label={label} value="None" />;
    }

    if (isLocalizedArray(value)) {
      const text = getLocalizedText(value, language);
      return text ? (
        <View style={styles.block}>
          <Text variant="label">{label}</Text>
          <Text variant="body">{text}</Text>
        </View>
      ) : null;
    }

    if (value.every(isNamedResource)) {
      return (
        <View style={styles.block}>
          <Text variant="label">{`${label} (${value.length})`}</Text>
          <ResourceChipList
            items={value as NamedAPIResource[]}
            onPressItem={item => onPressUrl(item.url)}
          />
        </View>
      );
    }

    if (value.every(isUrlResource)) {
      const items = (value as { url: string }[]).map(v => ({
        url: v.url,
        name: `#${getIdFromUrl(v.url)}`,
      }));
      return (
        <View style={styles.block}>
          <Text variant="label">{`${label} (${value.length})`}</Text>
          <ResourceChipList
            items={items}
            getLabel={item => item.name}
            onPressItem={item => onPressUrl(item.url)}
          />
        </View>
      );
    }

    if (value.every(v => typeof v !== 'object' || v === null)) {
      return <InfoRow label={label} value={value.join(', ')} />;
    }

    if (depth >= MAX_DEPTH) {
      return <InfoRow label={label} value={`${value.length} entries`} />;
    }

    return (
      <ArrayOfObjects
        label={label}
        value={value.filter(isObject)}
        depth={depth}
        language={language}
        onPressUrl={onPressUrl}
      />
    );
  }

  if (isObject(value)) {
    if (depth >= MAX_DEPTH) {
      return null;
    }
    return (
      <View style={styles.block}>
        <Text variant="label">{label}</Text>
        <Card style={styles.nestedCard}>
          {Object.entries(value).map(([key, child]) => (
            <DataNode
              key={key}
              label={formatKey(key)}
              value={child}
              depth={depth + 1}
              language={language}
              onPressUrl={onPressUrl}
            />
          ))}
        </Card>
      </View>
    );
  }

  return null;
}

/**
 * Render order: scalar/link rows first, then text, then lists
 */
const rank = (value: Json): number => {
  if (value === null || typeof value !== 'object') {
    return 0;
  }
  if (isNamedResource(value) || isUrlResource(value)) {
    return 1;
  }
  if (isLocalizedArray(value)) {
    return 2;
  }
  return 3;
};

export default function ResourceDataView({
  data,
  language,
  onPressUrl,
  hiddenKeys = ['id', 'name'],
}: ResourceDataViewProps) {
  const entries = Object.entries(data)
    .filter(([key]) => !hiddenKeys.includes(key))
    .sort(([, a], [, b]) => rank(a) - rank(b));

  const simple = entries.filter(([, v]) => rank(v) <= 1);
  const complex = entries.filter(([, v]) => rank(v) > 1);

  return (
    <View>
      {simple.length ? (
        <>
          <SectionHeader title="Details" />
          <Card>
            {simple.map(([key, value]) => (
              <DataNode
                key={key}
                label={formatKey(key)}
                value={value}
                depth={0}
                language={language}
                onPressUrl={onPressUrl}
              />
            ))}
          </Card>
        </>
      ) : null}
      {complex.map(([key, value]) => (
        <View key={key}>
          <SectionHeader title={formatKey(key)} />
          <DataNode
            label={formatKey(key)}
            value={value}
            depth={0}
            language={language}
            onPressUrl={onPressUrl}
          />
        </View>
      ))}
      {entries.length === 0 ? (
        <Text variant="bodySm" color={colors.textSecondary}>
          No additional data.
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingVertical: spacing.xs,
    gap: spacing.xs,
  },
  nestedCard: {
    marginBottom: spacing.xs,
  },
  showAll: {
    alignSelf: 'flex-start',
  },
});
