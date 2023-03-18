import { alpha, Box, useTheme } from '@mui/material';
import type { ReactNode } from 'react';
import { Droppable } from 'react-beautiful-dnd';

export type DropProps = {
  id?: string;
  children: ReactNode;
};

export function Drop(props: DropProps) {
  const theme = useTheme();

  if (!props.id) return <Box>{props.children}</Box>;

  return (
    <Droppable droppableId={props.id}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          {...props}
          sx={{
            borderRadius: 2,
            background: snapshot.isDraggingOver
              ? alpha(theme.palette.primary.light, 0.4)
              : 'transparent',
          }}
        >
          {props.children}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
}
