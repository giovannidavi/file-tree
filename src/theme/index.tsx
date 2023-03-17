import { createTheme } from '@mui/material';

import { palette } from './palette';
import { typography } from './typography';

export const theme = createTheme({
  typography,
  palette,
  spacing: 6,
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(3px)',
        },
      },
    },
  },
});
