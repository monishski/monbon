import type { Meta, StoryObj } from "@storybook/react-vite";

import { Stack } from "../../src/components/primitives/flex";
import { Label } from "../../src/components/primitives/label";

const meta = {
  title: "Components/Form/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Stack className="bg-app w-64 rounded-lg p-4">
      <Label {...args} />
    </Stack>
  ),
  args: {
    children: "Label",
  },
};
