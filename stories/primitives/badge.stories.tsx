import type { Meta, StoryObj } from "@storybook/react-vite";
import { BadgeCheck, Check, ExternalLink, Info, TriangleAlert, X } from "lucide-react";

import { Badge, badgeVariants } from "../../src/components/primitives/badge";
import type { BadgeVariantProps } from "../../src/components/primitives/badge";
import { Row } from "../../src/components/primitives/flex";
import { getVariantArgTypes } from "../utils/storybook";

const variantArgTypes = getVariantArgTypes<BadgeVariantProps>({
  variants: badgeVariants.variants,
  defaultVariants: badgeVariants.defaultVariants,
  descriptions: {
    variant: "Badge variant",
  },
});

const meta = {
  title: "Components/Feedback/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    ...variantArgTypes,
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <Badge {...args}>
        <BadgeCheck />
        Badge
      </Badge>
    );
  },
  args: badgeVariants.defaultVariants,
};

export const Variants: Story = {
  render: () => (
    <Row className="flex-wrap gap-2 p-4">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
    </Row>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Row className="flex-wrap gap-2 p-4">
      <Badge variant="success">
        <Check />
        Success
      </Badge>
      <Badge variant="error">
        <X />
        Error
      </Badge>
      <Badge variant="warning">
        <TriangleAlert />
        Warning
      </Badge>
      <Badge variant="info">
        <Info />
        Info
      </Badge>
    </Row>
  ),
};

export const AsLink: Story = {
  render: () => (
    <Row className="flex-wrap gap-2 p-4">
      <Badge variant="primary" render={<a href="#" />}>
        Link <ExternalLink />
      </Badge>
      <Badge variant="secondary" render={<a href="#" />}>
        Link <ExternalLink />
      </Badge>
      <Badge variant="outline" render={<a href="#" />}>
        Link <ExternalLink />
      </Badge>
      <Badge variant="info" render={<a href="#" />}>
        Link <ExternalLink />
      </Badge>
      <Badge variant="success" render={<a href="#" />}>
        Link <ExternalLink />
      </Badge>
      <Badge variant="warning" render={<a href="#" />}>
        Link <ExternalLink />
      </Badge>
      <Badge variant="error" render={<a href="#" />}>
        Link <ExternalLink />
      </Badge>
      <Badge variant="link" render={<a href="#" />}>
        Link <ExternalLink />
      </Badge>
    </Row>
  ),
};
