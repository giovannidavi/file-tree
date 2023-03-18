import { DeleteTwoTone } from '@mui/icons-material';
import { ListItemIcon, MenuItem } from '@mui/material';
import { useCallback } from 'react';

import { useDataContext } from '../../../../../../../context/data-context';

export function RemoveItem(props: { path: number[] }) {
  const { removeItem } = useDataContext();

  const handleClick = useCallback(() => {
    removeItem(props.path);
  }, [removeItem, props.path]);

  return (
    <MenuItem onClick={handleClick}>
      <ListItemIcon>
        <DeleteTwoTone color="primary" />
      </ListItemIcon>
      Remove
    </MenuItem>
  );
}
