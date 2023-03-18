import { EditTwoTone } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  ListItemIcon,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';

import { useDataContext } from '../../../../../../../context/data-context';

export function RenameItem(props: { name: string; path: number[] }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(props.name);

  const toggle = () => setOpen(o => !o);

  const { renameItem } = useDataContext();

  const handleClick = useCallback(() => {
    toggle();
  }, []);

  const handleAdd = useCallback(() => {
    renameItem(props.path, name);
    toggle();
  }, [renameItem, name, props.path]);

  return (
    <>
      <MenuItem onClick={handleClick}>
        <ListItemIcon>
          <EditTwoTone color="primary" />
        </ListItemIcon>
        Rename
      </MenuItem>
      <Dialog open={open} disablePortal onClose={toggle}>
        <DialogTitle>
          <Typography component="span" variant="h3">
            Rename
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box display="flex" gap={2}>
            <TextField
              label="Name"
              value={name}
              fullWidth
              onChange={e => setName(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggle}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd}>
            Rename
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
