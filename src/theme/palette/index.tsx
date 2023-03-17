import type { PaletteOptions } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypeBackground {
    default: string;
    contrast: string;
    light: string;
  }
  interface TypeText {
    primary: string;
    secondary: string;
    disabled: string;
    contrast: string;
  }
}

export const palette: PaletteOptions = {
  primary: {
    main: '#5569ff',
    dark: '#162138',
    light: '#b1d8f8',
  },
  secondary: {
    main: '#ffffff',
    dark: '#670e0b',
    light: '#e8615d',
  },
  background: {
    light: '#ffffff',
    default: '#f4f5fa',
    contrast: '#070f11',
  },
  text: {
    contrast: '#ffffff',
  },
};
