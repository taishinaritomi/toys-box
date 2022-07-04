import type { UseDroppableArguments } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import type { ComponentProps, FC } from 'react';

type DroppableProps = {
  droppableArgs: UseDroppableArguments;
} & ComponentProps<'div'>;

export const Droppable: FC<DroppableProps> = ({ droppableArgs, ...props }) => {
  const { setNodeRef } = useDroppable(droppableArgs);
  return <div ref={setNodeRef} {...props} />;
};
