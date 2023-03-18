import { List } from '@mui/material';
import type { ReactElement } from 'react';

import type { FileListItem } from '../../../../../../types/files';
import { Drop } from '../../../../dnd/drop';
import { Item } from '../list-item';

export function FileList(props: {
  items: FileListItem[];
  path?: number[];
}): ReactElement {
  return (
    <Drop id={props.path?.join('.')}>
      <List sx={{ width: '100%' }}>
        {props.items.map(listItem => (
          <Item key={listItem.path.join('.')} listItem={listItem} />
        ))}
      </List>
    </Drop>
  );
}
