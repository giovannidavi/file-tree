import { Menu } from '@mui/material';
import type { ReactElement } from 'react';

export * as useContextMenu from './hooks/use-context-menu';

export type ContextMenuProps = {
  contextMenu: { x: number; y: number } | null;
  onClose: () => void;
  actions: ReactElement[];
};

export function ContextMenu(props: ContextMenuProps) {
  return (
    <Menu
      anchorPosition={
        props.contextMenu
          ? { top: props.contextMenu.y, left: props.contextMenu.x }
          : undefined
      }
      anchorReference="anchorPosition"
      open={props.contextMenu !== null}
      onClose={props.onClose}
    >
      {props.actions}
    </Menu>
  );
}
