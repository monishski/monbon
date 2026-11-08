import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, Store } from "lucide-react";

import {
  Avatar,
  AvatarGroup,
  avatarVariants,
} from "../../src/components/primitives/avatar";
import type { AvatarVariantProps } from "../../src/components/primitives/avatar";
import { Row } from "../../src/components/primitives/flex";
import { StatusDot } from "../../src/components/primitives/status-dot";
import { getLogo, portrait } from "../utils/images";
import { getVariantArgTypes } from "../utils/storybook";

const variantArgTypes = getVariantArgTypes<AvatarVariantProps>({
  variants: avatarVariants.variants,
  defaultVariants: avatarVariants.defaultVariants,
  descriptions: {
    size: "Avatar size",
  },
});

const meta = {
  title: "Components/Content/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    ...variantArgTypes,
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

const merchants = [
  {
    id: "corner-shop",
    alt: "Corner Shop",
    fallback: "CS",
    src: getLogo({ color: "#30a46c", shape: "square" }),
  },
  {
    id: "bakery",
    alt: "Bakery",
    fallback: "BA",
    src: getLogo({ color: "#f76b15", shape: "circle" }),
  },
  {
    id: "bookshop",
    alt: "Bookshop",
    fallback: "BO",
    src: getLogo({ color: "#0090ff", shape: "triangle" }),
  },
  {
    id: "gym",
    alt: "Gym",
    fallback: "GY",
    src: getLogo({ color: "#e5484d", shape: "diamond" }),
  },
];

export const Default: Story = {
  args: {
    ...avatarVariants.defaultVariants,
    alt: "Alex Morgan",
    fallback: "AM",
  },
};

export const Image: Story = {
  args: {
    ...avatarVariants.defaultVariants,
    alt: "Ana Thomas",
    fallback: "AT",
    src: portrait,
  },
};

export const Sizes: Story = {
  render: () => (
    <Row className="items-end gap-4 p-4">
      <Avatar size="2xs" alt="Alex Morgan" fallback="AM" />
      <Avatar size="xs" alt="Alex Morgan" fallback="AM" />
      <Avatar size="sm" alt="Alex Morgan" fallback="AM" />
      <Avatar size="md" alt="Alex Morgan" fallback="AM" />
      <Avatar size="lg" alt="Alex Morgan" fallback="AM" />
    </Row>
  ),
};

export const FallbackIcon: Story = {
  render: () => (
    <Row className="items-end gap-4 p-4">
      <Avatar size="2xs" alt="Store" fallback={<Store />} />
      <Avatar size="xs" alt="Store" fallback={<Store />} />
      <Avatar size="sm" alt="Store" fallback={<Store />} />
      <Avatar size="md" alt="Store" fallback={<Store />} />
      <Avatar size="lg" alt="Store" fallback={<Store />} />
    </Row>
  ),
};

export const Badge: Story = {
  render: () => (
    <Row className="items-end gap-4 p-4">
      <Avatar
        size="sm"
        alt="Alex Morgan"
        fallback="AM"
        badge={<StatusDot status="positive" size="sm" />}
      />
      <Avatar size="md" alt="Alex Morgan" fallback="AM" badge={<Check />} />
      <Avatar
        size="lg"
        alt="Ana Thomas"
        src={portrait}
        fallback="AT"
        badge={<StatusDot status="accent" size="lg" />}
      />
    </Row>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup
      avatars={[
        ...merchants,
        { id: "extra-1", alt: "Florist", fallback: "FL" },
        { id: "extra-2", alt: "Cafe", fallback: "CA" },
      ]}
      max={3}
      size="lg"
    />
  ),
};
