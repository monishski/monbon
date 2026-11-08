import { useState } from "react";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  DateRangePicker,
  type DateRangePickerProps,
} from "../../src/components/primitives/date-range-picker";
import { Row } from "../../src/components/primitives/flex";

function ControlledDateRangePicker(props: DateRangePickerProps) {
  const [value, setValue] = useState<DateRangePickerProps["value"]>(props.value);

  return <DateRangePicker {...props} value={value} onChange={setValue} />;
}

const meta = {
  title: "Components/Form/DateRangePicker",
  component: DateRangePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    value: null,
    onChange: () => {},
  },
} satisfies Meta<typeof DateRangePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Row className="w-80">
      <ControlledDateRangePicker {...args} />
    </Row>
  ),
  args: {
    "aria-label": "Travel dates",
  },
};

export const Value: Story = {
  render: (args) => (
    <Row className="w-80">
      <ControlledDateRangePicker {...args} />
    </Row>
  ),
  args: {
    value: {
      start: new CalendarDate(2026, 8, 1),
      end: new CalendarDate(2026, 9, 2),
    },
    "aria-label": "Reporting period",
  },
};

export const MinAndMax: Story = {
  render: (args) => (
    <Row className="w-80">
      <ControlledDateRangePicker {...args} />
    </Row>
  ),
  args: {
    minValue: today(getLocalTimeZone()),
    maxValue: today(getLocalTimeZone()).add({ days: 90 }),
    "aria-label": "Available dates",
  },
};

export const Fallback: Story = {
  render: (args) => (
    <Row className="w-80">
      <ControlledDateRangePicker {...args} />
    </Row>
  ),
  args: {
    fallbackValue: {
      start: new CalendarDate(2026, 9, 1),
      end: new CalendarDate(2026, 9, 30),
    },
    "aria-label": "Transaction date",
  },
};

export const Disabled: Story = {
  render: (args) => (
    <Row className="w-80">
      <ControlledDateRangePicker {...args} />
    </Row>
  ),
  args: {
    value: {
      start: new CalendarDate(2026, 8, 1),
      end: new CalendarDate(2026, 9, 2),
    },
    isDisabled: true,
    "aria-label": "Locked period",
  },
};
