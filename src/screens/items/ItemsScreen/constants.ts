/**
 * ItemsScreen constants
 */

export type ItemsSegment = 'items' | 'berries' | 'pockets';

export const ITEMS_SEGMENTS: { key: ItemsSegment; label: string }[] = [
  { key: 'items', label: 'Items' },
  { key: 'berries', label: 'Berries' },
  { key: 'pockets', label: 'Bag Pockets' },
];

/** List endpoint backing each segment */
export const SEGMENT_RESOURCE = {
  items: 'item',
  berries: 'berry',
  pockets: 'item-pocket',
} as const;
