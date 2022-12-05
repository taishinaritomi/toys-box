import type { UseSortableArguments } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import type { ComponentProps, FC } from 'react';

type Props = {
  options: UseSortableArguments;
} & ComponentProps<'div'>;

export const SortableHandle: FC<Props> = ({ options, ...props }) => {
  const { attributes, listeners } = useSortable(options);
  return <div {...listeners} {...attributes} {...props} />;
};
