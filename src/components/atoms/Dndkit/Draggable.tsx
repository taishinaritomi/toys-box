import type { UseDraggableArguments } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import type { ComponentProps, FC } from 'react';

type Props = {
  options: UseDraggableArguments;
} & ComponentProps<'div'>;

export const Draggable: FC<Props> = ({ options, ...props }) => {
  const { attributes, listeners, setNodeRef } = useDraggable(options);
  return <div ref={setNodeRef} {...listeners} {...attributes} {...props} />;
};
