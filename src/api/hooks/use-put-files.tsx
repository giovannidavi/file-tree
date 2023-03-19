import { useMutation } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { putFilesList } from '../put/putFilesList';

export function usePutFiles<R>() {
  const mutation = useMutation<
    AxiosResponse<{ id: string }, unknown>,
    unknown,
    { id: number; data: R }
  >(['files'], putFilesList);

  if (mutation.isError) {
    throw new Error('Unknown error');
  }

  return mutation;
}
