"use client";

import { useState } from "react";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  DatePicker,
  type DatePickerProps,
} from "../../src/components/primitives/date-picker";
import { Row } from "../../src/components/primitives/flex";

function ControlledDatePicker(props: DatePickerProps) {
  const [value, setValue] = useState<CalendarDate | null>(props.value ?? null);

  return <DatePicker {...props} value={value} onChange={setValue} />;
}

const meta = {
  title: "Components/Form/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    fieldRef: { table: { disable: true } },
    hasLeftIcon: { table: { disable: true } },
    hasRightIconButton: { table: { disable: true } },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Row className="w-72">
      <ControlledDatePicker {...args} />
    </Row>
  ),
  args: {
    "aria-label": "Appointment date",
  },
};

export const Value: Story = {
  render: (args) => (
    <Row className="w-72">
      <ControlledDatePicker {...args} />
    </Row>
  ),
  args: {
    value: new CalendarDate(2026, 9, 2),
    "aria-label": "Invoice date",
  },
};

export const MinAndMax: Story = {
  render: (args) => (
    <Row className="w-72">
      <ControlledDatePicker {...args} />
    </Row>
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
      <ControlledDatePicker {...args} />
    </Row>
  ),
  args: {
    value: new CalendarDate(2026, 9, 2),
    isDisabled: true,
    "aria-label": "Locked date",
  },
};
