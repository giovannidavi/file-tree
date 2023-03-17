import { UnfoldLess, UnfoldMore } from '@mui/icons-material';
import { Box, Button } from '@mui/material';

import { useFileContext } from '../../../../../context/file-tree';

import { DrawerHeader } from './styles';

export function Header() {
  const {
    triggerExpandAll,
    triggerCollapseAll,
    selectedListItem,
    setSelectedListItem,
  } = useFileContext();

  return (
    <DrawerHeader>
      GD
      <Box display="flex" gap={2}>
        <Button
          color="secondary"
          sx={{ minWidth: 0, px: 1.2 }}
          variant="outlined"
          onClick={triggerExpandAll}
        >
          <UnfoldMore color="secondary" />
        </Button>
        <Button
          color="secondary"
          sx={{ minWidth: 0, px: 1.2 }}
          variant="outlined"
          onClick={triggerCollapseAll}
        >
          <UnfoldLess color="secondary" />
        </Button>
      </Box>
    </DrawerHeader>
  );
}
