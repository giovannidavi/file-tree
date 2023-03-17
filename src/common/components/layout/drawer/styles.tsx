import { styled } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { grey } from '@mui/material/colors';

import { drawerWidth } from './index';

export const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  overflowX: 'hidden',
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    overflowX: 'hidden',
    backgroundColor: theme.palette.primary.dark,
    color: grey[200],
  },
}));
