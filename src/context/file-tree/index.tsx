import type { Dispatch, ReactNode, SetStateAction } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type Context = {
  selectedListItem: string | null;
  setSelectedListItem: Dispatch<SetStateAction<string | null>>;
  expandAll: number;
  triggerExpandAll: () => void;
  collapseAll: number;
  triggerCollapseAll: () => void;
};

export const FileContext = createContext<Context>({} as Context);

export function FileContextProvider(props: { children: ReactNode }) {
  const [selectedListItem, setSelectedListItem] = useState<string | null>(null);
  const [expandAll, setExpandAll] = useState<number>(0);
  const [collapseAll, setCollapseAll] = useState<number>(0);

  const triggerExpandAll = useCallback(() => {
    setExpandAll(i => i + 1);
  }, []);

  const triggerCollapseAll = useCallback(() => {
    setCollapseAll(i => i + 1);
  }, []);

  const contextValue = useMemo(
    () => ({
      selectedListItem,
      setSelectedListItem,
      expandAll,
      triggerExpandAll,
      collapseAll,
      triggerCollapseAll,
    }),
    [
      collapseAll,
      expandAll,
      selectedListItem,
      triggerCollapseAll,
      triggerExpandAll,
    ],
  );

  return (
    <FileContext.Provider value={contextValue}>
      {props.children}
    </FileContext.Provider>
  );
}

export function useFileContext() {
  return useContext(FileContext);
}
