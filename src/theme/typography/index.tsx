import type { TypographyOptions } from '@mui/material/styles/createTypography';

const fonts = [
  'Lato',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
];

export const typography: TypographyOptions = {
  fontFamily: fonts.join(','),
  h1: {
    fontSize: '1.7rem',
    lineHeight: 1,
    fontWeight: 700,
  },
  h2: {
    fontSize: '1.55rem',
    lineHeight: 1,
    fontWeight: 700,
  },
  h3: {
    fontSize: '1.4rem',
    lineHeight: 1,
    fontWeight: 700,
  },
  h4: {
    fontSize: '1.3rem',
    lineHeight: 1,
    fontWeight: 700,
  },
  h5: {
    fontSize: '1.1rem',
    lineHeight: 1.2,
    fontWeight: 700,
  },
  h6: {
    fontSize: '0.85rem',
    lineHeight: 1.2,
  },
};
