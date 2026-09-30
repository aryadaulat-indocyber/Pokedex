/**
 * API Types
 * Generic types used by the API layer
 */

export type ApiErrorCode =
  | 'NOT_FOUND'
  | 'SERVER_ERROR'
  | 'NETWORK_ERROR'
  | 'TIMEOUT'
  | 'REQUEST_ERROR';

export interface ApiError {
  code: ApiErrorCode;
  message: string;
  statusCode: number;
  url?: string;
}

export const isApiError = (error: unknown): error is ApiError =>
  typeof error === 'object' &&
  error !== null &&
  'code' in error &&
  'message' in error &&
  'statusCode' in error;
