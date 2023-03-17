import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';

import { useDataContext } from '../../../../../../../context/data-context';

export function AddFolder(props: { path: number[] }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const toggle = () => setOpen(o => !o);

  const { addFolder } = useDataContext();

  const handleClick = useCallback(() => {
    toggle();
  }, []);

  const handleAdd = useCallback(() => {
    addFolder(
      {
        name,
        kind: 'directory',
        children: [],
      },
      props.path,
    );
    toggle();
  }, [addFolder, name, props.path]);

  return (
    <>
      <MenuItem onClick={handleClick}>Add Folder</MenuItem>
      <Dialog open={open} disablePortal onClose={toggle}>
        <DialogTitle>
          <Typography component="span" variant="h3">
            Add Folder
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
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
