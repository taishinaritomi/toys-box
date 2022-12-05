import type {
  AnimateLayoutChanges,
  UseSortableArguments,
} from '@dnd-kit/sortable';
import { useSortable, defaultAnimateLayoutChanges } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ComponentProps, FC } from 'react';

type Props = {
  options: UseSortableArguments & { handle?: boolean };
} & ComponentProps<'div'>;

const animateLayoutChanges: AnimateLayoutChanges = (args) => {
  return args.isSorting || args.wasDragging
    ? defaultAnimateLayoutChanges(args)
    : true;
};

export const Sortable: FC<Props> = ({
  options: { handle = true, ...options },
  ...props
}) => {
  const { attributes, listeners, transform, transition, setNodeRef } =
    useSortable({
      animateLayoutChanges,
      ...options,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(handle && listeners)}
      {...(handle && attributes)}
      {...props}
    />
  );
};
