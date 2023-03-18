import { Box } from '@mui/material';
import type { ReactNode } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import type { DnDTypes } from '../types';

export type DragProps = {
  id: string;
  index: number;
  type: DnDTypes;
  children: ReactNode;
};

export function Drag(props: DragProps) {
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {provided => (
        <Box ref={provided.innerRef} {...provided.draggableProps} {...props}>
          <Box {...provided.dragHandleProps}>{props.children}</Box>
        </Box>
      )}
    </Draggable>
  );
}
