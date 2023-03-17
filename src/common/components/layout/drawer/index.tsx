import Divider from '@mui/material/Divider';
import { grey } from '@mui/material/colors';

import { DataContextProvider } from '../../../../context/data-context';
import { FileContextProvider } from '../../../../context/file-tree';

import { FileTree } from './file-tree';
import { Header } from './header';
import { StyledDrawer } from './styles';

export const drawerWidth: number = 350;

export function Drawer() {
  return (
    <FileContextProvider>
      <DataContextProvider>
        <StyledDrawer variant="permanent" open>
          <Header />
          <Divider color={grey[800]} variant="middle" />
          <FileTree />
        </StyledDrawer>
      </DataContextProvider>
    </FileContextProvider>
  );
}
