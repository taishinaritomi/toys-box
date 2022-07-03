import type { UseDroppableArguments } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import type { ComponentProps, FC } from 'react';

type DroppableProps = {
  droppableArguments: UseDroppableArguments;
} & ComponentProps<'div'>;

export const Droppable: FC<DroppableProps> = ({
  droppableArguments,
  ...props
}) => {
  const { setNodeRef } = useDroppable(droppableArguments);
  return <div ref={setNodeRef} {...props} />;
};
