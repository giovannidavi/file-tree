import type { MouseEvent } from 'react';
import { useCallback, useState } from 'react';

import type { ContextMenuProps } from '../index';

export function useContextMenu() {
  const [contextMenu, setContextMenu] =
    useState<ContextMenuProps['contextMenu']>(null);

  const toggleContextMenu = useCallback((event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setContextMenu(prev =>
      prev ? null : { x: event.clientX + 2, y: event.clientY - 6 },
    );
  }, []);

  const disposeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  return { contextMenu, toggleContextMenu, disposeContextMenu };
}
