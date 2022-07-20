import { Transition } from '@headlessui/react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import { LordingIcon } from '@/components/atoms/LordingIcon';
import { classNames } from '@/libs/classNames';

type Props = {
  enable?: boolean;
  lording?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
  variant?: keyof typeof className | 'customColor';
  block?: boolean;
  shadow?: boolean;
  rounded?: 'base' | 'full';
  padding?: 'base' | 'lg';
  text?: {
    size?: 'sm' | 'base';
    align?: 'left' | 'center';
  };
} & ComponentPropsWithoutRef<'button'>;

type ButtonRef = HTMLButtonElement;

const className = {
  primary: 'text-white bg-purple-600 enabled:hover:bg-purple-700',
  danger: 'text-red-400 enabled:hover:text-red-500',
  normal: 'text-slate-500 enabled:hover:text-slate-800',
} as const;

export const Button = forwardRef<ButtonRef, Props>(function _(
  {
    children,
    enable = true,
    lording = false,
    disabled,
    icon,
    iconRight,
    className: _className,
    text,
    block = false,
    shadow = false,
    rounded = 'base',
    padding = 'base',
    variant = 'primary',
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      {...props}
      disabled={!enable || lording || disabled}
      className={classNames(
        'flex items-center font-bold transition disabled:opacity-50 relative',
        block && 'w-full',
        shadow && 'shadow-lg',
        text?.size === 'sm' && 'text-sm',
        text?.align === 'center' && 'justify-center',
        rounded === 'full' ? 'rounded-full' : 'rounded-md',
        variant === 'customColor' ? _className : className[variant],
        children
          ? padding === 'lg'
            ? 'py-4 px-6'
            : 'py-2 px-6'
          : padding === 'lg'
          ? 'p-3'
          : 'p-2',
      )}
    >
      {children && (
        <Transition
          show={lording}
          className='-translate-x-2 overflow-hidden'
          enter='duration-150'
          leave='duration-150'
          enterFrom='w-0 opacity-0'
          enterTo='w-5 opacity-100'
          leaveFrom='w-5 opacity-100'
          leaveTo='w-0 opacity-0'
        >
          <LordingIcon className='h-5 w-5' />
        </Transition>
      )}
      {lording && !children && (
        <span className='absolute inset-0 flex h-full w-full items-center justify-center'>
          <LordingIcon className='h-5 w-5' />
        </span>
      )}
      <span className='flex items-center gap-2 whitespace-nowrap'>
        {icon && (
          <span className={lording && !children ? 'invisible' : ''}>
            {icon}
          </span>
        )}
        {children && <span>{children}</span>}
        {iconRight && (
          <span className={lording && !children ? 'invisible' : ''}>
            {iconRight}
          </span>
        )}
      </span>
    </button>
  );
});
