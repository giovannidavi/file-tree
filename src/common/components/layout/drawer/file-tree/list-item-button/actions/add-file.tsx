import { FileCopyTwoTone } from '@mui/icons-material';
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
import { formatBytes } from '../../../../../../../utils/bytes';

export function AddFile(props: { path: number[] }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [size, setSize] = useState(0);

  const toggle = () => setOpen(o => !o);

  const { addFile } = useDataContext();

  const handleClick = useCallback(() => {
    toggle();
  }, []);

  const handleAdd = useCallback(() => {
    addFile(
      {
        name,
        kind: 'file',
        size: formatBytes(size),
        modified: new Date().toLocaleString(),
      },
      props.path,
    );
    toggle();
  }, [addFile, name, props.path, size]);

  return (
    <>
      <MenuItem onClick={handleClick}>
        <ListItemIcon>
          <FileCopyTwoTone color="primary" />
        </ListItemIcon>
        Add File
      </MenuItem>
      <Dialog open={open} disablePortal onClose={toggle}>
        <DialogTitle>
          <Typography component="span" variant="h3">
            Add File
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
            <TextField
              label="size"
              type="number"
              value={size}
              fullWidth
              onChange={e => setSize(Number(e.target.value))}
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
