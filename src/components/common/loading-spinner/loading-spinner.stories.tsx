import { Meta, StoryObj } from "@storybook/react";
import LoadingSpinner from ".";
const meta: Meta<typeof LoadingSpinner> = {
  component: LoadingSpinner,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["contained"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof LoadingSpinner>;

export const Contained: Story = {
  args: {
    variant: "contained",
  },
};
