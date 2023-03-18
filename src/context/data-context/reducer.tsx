import _ from 'lodash';

import type { FileItem, FileListItem, FolderItem } from '../../types/files';

type Action =
  | { type: 'INIT'; element: FileListItem[] }
  | { type: 'ADD_FILE'; path: number[]; element: Omit<FileItem, 'path'> }
  | { type: 'ADD_FOLDER'; path: number[]; element: Omit<FolderItem, 'path'> }
  | { type: 'REMOVE_ITEM'; path: number[] }
  | { type: 'RENAME_ITEM'; path: number[]; newName: string }
  | { type: 'MOVE_ITEM'; path: number[]; newPath: number[]; index: number };

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
    case 'REMOVE_ITEM':
      return removeItem(state, action.path);
    case 'MOVE_ITEM':
      return moveItem(state, action.path, action.newPath, action.index);
    case 'RENAME_ITEM':
      return renameItem(state, action.path, action.newName);
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

function removeItem(state: FileListItem[], path: number[]): FileListItem[] {
  const newState = _.cloneDeep(state);
  _.unset(newState, path.join('.children.'));

  return dataParser(newState);
}

function moveItem(
  state: FileListItem[],
  path: number[],
  newPath: number[],
  index: number,
): FileListItem[] {
  const newState = _.cloneDeep(state);
  const item = _.get(newState, path.join('.children.'));
  const parent = _.get(newState, newPath.join('.children.'));

  _.unset(newState, path.join('.children.'));
  _.set(newState, newPath.join('.children.'), {
    ...parent,
    children: dataParser(
      insertAt<FileListItem>([...parent.children], index, item),
      parent.path,
    ),
  });

  return dataParser(newState);
}

function renameItem(
  state: FileListItem[],
  path: number[],
  newName: string,
): FileListItem[] {
  const newState = _.cloneDeep(state);
  const item = _.get(newState, path.join('.children.'));

  return _.set(newState, path.join('.children.'), {
    ...item,
    name: newName,
  });
}

export function dataParser(
  data: FileListItem[],
  previousPath: number[] = [],
): FileListItem[] {
  // recursively add path to each item
  return data.filter(Boolean).map((el, index) => {
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

function insertAt<T>(array: T[], index: number, value: T): T[] {
  return _.concat(_.slice(array, 0, index), value, _.slice(array, index));
}
