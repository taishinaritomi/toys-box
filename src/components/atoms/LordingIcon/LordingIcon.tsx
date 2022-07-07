import type { FC } from 'react';
import type { IconBaseProps } from 'react-icons';
import { CgSpinner } from 'react-icons/cg';

export const LordingIcon: FC<IconBaseProps> = (props) => {
  return (
    <CgSpinner {...props} className={`animate-spin ${props.className || ''}`} />
  );
};
