import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { LordingIcon } from './LordingIcon';

type T = typeof LordingIcon;
type Story = ComponentStoryObj<T>;

export default {
  title: 'Atoms/LordingIcon',
  component: LordingIcon,
} as ComponentMeta<T>;

export const Default: Story = {};

export const WithSize: Story = {
  args: { className: 'h-6 w-6' },
};

export const WithColor: Story = {
  args: { className: 'text-red-400' },
};
