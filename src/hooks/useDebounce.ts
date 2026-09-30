/**
 * useDebounce
 * Delay a fast changing value (e.g. search text)
 */

import { useEffect, useState } from 'react';
import { SEARCH_DEBOUNCE_MS } from '@/constants';

export function useDebounce<T>(
  value: T,
  delay: number = SEARCH_DEBOUNCE_MS,
): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounced;
}

export default useDebounce;
