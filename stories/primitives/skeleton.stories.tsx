import type { Meta, StoryObj } from "@storybook/react-vite";

import { Row, Stack } from "../../src/components/primitives/flex";
import { Skeleton } from "../../src/components/primitives/skeleton";

const meta = {
  title: "Components/Feedback/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Avatar: Story = {
  render: () => (
    <Row gap="lg">
      <Skeleton className="size-12 rounded-full" />
      <Stack align="start" gap="sm">
        <Skeleton className="h-4 w-62" />
        <Skeleton className="h-4 w-50" />
      </Stack>
    </Row>
  ),
};

export const Card: Story = {
  render: () => (
    <Stack align="start" gap="md">
      <Skeleton className="rounded-container h-32 w-62" />
      <Stack align="start" gap="sm">
        <Skeleton className="h-4 w-62" />
        <Skeleton className="h-4 w-50" />
      </Stack>
    </Stack>
  ),
};

export const Subtle: Story = {
  render: () => (
    <Stack
      align="start"
      gap="sm"
      className="bg-default-bg rounded-container-inner p-content"
    >
      <Skeleton variant="subtle" className="h-9 w-40" />
      <Skeleton variant="subtle" className="h-4 w-50" />
    </Stack>
  ),
};
