import { useState } from "react";
import { getLocalTimeZone, today, type CalendarDate } from "@internationalized/date";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Calendar } from "../../src/components/primitives/calendar";

const meta = {
  title: "Components/Form/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState<CalendarDate | null>(today(getLocalTimeZone()));

    return (
      <Calendar
        aria-label="Date"
        value={value}
        onChange={setValue}
        className="border-default-line rounded-menu-md border shadow-sm"
      />
    );
  },
};

export const DropdownNavigation: Story = {
  render: function Render() {
    const [value, setValue] = useState<CalendarDate | null>(today(getLocalTimeZone()));

    return (
      <Calendar
        aria-label="Date"
        caption="dropdown"
        value={value}
        onChange={setValue}
        className="border-default-line rounded-menu-md border shadow-sm"
      />
    );
  },
};

export const UnavailableDates: Story = {
  render: function Render() {
    const [value, setValue] = useState<CalendarDate | null>(today(getLocalTimeZone()));

    return (
      <Calendar
        aria-label="Date"
        value={value}
        onChange={setValue}
        minValue={today(getLocalTimeZone())}
        className="border-default-line rounded-menu-md border shadow-sm"
      />
    );
  },
};
