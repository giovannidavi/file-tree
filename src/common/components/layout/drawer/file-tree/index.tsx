import { Skeleton } from '@mui/lab';
import { alpha, Box, useTheme } from '@mui/material';
import { useCallback, useState } from 'react';
import type { DropResult } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';

import { useDataContext } from '../../../../../context/data-context';

import { FileList } from './file-list';

export function FileTree() {
  const theme = useTheme();
  const [dndKey, setDndKey] = useState(0);
  const { data, isLoading, moveItem } = useDataContext();

  const handleDrop = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        setDndKey(k => k + 1);

        return;
      }

      const path = result.draggableId.replace('h-', '').split('.').map(Number);
      const newPath = result.destination.droppableId.split('.').map(Number);
      const { index } = result.destination;

      moveItem(path, newPath, index);
    },
    [moveItem],
  );

  if (isLoading) {
    return (
      <Box pr={2}>
        {Array.from({ length: 5 }, (_, i) => (
          <Skeleton
            key={i}
            height={50}
            sx={{
              m: 2,
              backgroundColor: alpha(theme.palette.background.default, 0.6),
            }}
            variant="rounded"
          />
        ))}
      </Box>
    );
  }

  return (
    <Box pr={2}>
      <DragDropContext key={dndKey} onDragEnd={handleDrop}>
        <FileList items={data} />
      </DragDropContext>
    </Box>
  );
}
