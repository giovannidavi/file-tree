import { Global } from '@emotion/react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactMarkdown from 'react-markdown';

import md from './README';
import { Drawer, drawerWidth } from './common/components/layout/drawer';
import { theme } from './theme';

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global styles="@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,400;0,600;0,900;1,100;1,400;1,600;1,900&display=swap');" />
        <CssBaseline />
        <Drawer />
        <Box ml={drawerWidth / 6} px={3}>
          <ReactMarkdown>{md}</ReactMarkdown>
        </Box>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
