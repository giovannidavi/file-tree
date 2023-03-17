import { List } from '@mui/material';
import type { ReactElement } from 'react';

import type { FileListItem } from '../../../../../../types/files';
import { Item } from '../list-item';

export function FileList(props: { items: FileListItem[] }): ReactElement {
  return (
    <List sx={{ width: '100%' }}>
      {props.items.map(listItem => (
        <Item key={listItem.name} listItem={listItem} />
      ))}
    </List>
  );
}
