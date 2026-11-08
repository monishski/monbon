import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Row } from "../../src/components/primitives/flex";
import { Switch } from "../../src/components/primitives/switch";

const meta = {
  title: "Components/Form/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(true);

    return (
      <Row gap="sm">
        <Switch checked={checked} onCheckedChange={setChecked} aria-label="Toggle" />
      </Row>
    );
  },
};

export const Small: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(true);

    return (
      <Row gap="sm">
        <Switch
          size="sm"
          checked={checked}
          onCheckedChange={setChecked}
          aria-label="Toggle"
        />
      </Row>
    );
  },
};

export const Disabled: Story = {
  args: {
    checked: true,
    disabled: true,
    "aria-label": "Disabled toggle",
  },
};
