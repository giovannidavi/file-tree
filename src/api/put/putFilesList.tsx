import { instance } from '../axios';

export async function putFilesList<T, R>({
  data,
  id,
}: {
  data: T;
  id: number;
}) {
  const response = await instance.put<R>(`files/${id}`, data);

  return response;
}
