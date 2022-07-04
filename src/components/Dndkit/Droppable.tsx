import type { UseDroppableArguments } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import type { ComponentProps, FC } from 'react';

type DroppableProps = {
  options: UseDroppableArguments;
} & ComponentProps<'div'>;

export const Droppable: FC<DroppableProps> = ({ options, ...props }) => {
  const { setNodeRef } = useDroppable(options);
  return <div ref={setNodeRef} {...props} />;
};
