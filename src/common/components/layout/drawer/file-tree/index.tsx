import { Box } from '@mui/material';

import { useDataContext } from '../../../../../context/data-context';

import { FileList } from './file-list';

export function FileTree() {
  const { data } = useDataContext();

  return (
    <Box pr={2}>
      <FileList items={data} />
    </Box>
  );
}
