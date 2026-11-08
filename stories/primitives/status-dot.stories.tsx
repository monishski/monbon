import type { Meta, StoryObj } from "@storybook/react-vite";

import { Row } from "../../src/components/primitives/flex";
import { StatusDot, statusDotVariants } from "../../src/components/primitives/status-dot";
import type { StatusDotVariantProps } from "../../src/components/primitives/status-dot";
import { getVariantArgTypes } from "../utils/storybook";

const variantArgTypes = getVariantArgTypes<StatusDotVariantProps>({
  variants: statusDotVariants.variants,
  defaultVariants: statusDotVariants.defaultVariants,
  descriptions: {
    status: "Status color",
    size: "Dot size",
  },
});

const meta = {
  title: "Components/Feedback/StatusDot",
  component: StatusDot,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    ...variantArgTypes,
  },
} satisfies Meta<typeof StatusDot>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...statusDotVariants.defaultVariants,
  },
};

export const Statuses: Story = {
  render: () => (
    <Row className="items-center gap-4 p-4">
      <StatusDot status="positive" />
      <StatusDot status="neutral" />
      <StatusDot status="negative" />
      <StatusDot status="accent" />
      <StatusDot status="default" />
    </Row>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Row className="items-end gap-4 p-4">
      <StatusDot size="xs" />
      <StatusDot size="sm" />
      <StatusDot size="md" />
      <StatusDot size="lg" />
    </Row>
  ),
};
