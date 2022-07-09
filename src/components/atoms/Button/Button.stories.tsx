import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { IoFootsteps } from 'react-icons/io5';
import { Button } from './Button';

type T = typeof Button;
type Story = ComponentStoryObj<T>;

export default {
  title: 'Atoms/Button',
  component: Button,
  args: { children: 'Button' },
} as ComponentMeta<T>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {icon: <IoFootsteps  className='w-5 h-5' />}
};

export const WithLording: Story = {
  args: {lording: true}
};

export const WithIconRight: Story = {
  args: {iconRight: <IoFootsteps />}
};

export const WithIconOnly: Story = {
  args: {icon: <IoFootsteps />,children: null}
};
