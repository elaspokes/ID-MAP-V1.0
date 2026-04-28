import { useQuery, useMutation } from 'convex/react';
import type { FunctionReference, FunctionArgs, FunctionReturnType } from 'convex/server';

/**
 * Wrapper around useQuery that returns fallback data when Convex is loading or unavailable.
 */
export function useConvexQuery<T extends FunctionReference<'query'>>(
  query: T,
  args: FunctionArgs<T>,
  fallback: FunctionReturnType<T>,
): { data: FunctionReturnType<T>; isLoading: boolean; isFromConvex: boolean } {
  const result = useQuery(query, args);
  if (result === undefined) {
    return { data: fallback, isLoading: true, isFromConvex: false };
  }
  return { data: result as FunctionReturnType<T>, isLoading: false, isFromConvex: true };
}

export { useQuery, useMutation };
