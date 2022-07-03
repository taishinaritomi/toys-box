import type { UseSortableArguments } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import type { ComponentProps, FC } from 'react';

type SortableHandle = {
  sortableArguments: UseSortableArguments;
} & ComponentProps<'div'>;

const SortableHandle: FC<SortableHandle> = ({
  sortableArguments,
  ...props
}) => {
  const { attributes, listeners } = useSortable(sortableArguments);
  return <div {...listeners} {...attributes} {...props} />;
};

export default SortableHandle;
