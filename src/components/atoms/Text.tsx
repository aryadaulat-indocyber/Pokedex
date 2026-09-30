/**
 * Text Component
 * Reusable text component with typography variants
 */

import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { typography, TypographyKey } from '@/styles/typography';

export interface TextProps extends RNTextProps {
  variant?: TypographyKey;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  children: React.ReactNode;
}

export default function Text({
  variant = 'body',
  color,
  align,
  style,
  children,
  ...props
}: TextProps) {
  return (
    <RNText
      style={[
        typography[variant],
        align && { textAlign: align },
        style,
        color ? { color } : null, // color last so it always wins
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}
