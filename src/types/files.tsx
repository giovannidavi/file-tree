export type FileItem = {
  name: string;
  kind: 'file';
  size: string;
  modified: string;
  path: number[];
};

export type FolderItem = {
  name: string;
  kind: 'directory';
  children: FileListItem[];
  path: number[];
};

export type FileListItem = FileItem | FolderItem;
