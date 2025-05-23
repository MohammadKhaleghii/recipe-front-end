import { Meta, StoryObj } from "@storybook/react";
import { Input } from ".";

const meta: Meta<typeof Input> = {
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    variants: {
      options: ["primary"],
      control: "select",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    variants: "primary",
    placeholder: "Enter value",
    className: "",
  },
};
