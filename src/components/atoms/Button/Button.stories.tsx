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
  args: { icon: <IoFootsteps />, className: 'bg-red-500', variant: 'primary' },
};

export const WithLording: Story = {
  args: { lording: true },
};

export const WithIconRight: Story = {
  args: { iconRight: <IoFootsteps /> },
};

export const WithIconOnly: Story = {
  args: { icon: <IoFootsteps />, children: null },
};

export const WithIconOnlyLording: Story = {
  args: { icon: <IoFootsteps />, children: null, lording: true },
};

export const WithCustomcolor: Story = {
  args: { variant: 'customColor', className: 'text-white bg-blue-500' },
};
