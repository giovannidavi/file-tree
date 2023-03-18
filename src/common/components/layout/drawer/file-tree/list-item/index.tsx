import type { ReactElement } from 'react';

import type { FileListItem } from '../../../../../../types/files';
import { FileList } from '../file-list';
import { ListItemButton } from '../list-item-button';

export function Item(props: { listItem: FileListItem }): ReactElement {
  switch (props.listItem.kind) {
    case 'directory':
      return (
        <ListItemButton item={props.listItem}>
          <FileList
            items={props.listItem.children}
            path={props.listItem.path}
          />
        </ListItemButton>
      );
    case 'file':
      return <ListItemButton item={props.listItem} />;
  }
}
