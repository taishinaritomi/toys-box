import type { ComponentMeta,ComponentStory, ComponentStoryObj } from "@storybook/react";
import { Button } from "./Button";

type T = typeof Button;
type Story = ComponentStoryObj<T>;

export default {
  title: 'Button',
  component: Button,
  args: { children: "送信する" },
} as ComponentMeta<T>;


export const Default: Story = {};
