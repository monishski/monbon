import type { Meta, StoryObj } from "@storybook/react-vite";
import { Image } from "lucide-react";

import { Row } from "../../src/components/primitives/flex";
import {
  Thumbnail,
  thumbnailVariants,
  type ThumbnailVariantProps,
} from "../../src/components/primitives/thumbnail";
import { getVariantArgTypes } from "../utils/storybook";

const variantArgTypes = getVariantArgTypes<ThumbnailVariantProps>({
  variants: thumbnailVariants.variants,
  defaultVariants: thumbnailVariants.defaultVariants,
  descriptions: {
    size: "Thumbnail size",
  },
});

const meta = {
  title: "Components/Content/Thumbnail",
  component: Thumbnail,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    ...variantArgTypes,
  },
} satisfies Meta<typeof Thumbnail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: thumbnailVariants.defaultVariants,
  render: (args) => (
    <Thumbnail {...args}>
      <Image />
    </Thumbnail>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Row gap="sm">
      <Thumbnail size="sm">
        <Image />
      </Thumbnail>
      <Thumbnail size="md">
        <Image />
      </Thumbnail>
    </Row>
  ),
};
