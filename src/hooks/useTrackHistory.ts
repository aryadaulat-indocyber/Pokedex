/**
 * useTrackHistory
 * Record a resource in "recently viewed" once it has loaded
 */

import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { addToHistory } from '@/redux/slices/historySlice';
import type { ResourceKey } from '@/config/resourceRegistry';

export function useTrackHistory(
  resource: ResourceKey,
  id?: number,
  name?: string,
) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id !== undefined && name) {
      dispatch(addToHistory({ resource, id, name }));
    }
  }, [dispatch, resource, id, name]);
}

export default useTrackHistory;
