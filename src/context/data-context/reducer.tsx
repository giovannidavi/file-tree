import _ from 'lodash';

import type { FileItem, FileListItem, FolderItem } from '../../types/files';

type Action =
  | { type: 'INIT'; element: FileListItem[] }
  | { type: 'ADD_FILE'; path: number[]; element: Omit<FileItem, 'path'> }
  | { type: 'ADD_FOLDER'; path: number[]; element: Omit<FolderItem, 'path'> }
  | { type: 'REMOVE_FILE'; path: number[] }
  | { type: 'REMOVE_FOLDER'; path: number[] }
  | { type: 'RENAME_FILE'; path: number[]; newName: string }
  | { type: 'RENAME_FOLDER'; path: number[]; newName: string }
  | { type: 'EDIT_FILE_LOCATION'; path: number[]; newPath: number[] }
  | { type: 'EDIT_FOLDER_LOCATION'; path: number[]; newPath: number[] };

export const dataReducer = (
  state: FileListItem[],
  action: Action,
): FileListItem[] => {
  switch (action.type) {
    case 'INIT':
      return dataParser(action.element);
    case 'ADD_FOLDER':
      return addFolder(state, action.path, action.element);
    case 'ADD_FILE':
      return addFile(state, action.path, action.element);
    default:
      return state;
  }
};

function addFile(
  state: FileListItem[],
  path: number[],
  element: Omit<FileItem, 'path'>,
): FileListItem[] {
  const newState = _.cloneDeep(state);
  const parent = _.get(newState, path.join('.children.'));

  return _.set(newState, path.join('.children.'), {
    ...parent,
    children: dataParser([...parent.children, element], parent.path),
  });
}

function addFolder(
  state: FileListItem[],
  path: number[],
  element: Omit<FolderItem, 'path'>,
): FileListItem[] {
  const newState = _.cloneDeep(state);
  const parent = _.get(newState, path.join('.children.'));

  return _.set(newState, path.join('.children.'), {
    ...parent,
    children: dataParser([...parent.children, element], parent.path),
  });
}

export function dataParser(
  data: FileListItem[],
  previousPath: number[] = [],
): FileListItem[] {
  // recursively add path to each item
  return data.map((el, index) => {
    const path = [...previousPath, index];
    if (isDirectory(el)) {
      return { ...el, path, children: dataParser(el.children, path) };
    }

    return { ...el, path };
  });
}

function isDirectory(item: FileListItem): item is FolderItem {
  return item.kind === 'directory';
}
