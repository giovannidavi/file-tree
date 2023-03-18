import { List } from '@mui/material';
import type { ReactElement } from 'react';

import type { FileListItem } from '../../../../../../types/files';
import { Drop } from '../../../../dnd/drop';
import { DnDTypes } from '../../../../dnd/types';
import { Item } from '../list-item';

export function FileList(props: {
  items: FileListItem[];
  path?: number[];
}): ReactElement {
  return (
    <Drop id={props.path?.join('.')} type={DnDTypes.FOLDER}>
      <List sx={{ width: '100%' }}>
        {props.items.map(listItem => (
          <Item key={listItem.name} listItem={listItem} />
        ))}
      </List>
    </Drop>
  );
}
