import { instance } from '../axios';

export async function getFilesList<R>() {
  const { data } = await instance.get<R>('files');

  return data;
}
