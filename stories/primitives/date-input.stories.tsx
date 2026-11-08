"use client";

import { useState } from "react";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar } from "lucide-react";

import {
  DateInput,
  type DateInputProps,
} from "../../src/components/primitives/date-input";
import { Row, Stack } from "../../src/components/primitives/flex";
import { Text } from "../../src/components/primitives/typography";

function ControlledDateInput(props: DateInputProps) {
  const [value, setValue] = useState<CalendarDate | null>(props.value ?? null);

  return <DateInput {...props} value={value} onChange={setValue} />;
}

const meta = {
  title: "Components/Form/DateInput",
  component: DateInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    fieldRef: { table: { disable: true } },
    hasLeftIcon: { table: { disable: true } },
    hasRightIconButton: { table: { disable: true } },
  },
} satisfies Meta<typeof DateInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Row className="w-72">
      <ControlledDateInput {...args} />
    </Row>
  ),
  args: {
    "aria-label": "Date of birth",
  },
};

export const Value: Story = {
  render: (args) => (
    <Row className="w-72">
      <ControlledDateInput {...args} />
    </Row>
  ),
  args: {
    value: new CalendarDate(2026, 9, 2),
    "aria-label": "Appointment",
  },
};

export const LeftIcon: Story = {
  render: (args) => (
    <Row className="w-72">
      <ControlledDateInput {...args} />
    </Row>
  ),
  args: {
    leftIcon: <Calendar />,
    "aria-label": "Scheduled date",
  },
};

export const MinAndMax: Story = {
  render: (args) => (
    <Stack gap="xs" align="start" className="w-72">
      <Text type="supporting" color="muted">
        Min {args.minValue?.toString()} · Max {args.maxValue?.toString()}
      </Text>
      <ControlledDateInput {...args} />
    </Stack>
  ),
  args: {
    minValue: today(getLocalTimeZone()),
    maxValue: today(getLocalTimeZone()).add({ days: 30 }),
    "aria-label": "Booking date",
  },
};

export const Disabled: Story = {
  render: (args) => (
    <Row className="w-72">
      <ControlledDateInput {...args} />
    </Row>
  ),
  args: {
    value: new CalendarDate(2026, 9, 2),
    isDisabled: true,
    "aria-label": "Locked date",
  },
};
