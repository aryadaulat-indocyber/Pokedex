/**
 * useLanguage
 * Current display language selected in Settings
 */

import { useAppSelector } from '@/redux/hooks';
import { selectLanguage } from '@/redux/slices/settingsSlice';

export function useLanguage(): string {
  return useAppSelector(selectLanguage);
}

export default useLanguage;
