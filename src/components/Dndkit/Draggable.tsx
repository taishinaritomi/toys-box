import type { UseDraggableArguments } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import type { ComponentProps, FC } from 'react';

type DraggableProps = {
  draggableArgs: UseDraggableArguments;
} & ComponentProps<'div'>;

const Draggable: FC<DraggableProps> = ({ draggableArgs, ...props }) => {
  const { attributes, listeners, setNodeRef } = useDraggable(draggableArgs);
  return <div ref={setNodeRef} {...listeners} {...attributes} {...props} />;
};

export default Draggable;
