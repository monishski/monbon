import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heart } from "lucide-react";

import { IconButton, iconButtonVariants } from "../../src/components/primitives/button";
import type { IconButtonVariantsProps } from "../../src/components/primitives/button";
import { Row } from "../../src/components/primitives/flex";
import { getVariantArgTypes } from "../utils/storybook";

const variantArgTypes = getVariantArgTypes<IconButtonVariantsProps>({
  variants: {
    ...iconButtonVariants.extend.variants,
    ...iconButtonVariants.variants,
  },
  defaultVariants: iconButtonVariants.defaultVariants,
  descriptions: {
    variant: "Icon button variant",
    size: "Icon button size",
    disabled: "Disable icon button",
    active: "Active icon button",
  },
});

const meta = {
  title: "Components/Action/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    ...variantArgTypes,
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <Row className="w-64 p-4">
        <IconButton {...args} />
      </Row>
    );
  },
  args: {
    children: <Heart />,
    ...iconButtonVariants.defaultVariants,
  },
};

export const Variants: Story = {
  render: () => (
    <Row className="p-4">
      <IconButton variant="primary">
        <Heart />
      </IconButton>
      <IconButton variant="secondary">
        <Heart />
      </IconButton>
      <IconButton variant="outline">
        <Heart />
      </IconButton>
      <IconButton variant="ghost">
        <Heart />
      </IconButton>
      <IconButton variant="destructive">
        <Heart />
      </IconButton>
    </Row>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Row className="p-4">
      <IconButton disabled variant="primary">
        <Heart />
      </IconButton>
      <IconButton disabled variant="secondary">
        <Heart />
      </IconButton>
      <IconButton disabled variant="outline">
        <Heart />
      </IconButton>
      <IconButton disabled variant="ghost">
        <Heart />
      </IconButton>
      <IconButton disabled variant="destructive">
        <Heart />
      </IconButton>
    </Row>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Row className="p-4">
      <IconButton size="2xs">
        <Heart />
      </IconButton>
      <IconButton size="xs">
        <Heart />
      </IconButton>
      <IconButton size="sm">
        <Heart />
      </IconButton>
      <IconButton size="md">
        <Heart />
      </IconButton>
      <IconButton size="lg">
        <Heart />
      </IconButton>
    </Row>
  ),
};
