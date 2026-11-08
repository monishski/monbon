"use client";

import { useState } from "react";
import type { CalendarDate } from "@internationalized/date";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Globe, Mail } from "lucide-react";

import { DateInput } from "../../src/components/primitives/date-input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../../src/components/primitives/field";
import { Row, Stack } from "../../src/components/primitives/flex";
import { Input } from "../../src/components/primitives/input";
import { Select, SelectItem } from "../../src/components/primitives/select";
import { Switch } from "../../src/components/primitives/switch";

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
];

function ExampleFields({
  idPrefix,
  invalid = false,
  disabled = false,
  withDescription = false,
  errorMessage,
}: {
  idPrefix: string;
  invalid?: boolean;
  disabled?: boolean;
  withDescription?: boolean;
  errorMessage?: string;
}) {
  const [country, setCountry] = useState<string | null>(null);
  const [date, setDate] = useState<CalendarDate | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <Stack className="w-72" gap="md" align="stretch">
      <Field invalid={invalid} disabled={disabled}>
        <FieldLabel htmlFor={`${idPrefix}-email`} required>
          <Mail />
          Email
        </FieldLabel>
        {withDescription && (
          <FieldDescription>We will never share your email</FieldDescription>
        )}
        <Input
          id={`${idPrefix}-email`}
          placeholder="Enter your email"
          disabled={disabled}
          aria-invalid={invalid || undefined}
        />
        {errorMessage && <FieldError>{errorMessage}</FieldError>}
      </Field>
      <Field invalid={invalid} disabled={disabled}>
        <FieldLabel htmlFor={`${idPrefix}-country`}>
          <Globe />
          Country
        </FieldLabel>
        {withDescription && <FieldDescription>Used for billing and tax</FieldDescription>}
        <Select
          id={`${idPrefix}-country`}
          value={country}
          onValueChange={setCountry}
          onClear={() => setCountry(null)}
          placeholder="Select a country"
          items={countries}
          disabled={disabled}
          aria-invalid={invalid || undefined}
        >
          {countries.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
        {errorMessage && <FieldError>{errorMessage}</FieldError>}
      </Field>
      <Field invalid={invalid} disabled={disabled}>
        <FieldLabel htmlFor={`${idPrefix}-dob`} id={`${idPrefix}-dob-label`} required>
          Date of birth
        </FieldLabel>
        {withDescription && <FieldDescription>You must be 18 or older</FieldDescription>}
        <DateInput
          id={`${idPrefix}-dob`}
          aria-labelledby={`${idPrefix}-dob-label`}
          value={date}
          onChange={setDate}
          isDisabled={disabled}
          isInvalid={invalid}
        />
        {errorMessage && <FieldError>{errorMessage}</FieldError>}
      </Field>
      <Field invalid={invalid} disabled={disabled}>
        <Stack align="start" gap="xs">
          <Row justify="between" align="center" gap="sm" fullWidth>
            <FieldLabel htmlFor={`${idPrefix}-terms`} required>
              Accept terms
            </FieldLabel>
            <Switch
              id={`${idPrefix}-terms`}
              checked={acceptedTerms}
              onCheckedChange={setAcceptedTerms}
              disabled={disabled}
              aria-invalid={invalid || undefined}
            />
          </Row>
          {withDescription && (
            <FieldDescription>You must accept the terms to continue</FieldDescription>
          )}
          {errorMessage && <FieldError>{errorMessage}</FieldError>}
        </Stack>
      </Field>
    </Stack>
  );
}

const meta = {
  title: "Components/Form/Field",
  component: Field,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ExampleFields idPrefix="default" invalid={args.invalid} disabled={args.disabled} />
  ),
};

export const WithDescription: Story = {
  render: (args) => (
    <ExampleFields
      idPrefix="description"
      invalid={args.invalid}
      disabled={args.disabled}
      withDescription
    />
  ),
};

export const WithError: Story = {
  render: (args) => (
    <ExampleFields
      idPrefix="error"
      invalid={args.invalid}
      disabled={args.disabled}
      errorMessage="Please enter a valid value"
    />
  ),
  args: {
    invalid: true,
  },
};

export const Disabled: Story = {
  render: (args) => (
    <ExampleFields
      idPrefix="disabled"
      invalid={args.invalid}
      disabled={args.disabled}
      withDescription
    />
  ),
  args: {
    disabled: true,
  },
};
