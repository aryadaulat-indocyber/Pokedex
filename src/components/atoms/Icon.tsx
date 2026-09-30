/**
 * Icon Component
 * Lightweight SVG icon set (stroke based, 24x24 grid)
 */

import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';
import { colors } from '@/styles/colors';

export type IconName =
  | 'pokeball'
  | 'lightning'
  | 'bag'
  | 'map'
  | 'grid'
  | 'berry'
  | 'gamepad'
  | 'evolution'
  | 'grass'
  | 'trophy'
  | 'disc'
  | 'globe'
  | 'search'
  | 'heart'
  | 'chevronRight'
  | 'close'
  | 'star'
  | 'sparkles'
  | 'history'
  | 'info'
  | 'book'
  | 'arrowRight';

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  /** Fill the shape (heart / star / sparkles) */
  filled?: boolean;
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
}

const renderIcon = (name: IconName, color: string, filled: boolean) => {
  const fill = filled ? color : 'none';
  switch (name) {
    case 'pokeball':
      return (
        <>
          <Circle cx={12} cy={12} r={9} />
          <Path d="M3 12h6M15 12h6" />
          <Circle cx={12} cy={12} r={3} />
        </>
      );
    case 'lightning':
      return <Path d="M13 2 4 14h7l-1 8 10-13h-7l0-7z" fill={fill} />;
    case 'bag':
      return (
        <>
          <Rect x={4} y={7} width={16} height={14} rx={2} />
          <Path d="M9 7V5a3 3 0 0 1 6 0v2M4 12h16" />
        </>
      );
    case 'map':
      return <Path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15" />;
    case 'grid':
      return (
        <>
          <Rect x={3} y={3} width={7} height={7} rx={1.5} />
          <Rect x={14} y={3} width={7} height={7} rx={1.5} />
          <Rect x={3} y={14} width={7} height={7} rx={1.5} />
          <Rect x={14} y={14} width={7} height={7} rx={1.5} />
        </>
      );
    case 'berry':
      return (
        <>
          <Circle cx={12} cy={14} r={7} fill={fill} />
          <Path d="M12 7c0-3 2-5 5-5 0 3-2 5-5 5z" />
        </>
      );
    case 'gamepad':
      return (
        <>
          <Rect x={2} y={7} width={20} height={11} rx={5} />
          <Path d="M7 10v5M4.5 12.5h5" />
          <Circle cx={16} cy={11} r={0.8} />
          <Circle cx={18} cy={14} r={0.8} />
        </>
      );
    case 'evolution':
      return (
        <Path d="M4 12a8 8 0 0 1 14-5.3M18 3v4h-4M20 12a8 8 0 0 1-14 5.3M6 21v-4h4" />
      );
    case 'grass':
      return (
        <Path d="M3 21h18M6 21c0-5-1-9-3-12 4 2 6 6 6 12M12 21c0-7 1-12 4-16 0 5-1 11-1 16M18 21c0-4 1-7 3-9" />
      );
    case 'trophy':
      return (
        <Path d="M8 3h8v6a4 4 0 0 1-8 0zM8 5H5a3 3 0 0 0 3 5M16 5h3a3 3 0 0 1-3 5M12 13v4M8 21h8M9 17h6v4H9z" />
      );
    case 'disc':
      return (
        <>
          <Circle cx={12} cy={12} r={9} />
          <Circle cx={12} cy={12} r={2.5} />
        </>
      );
    case 'globe':
      return (
        <>
          <Circle cx={12} cy={12} r={9} />
          <Ellipse cx={12} cy={12} rx={4} ry={9} />
          <Path d="M3 12h18" />
        </>
      );
    case 'search':
      return (
        <>
          <Circle cx={11} cy={11} r={7} />
          <Path d="M16.5 16.5 21 21" />
        </>
      );
    case 'heart':
      return (
        <Path
          d="M12 20.5s-7.5-4.6-9.6-9.2A5.3 5.3 0 0 1 12 6.2a5.3 5.3 0 0 1 9.6 5.1c-2.1 4.6-9.6 9.2-9.6 9.2z"
          fill={fill}
        />
      );
    case 'chevronRight':
      return <Path d="M9 6l6 6-6 6" />;
    case 'close':
      return <Path d="M6 6l12 12M18 6 6 18" />;
    case 'star':
      return (
        <Path
          d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"
          fill={fill}
        />
      );
    case 'sparkles':
      return (
        <Path
          d="M10 3l1.8 5.2L17 10l-5.2 1.8L10 17l-1.8-5.2L3 10l5.2-1.8zM18 14l.9 2.1L21 17l-2.1.9L18 20l-.9-2.1L15 17l2.1-.9z"
          fill={fill}
        />
      );
    case 'history':
      return (
        <>
          <Circle cx={12} cy={12} r={9} />
          <Path d="M12 7v5l3 2" />
        </>
      );
    case 'info':
      return (
        <>
          <Circle cx={12} cy={12} r={9} />
          <Path d="M12 11v6M12 7.5v.5" />
        </>
      );
    case 'book':
      return (
        <Path d="M4 5a2 2 0 0 1 2-2h14v15H6a2 2 0 0 0-2 2zM4 20a2 2 0 0 0 2 1h14v-3" />
      );
    case 'arrowRight':
      return <Path d="M5 12h14M13 6l6 6-6 6" />;
  }
};

export default function Icon({
  name,
  size = 24,
  color = colors.textPrimary,
  filled = false,
  strokeWidth = 2,
  style,
}: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      {renderIcon(name, color, filled)}
    </Svg>
  );
}
