import type { UseSortableArguments } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import type { ComponentProps, FC } from 'react';

type SortableHandle = {
  sortableArgs: UseSortableArguments;
} & ComponentProps<'div'>;

const SortableHandle: FC<SortableHandle> = ({ sortableArgs, ...props }) => {
  const { attributes, listeners } = useSortable(sortableArgs);
  return <div {...listeners} {...attributes} {...props} />;
};

export default SortableHandle;
