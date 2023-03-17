import type { Dispatch, ReactNode, SetStateAction } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

import { useGetFiles } from '../../api/hooks/useGetFiles';
import type { FileItem, FileListItem, FolderItem } from '../../types/files';

import { dataReducer } from './reducer';

type Context = {
  // loading: boolean;
  data: FileListItem[];
  addFile: (item: Omit<FileItem, 'path'>, path: number[]) => void;
  addFolder: (item: Omit<FolderItem, 'path'>, path: number[]) => void;
  // removeItem: (item: FileListItem) => void;
};

export const DataContext = createContext<Context>({} as Context);

export function DataContextProvider(props: { children: ReactNode }) {
  const query = useGetFiles<FileListItem[]>('files-list');

  const [data, dispatch] = useReducer(dataReducer, []);

  const addFolder = useCallback(
    (element: Omit<FolderItem, 'path'>, path: number[]) => {
      dispatch({ type: 'ADD_FOLDER', path, element });
    },
    [dispatch],
  );

  const addFile = useCallback(
    (element: Omit<FileItem, 'path'>, path: number[]) => {
      dispatch({ type: 'ADD_FILE', path, element });
    },
    [dispatch],
  );

  const init = useCallback(
    (element: FileListItem[]) => {
      dispatch({ type: 'INIT', element });
    },
    [dispatch],
  );

  useEffect(() => {
    if (query.data) {
      init(query.data);
    }
  }, [init, query.data]);

  const contextValue = useMemo(
    () => ({
      data,
      addFile,
      addFolder,
    }),
    [data, addFile, addFolder],
  );

  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  return useContext(DataContext);
}
