/**
 * QueryBoundary Component
 * Renders loading / error states for a query and only calls `children`
 * once data is available (fully typed).
 */

import React from 'react';
import { Loading } from '@/components/atoms';
import { StateView } from '@/components/molecules';
import type { UseApiQueryResult } from '@/hooks/useApiQuery';

export interface QueryBoundaryProps<T> {
  query: UseApiQueryResult<T>;
  children: (data: T) => React.ReactNode;
  loadingMessage?: string;
  fullScreen?: boolean;
}

export default function QueryBoundary<T>({
  query,
  children,
  loadingMessage,
  fullScreen = true,
}: QueryBoundaryProps<T>) {
  const { data, error, isLoading, refetch } = query;

  if (data !== undefined) {
    return <>{children(data)}</>;
  }

  if (isLoading) {
    return <Loading message={loadingMessage} fullScreen={fullScreen} />;
  }

  if (error) {
    return (
      <StateView
        icon="info"
        title={
          error.code === 'NOT_FOUND' ? 'Not found' : 'Something went wrong'
        }
        message={error.message}
        actionLabel="Try again"
        onAction={refetch}
        fullScreen={fullScreen}
      />
    );
  }

  return null;
}
