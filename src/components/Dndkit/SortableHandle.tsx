import type { UseSortableArguments } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import type { ComponentProps, FC } from 'react';

type SortableHandle = {
  options: UseSortableArguments;
} & ComponentProps<'div'>;

const SortableHandle: FC<SortableHandle> = ({ options, ...props }) => {
  const { attributes, listeners } = useSortable(options);
  return <div {...listeners} {...attributes} {...props} />;
};

export default SortableHandle;
