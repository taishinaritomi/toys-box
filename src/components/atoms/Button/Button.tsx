import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';
import { TransitionLordingIcon } from '~/components/atoms/LordingIcon';
import { classNames } from '~/libs/classNames';

type Props = {
  enable?: boolean;
  lording?: boolean;
  variant?: keyof Omit<typeof className, 'init'>;
} & ComponentPropsWithoutRef<'button'>;

type ButtonRef = HTMLButtonElement;

const className = {
  init: 'flex items-center py-2 px-6 rounded-md font-bold transition disabled:opacity-50',
  primary: 'bg-purple-600 text-white enabled:hover:bg-purple-700',
  danger: 'text-red-400 enabled:hover:text-red-500',
  normal: 'text-slate-400 enabled:hover:text-slate-800',
  googleLogin:
    'border border-slate-300 bg-slate-100 enabled:hover:bg-slate-200',
} as const;

export const Button = forwardRef<ButtonRef, Props>(function _(
  {
    children,
    enable = true,
    lording = false,
    variant = 'primary',
    disabled,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      {...props}
      disabled={!enable || lording || disabled}
      className={classNames(className['init'], className[variant],'bg')}
    >
      <div className='-translate-x-2 overflow-hidden'>
        <TransitionLordingIcon lording={lording} />
      </div>
      {children}
    </button>
  );
});
