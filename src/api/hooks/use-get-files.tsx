import { useQuery } from '@tanstack/react-query';

import { getFilesList } from '../get/getFilesList';
import { queryOptions } from '../options';

/**
 *
 * @param key string, the query key
 * @param options object, the query options
 *
 * @returns a query hook for the plain many-resource, to be used for non paginated resources.
 */
export function useGetFiles<R>(
  key: string,
  options?: Parameters<typeof useQuery<R, Error, R, string[]>>[2],
) {
  const query = useQuery<R, Error, R, string[]>([key], getFilesList, {
    ...queryOptions,
    ...options,
  });

  if (query.isError) {
    throw new Error(query.error.message ?? 'Unknown error');
  }

  return query;
}
