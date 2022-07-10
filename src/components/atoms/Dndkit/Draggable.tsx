import type { UseDraggableArguments } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import type { ComponentProps, FC } from 'react';

type DraggableProps = {
  options: UseDraggableArguments;
} & ComponentProps<'div'>;

const Draggable: FC<DraggableProps> = ({ options, ...props }) => {
  const { attributes, listeners, setNodeRef } = useDraggable(options);
  return <div ref={setNodeRef} {...listeners} {...attributes} {...props} />;
};

export default Draggable;
