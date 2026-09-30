/**
 * ContestSection
 * Contest type + contest effect (GET /contest-effect/{id}) + super contest
 * effect (GET /super-contest-effect/{id}) + combos of a move
 */

import React from 'react';
import { View } from 'react-native';
import { Card, Text } from '@/components/atoms';
import { InfoRow, ResourceChipList } from '@/components/molecules';
import type { ResourceKey } from '@/config/resourceRegistry';
import { useResourceByUrl } from '@/hooks/useResource';
import { ContestEffect, Move, SuperContestEffect } from '@/types/pokeapi';
import { formatEffectText, formatName } from '@/utils/formatters';
import { pickLatestLocalized, pickLocalized } from '@/utils/localization';
import { getIdFromUrl } from '@/utils/resourceUrl';

interface ContestSectionProps {
  move: Move;
  language: string;
  openResource: (resource: ResourceKey, idOrName: string | number) => void;
}

export default function ContestSection({
  move,
  language,
  openResource,
}: ContestSectionProps) {
  const contestEffect = useResourceByUrl<ContestEffect>(
    move.contest_effect?.url,
  );
  const superEffect = useResourceByUrl<SuperContestEffect>(
    move.super_contest_effect?.url,
  );
  const combos = move.contest_combos;

  return (
    <Card>
      {move.contest_type ? (
        <InfoRow
          label="Contest type"
          value={formatName(move.contest_type.name)}
          onPress={() =>
            openResource('contest-type', move.contest_type?.name ?? '')
          }
        />
      ) : null}
      {contestEffect.data ? (
        <>
          <InfoRow
            label="Appeal / Jam"
            value={`${contestEffect.data.appeal} / ${contestEffect.data.jam}`}
            onPress={() =>
              openResource('contest-effect', contestEffect.data?.id ?? 0)
            }
          />
          <Text variant="bodySm">
            {formatEffectText(
              pickLocalized(contestEffect.data.effect_entries, language)
                ?.effect,
            )}
          </Text>
        </>
      ) : null}
      {superEffect.data ? (
        <>
          <InfoRow
            label="Super appeal"
            value={superEffect.data.appeal}
            onPress={() =>
              openResource(
                'super-contest-effect',
                getIdFromUrl(move.super_contest_effect?.url ?? ''),
              )
            }
          />
          <Text variant="bodySm">
            {formatEffectText(
              pickLatestLocalized(
                superEffect.data.flavor_text_entries,
                language,
              )?.flavor_text,
            )}
          </Text>
        </>
      ) : null}
      {combos?.normal.use_before?.length ? (
        <View>
          <Text variant="label">Combo: use before</Text>
          <ResourceChipList
            items={combos.normal.use_before}
            onPressItem={item => openResource('move', item.name)}
          />
        </View>
      ) : null}
      {combos?.normal.use_after?.length ? (
        <View>
          <Text variant="label">Combo: use after</Text>
          <ResourceChipList
            items={combos.normal.use_after}
            onPressItem={item => openResource('move', item.name)}
          />
        </View>
      ) : null}
    </Card>
  );
}
