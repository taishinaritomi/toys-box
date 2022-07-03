import type { UseDraggableArguments } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import type { ComponentProps, FC } from 'react';

type DraggableProps = {
  draggableArguments: UseDraggableArguments;
} & ComponentProps<'div'>;

const Draggable: FC<DraggableProps> = ({ draggableArguments, ...props }) => {
  const { attributes, listeners, setNodeRef } =
    useDraggable(draggableArguments);
  return <div ref={setNodeRef} {...listeners} {...attributes} {...props} />;
};

export default Draggable;
