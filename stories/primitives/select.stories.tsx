import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Row, Stack } from "../../src/components/primitives/flex";
import {
  Select,
  SelectItem,
  type SelectProps,
} from "../../src/components/primitives/select";

const months = [
  { value: 0, label: "Jan" },
  { value: 1, label: "Feb" },
  { value: 2, label: "Mar" },
  { value: 3, label: "Apr" },
  { value: 4, label: "May" },
  { value: 5, label: "Jun" },
  { value: 6, label: "Jul" },
  { value: 7, label: "Aug" },
  { value: 8, label: "Sep" },
  { value: 9, label: "Oct" },
  { value: 10, label: "Nov" },
  { value: 11, label: "Dec" },
];

const options = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada", disabled: true },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany", disabled: true },
  { value: "fr", label: "France" },
  { value: "it", label: "Italy" },
  { value: "es", label: "Spain" },
  { value: "nl", label: "Netherlands" },
  { value: "be", label: "Belgium" },
  { value: "ch", label: "Switzerland" },
  { value: "at", label: "Austria" },
  { value: "se", label: "Sweden" },
  { value: "no", label: "Norway" },
  { value: "dk", label: "Denmark" },
];

function ControlledSelect<Value, Multiple extends boolean | undefined = false>(
  props: SelectProps<Value, Multiple>
) {
  const [value, setValue] = useState<SelectProps<Value, Multiple>["value"]>(null);

  const handleValueChange = (newValue: SelectProps<Value, Multiple>["value"]) => {
    if (newValue === value) {
      setValue(null);
    } else {
      setValue(newValue);
    }
  };

  return (
    <Select<Value, Multiple>
      {...props}
      value={value}
      onValueChange={handleValueChange}
      onClear={() => setValue(null)}
    />
  );
}

const meta = {
  title: "Components/Form/Select",
  component: Select,
  parameters: {
    layout: "centered",
    controls: { sort: "none" },
  },
  tags: ["autodocs"],
  argTypes: {
    id: { control: "text" },
    placeholder: { control: "text" },
    size: {
      control: "select",
      options: ["sm", "md"],
    },
    fullWidth: {
      control: "boolean",
    },
    alignItemWithTrigger: {
      control: "boolean",
    },
    disabled: { control: "boolean" },
    onClear: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    "aria-label": { control: "text" },
    "aria-invalid": { control: "boolean" },
    children: { table: { disable: true } },
    items: { table: { disable: true } },
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Row className="w-72">
      <ControlledSelect {...args} aria-label="Country">
        {options.map((option) => (
          <SelectItem key={option.label} value={option.value} disabled={option.disabled}>
            {option.label}
          </SelectItem>
        ))}
      </ControlledSelect>
    </Row>
  ),
  args: {
    placeholder: "Select a country",
    items: options,
  },
};

export const WithSize: Story = {
  render: (args) => (
    <Stack className="w-72" gap="md" align="stretch">
      <ControlledSelect {...args} size="sm" aria-label="Country">
        {options.map((option) => (
          <SelectItem key={option.label} value={option.value} disabled={option.disabled}>
            {option.label}
          </SelectItem>
        ))}
      </ControlledSelect>
      <ControlledSelect {...args} size="md" aria-label="Country">
        {options.map((option) => (
          <SelectItem key={option.label} value={option.value} disabled={option.disabled}>
            {option.label}
          </SelectItem>
        ))}
      </ControlledSelect>
    </Stack>
  ),
  args: {
    placeholder: "Select a country",
    items: options,
  },
};

export const WithAlignItemWithTrigger: Story = {
  render: function Render() {
    const [month, setMonth] = useState(8);

    return (
      <Select<number>
        size="md"
        fullWidth={false}
        alignItemWithTrigger
        value={month}
        items={months}
        onValueChange={(value) => {
          if (value != null) setMonth(value);
        }}
        aria-label="Month"
      >
        {months.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    );
  },
};

export const Disabled: Story = {
  render: (args) => (
    <Row className="w-72">
      <ControlledSelect {...args} aria-label="Country">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </ControlledSelect>
    </Row>
  ),
  args: {
    disabled: true,
    items: options,
  },
};
