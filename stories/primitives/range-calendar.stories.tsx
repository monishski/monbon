"use client";

import { useState } from "react";
import { CalendarDate } from "@internationalized/date";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { RangeValue } from "react-aria-components";

import { RangeCalendar } from "../../src/components/primitives/calendar";

const meta = {
  title: "Components/Form/RangeCalendar",
  component: RangeCalendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RangeCalendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState<RangeValue<CalendarDate> | null>({
      start: new CalendarDate(2025, 1, 12),
      end: new CalendarDate(2025, 2, 15),
    });

    return (
      <RangeCalendar
        aria-label="Date range"
        value={value}
        onChange={setValue}
        className="border-default-line rounded-menu-md border shadow-sm"
      />
    );
  },
};
