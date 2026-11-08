import type { Meta, StoryObj } from "@storybook/react-vite";

import { Row } from "../../src/components/primitives/flex";
import {
  Spinner,
  spinnerVariants,
  type SpinnerVariantProps,
} from "../../src/components/primitives/spinner";
import { getVariantArgTypes } from "../utils/storybook";

const variantArgTypes = getVariantArgTypes<SpinnerVariantProps>({
  variants: spinnerVariants.variants,
  defaultVariants: spinnerVariants.defaultVariants,
  descriptions: {
    size: "Spinner size",
  },
});

const meta = {
  title: "Components/Feedback/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    ...variantArgTypes,
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <Spinner {...args} />;
  },
  args: spinnerVariants.defaultVariants,
};

export const Sizes: Story = {
  render: () => (
    <Row className="gap-4 p-4">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </Row>
  ),
};
