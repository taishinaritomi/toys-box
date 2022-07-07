import { Transition } from '@headlessui/react';
import type { FC } from 'react';
import type { IconBaseProps } from 'react-icons';
import { LordingIcon } from '../LordingIcon';

type Props = {
  lording: boolean;
} & IconBaseProps;

export const TransitionLordingIcon: FC<Props> = ({
  lording,
  className = 'w-5 h-5 opacity-100',
  ...props
}) => {
  return (
    <Transition
      show={lording}
      enter='duration-150'
      leave='duration-150'
      enterFrom='w-0 opacity-0'
      enterTo={className}
      leaveFrom={className}
      leaveTo='w-0 opacity-0'
    >
      <LordingIcon className={className} {...props} />
    </Transition>
  );
};
