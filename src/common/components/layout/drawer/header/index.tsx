import { SyncTwoTone, UnfoldLess, UnfoldMore } from '@mui/icons-material';
import { Box, Button } from '@mui/material';

import { useDataContext } from '../../../../../context/data-context';
import { useFileContext } from '../../../../../context/file-tree';

import { DrawerHeader } from './styles';

export function Header() {
  const { triggerExpandAll, triggerCollapseAll } = useFileContext();
  const { sync, isMutating } = useDataContext();

  return (
    <DrawerHeader>
      Gio Davì
      <Box display="flex" gap={2}>
        <Button
          color="secondary"
          disabled={isMutating}
          sx={{ minWidth: 0, px: 1.2 }}
          variant="outlined"
          onClick={sync}
        >
          <SyncTwoTone color="secondary" />
        </Button>
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
