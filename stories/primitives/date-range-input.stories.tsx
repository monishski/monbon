import { useState } from "react";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar } from "lucide-react";

import {
  DateRangeInput,
  type DateRangeInputProps,
} from "../../src/components/primitives/date-range-input";
import { Row, Stack } from "../../src/components/primitives/flex";
import { Text } from "../../src/components/primitives/typography";

function ControlledDateRangeInput(props: DateRangeInputProps) {
  const [value, setValue] = useState<DateRangeInputProps["value"]>(props.value ?? null);

  return <DateRangeInput {...props} value={value} onChange={setValue} />;
}

const meta = {
  title: "Components/Form/DateRangeInput",
  component: DateRangeInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    fieldRef: { table: { disable: true } },
    hasLeftIcon: { table: { disable: true } },
    hasRightIconButton: { table: { disable: true } },
  },
  args: {
    value: null,
    onChange: () => {},
  },
} satisfies Meta<typeof DateRangeInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Row className="w-80">
      <ControlledDateRangeInput {...args} />
    </Row>
  ),
  args: {
    "aria-label": "Travel dates",
  },
};

export const Value: Story = {
  render: (args) => (
    <Row className="w-80">
      <ControlledDateRangeInput {...args} />
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

export const HalfRange: Story = {
  render: (args) => (
    <Row className="w-80">
      <ControlledDateRangeInput {...args} />
    </Row>
  ),
  args: {
    value: {
      start: new CalendarDate(2026, 8, 1),
      end: null,
    },
    "aria-label": "Open-ended period",
  },
};

export const Fallback: Story = {
  render: (args) => (
    <Row className="w-80">
      <ControlledDateRangeInput {...args} />
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

export const LeftIcon: Story = {
  render: (args) => (
    <Row className="w-80">
      <ControlledDateRangeInput {...args} />
    </Row>
  ),
  args: {
    leftIcon: <Calendar />,
    "aria-label": "Scheduled dates",
  },
};

export const MinAndMax: Story = {
  render: (args) => (
    <Stack gap="xs" align="start" className="w-80">
      <Text type="supporting" color="muted">
        Min {args.minValue?.toString()} · Max {args.maxValue?.toString()}
      </Text>
      <ControlledDateRangeInput {...args} />
    </Stack>
  ),
  args: {
    minValue: today(getLocalTimeZone()),
    maxValue: today(getLocalTimeZone()).add({ days: 90 }),
    "aria-label": "Available dates",
  },
};

export const Disabled: Story = {
  render: (args) => (
    <Row className="w-80">
      <ControlledDateRangeInput {...args} />
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
