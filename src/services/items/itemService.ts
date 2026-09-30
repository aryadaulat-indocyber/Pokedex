/**
 * Item Service
 * Items section of PokeAPI: item, item-attribute, item-category,
 * item-fling-effect, item-pocket
 */

import { POKE_API_ENDPOINTS } from '../api/apiConfig';
import createResourceApi from '../api/createResourceApi';
import {
  Item,
  ItemAttribute,
  ItemCategory,
  ItemFlingEffect,
  ItemPocket,
} from '@/types/pokeapi';

const { ITEMS } = POKE_API_ENDPOINTS;

class ItemService {
  item = createResourceApi<Item>(ITEMS.ITEM);
  attribute = createResourceApi<ItemAttribute>(ITEMS.ITEM_ATTRIBUTE);
  category = createResourceApi<ItemCategory>(ITEMS.ITEM_CATEGORY);
  flingEffect = createResourceApi<ItemFlingEffect>(ITEMS.ITEM_FLING_EFFECT);
  pocket = createResourceApi<ItemPocket>(ITEMS.ITEM_POCKET);
}

export const itemService = new ItemService();
export default itemService;
