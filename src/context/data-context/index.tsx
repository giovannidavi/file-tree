import type { ReactNode } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import { useGetFiles } from '../../api/hooks/useGetFiles';
import type { FileItem, FileListItem, FolderItem } from '../../types/files';

import { dataReducer } from './reducer';

type Context = {
  isLoading: boolean;
  data: FileListItem[];
  addFile: (item: Omit<FileItem, 'path'>, path: number[]) => void;
  addFolder: (item: Omit<FolderItem, 'path'>, path: number[]) => void;
  removeItem: (path: number[]) => void;
  moveItem: (path: number[], newPath: number[], index: number) => void;
  renameItem: (path: number[], newName: string) => void;
};

export const DataContext = createContext<Context>({} as Context);

export function DataContextProvider(props: { children: ReactNode }) {
  const {
    isLoading,
    data: filesData,
    isSuccess,
  } = useGetFiles<FileListItem[]>('files-list');

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

  const removeItem = useCallback(
    (path: number[]) => {
      dispatch({ type: 'REMOVE_ITEM', path });
    },
    [dispatch],
  );

  const renameItem = useCallback(
    (path: number[], name: string) => {
      dispatch({ type: 'RENAME_ITEM', path, newName: name });
    },
    [dispatch],
  );

  const moveItem = useCallback(
    (path: number[], newPath: number[], index: number) => {
      dispatch({ type: 'MOVE_ITEM', path, newPath, index });
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
    if (filesData && isSuccess) {
      init(filesData);
    }
  }, [init, filesData, isSuccess]);

  const contextValue = useMemo(
    () => ({
      isLoading,
      data,
      addFile,
      addFolder,
      removeItem,
      moveItem,
      renameItem,
    }),
    [isLoading, data, addFile, addFolder, removeItem, moveItem, renameItem],
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
