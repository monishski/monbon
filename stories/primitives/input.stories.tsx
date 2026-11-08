import type { ComponentProps } from "react";
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar, Ellipsis, Search, User } from "lucide-react";

import { IconButton } from "../../src/components/primitives/button";
import { Row } from "../../src/components/primitives/flex";
import { Input } from "../../src/components/primitives/input";

function ControlledInput(props: ComponentProps<typeof Input>) {
  const [value, setValue] = useState(props.value || "");

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue("")}
    />
  );
}

function ActiveInput(props: ComponentProps<typeof Input>) {
  const [value, setValue] = useState(String(props.value ?? ""));

  return (
    <Input
      {...props}
      value={value}
      active={Boolean(value)}
      onChange={(event) => setValue(event.target.value)}
      onClear={() => setValue("")}
    />
  );
}

const leftIcons = {
  None: undefined,
  User: <User />,
  Search: <Search />,
};

const rightIconButtons = {
  None: undefined,
  Calendar: (
    <IconButton variant="ghost" size="xs">
      <Calendar />
    </IconButton>
  ),
  Ellipsis: (
    <IconButton variant="ghost" size="xs">
      <Ellipsis />
    </IconButton>
  ),
};

const meta = {
  title: "Components/Form/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    leftIcon: {
      options: Object.keys(leftIcons),
      mapping: leftIcons,
      control: { type: "select" },
    },
    rightIconButton: {
      options: Object.keys(rightIconButtons),
      mapping: rightIconButtons,
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Row className="w-72">
      <ControlledInput {...args} />
    </Row>
  ),
  args: {
    placeholder: "Enter your email",
    "aria-label": "Email",
  },
};

export const WithLeftIcon: Story = {
  render: (args) => (
    <Row className="w-72">
      <ControlledInput {...args} />
    </Row>
  ),
  args: {
    leftIcon: <Search />,
    placeholder: "Search for anything...",
    "aria-label": "Search",
  },
};

export const WithRightIconButton: Story = {
  render: (args) => (
    <Row className="w-72">
      <ControlledInput {...args} />
    </Row>
  ),
  args: {
    placeholder: "Tomorrow or next week",
    "aria-label": "Schedule date",
    rightIconButton: (
      <IconButton variant="ghost" size="xs" onClick={() => alert("Open calendar")}>
        <Calendar />
      </IconButton>
    ),
  },
};

export const Disabled: Story = {
  render: (args) => (
    <Row className="w-72">
      <ControlledInput {...args} />
    </Row>
  ),
  args: {
    value: "ada@example.com",
    disabled: true,
    "aria-label": "Email",
  },
};

export const Active: Story = {
  render: (args) => (
    <Row className="w-72">
      <ActiveInput {...args} />
    </Row>
  ),
  args: {
    value: "Coffee",
    leftIcon: <Search />,
    placeholder: "Search transactions",
    "aria-label": "Search transactions",
  },
};

export const WithFocusOutlineDisabled: Story = {
  render: (args) => (
    <Row className="w-72">
      <ControlledInput {...args} />
    </Row>
  ),
  args: {
    focusOutlineDisabled: true,
    placeholder: "Enter your email",
    "aria-label": "Email",
  },
};
