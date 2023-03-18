import {
  DocumentScannerTwoTone,
  ExpandLessTwoTone,
  ExpandMoreTwoTone,
  FolderTwoTone,
} from '@mui/icons-material';
import { Collapse, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import type { ReactElement, ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { useFileContext } from '../../../../../../context/file-tree';
import type { FileListItem } from '../../../../../../types/files';
import { ContextMenu } from '../../../../context-menu';
import { useContextMenu } from '../../../../context-menu/hooks/use-context-menu';
import { Drag } from '../../../../dnd/drag';
import { DnDTypes } from '../../../../dnd/types';

import { AddFile } from './actions/add-file';
import { AddFolder } from './actions/add-folder';
import { RemoveItem } from './actions/remove-item';
import { RenameItem } from './actions/rename-item';
import {
  ListItemButton as ListItemButtonBase,
  ListItemWrapper,
} from './styles';

export function ListItemButton(props: {
  item: FileListItem;
  children?: ReactNode;
}) {
  if (props.item.path.length === 1) {
    return <Content {...props} />;
  }

  return (
    <Drag
      id={`h-${props.item.path.join('.')}`}
      index={props.item.path[props.item.path.length - 1]}
      type={DnDTypes.FILE}
    >
      <Content {...props} />
    </Drag>
  );
}

function Content(props: { item: FileListItem; children?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen(o => !o), []);
  const Icon = open ? ExpandLessTwoTone : ExpandMoreTwoTone;
  const ItemIcon =
    props.item.kind === 'directory' ? FolderTwoTone : DocumentScannerTwoTone;

  const secondaryLabel =
    props.item.kind === 'directory'
      ? `${props.item.children.length} items`
      : props.item.size;

  const { toggleContextMenu, contextMenu, disposeContextMenu } =
    useContextMenu();

  const { expandAll, collapseAll, selectedListItem, setSelectedListItem } =
    useFileContext();

  const handleClick = useCallback(() => {
    toggle();
    setSelectedListItem(props.item.path.join('.'));
  }, [toggle, setSelectedListItem, props.item.path]);

  useEffect(() => {
    if (expandAll) {
      setOpen(true);
    }
  }, [expandAll]);

  useEffect(() => {
    if (collapseAll) {
      setOpen(false);
    }
  }, [collapseAll]);

  return (
    <ListItemWrapper onContextMenu={toggleContextMenu}>
      <ListItemButtonBase
        selected={selectedListItem === props.item.path.join('.')}
        onClick={handleClick}
      >
        <ListItemIcon>
          <ItemIcon />
        </ListItemIcon>
        <Tooltip placement="right" title={secondaryLabel}>
          <ListItemText primary={props.item.name} />
        </Tooltip>
        {!!props.children && <Icon />}
      </ListItemButtonBase>
      <Collapse in={open} sx={{ width: '100%' }}>
        {props.children}
      </Collapse>
      <ContextMenu
        actions={getActions(props.item)}
        contextMenu={contextMenu}
        onClose={disposeContextMenu}
      />
    </ListItemWrapper>
  );
}

function getActions(item: FileListItem): ReactElement[] {
  switch (item.kind) {
    case 'directory':
      return [
        <AddFile key="add" path={item.path} />,
        <AddFolder key="add-folder" path={item.path} />,
        <RemoveItem key="remove" path={item.path} />,
        <RenameItem key="rename" name={item.name} path={item.path} />,
      ];
    case 'file':
      return [
        <RemoveItem key="remove" path={item.path} />,
        <RenameItem key="rename" name={item.name} path={item.path} />,
      ];
    default:
      return [];
  }
}
