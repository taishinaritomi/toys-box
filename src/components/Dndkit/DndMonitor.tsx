import type { DndMonitorListener } from '@dnd-kit/core';
import { useDndMonitor } from '@dnd-kit/core';
import type { FC } from 'react';

export const DndMonitor: FC<DndMonitorListener> = ({ ...monitor }) => {
  useDndMonitor(monitor);
  return null;
};
