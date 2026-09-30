/**
 * Move Service
 * Moves section of PokeAPI: move, move-ailment, move-battle-style,
 * move-category, move-damage-class, move-learn-method, move-target
 */

import { POKE_API_ENDPOINTS } from '../api/apiConfig';
import createResourceApi from '../api/createResourceApi';
import {
  Move,
  MoveAilment,
  MoveBattleStyle,
  MoveCategory,
  MoveDamageClass,
  MoveLearnMethod,
  MoveTarget,
} from '@/types/pokeapi';

const { MOVES } = POKE_API_ENDPOINTS;

class MoveService {
  move = createResourceApi<Move>(MOVES.MOVE);
  ailment = createResourceApi<MoveAilment>(MOVES.MOVE_AILMENT);
  battleStyle = createResourceApi<MoveBattleStyle>(MOVES.MOVE_BATTLE_STYLE);
  category = createResourceApi<MoveCategory>(MOVES.MOVE_CATEGORY);
  damageClass = createResourceApi<MoveDamageClass>(MOVES.MOVE_DAMAGE_CLASS);
  learnMethod = createResourceApi<MoveLearnMethod>(MOVES.MOVE_LEARN_METHOD);
  target = createResourceApi<MoveTarget>(MOVES.MOVE_TARGET);
}

export const moveService = new MoveService();
export default moveService;
