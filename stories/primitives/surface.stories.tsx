import type { Meta, StoryObj } from "@storybook/react-vite";

import { Stack } from "../../src/components/primitives/flex";
import { Surface } from "../../src/components/primitives/surface";
import { Heading, Text } from "../../src/components/primitives/typography";

const meta = {
  title: "Components/Layout/Surface",
  component: Surface,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Surface>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Surface className="w-72">
      <Stack align="start" gap="xs">
        <Heading as="h2" type="heading-4">
          Summary
        </Heading>
        <Text type="supporting" color="muted">
          Children are laid out by Stack and Row, not the surface.
        </Text>
      </Stack>
    </Surface>
  ),
};

export const Container: Story = {
  render: () => (
    <Surface variant="container" className="w-72">
      <Stack align="start" gap="xs" className="bg-default-bg rounded-container-inner p-3">
        <Heading as="h2" type="heading-4">
          Nested panel
        </Heading>
        <Text type="supporting" color="muted">
          The tighter padding lets an inner panel follow the outer curve.
        </Text>
      </Stack>
    </Surface>
  ),
};
