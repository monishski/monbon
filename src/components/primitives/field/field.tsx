import type { ComponentProps, ReactNode } from "react";

import { Stack } from "../flex";
import { Label } from "../label";
import { Text } from "../typography";
import { fieldVariants } from "./field.variants";

export type FieldProps = ComponentProps<"div"> & {
  invalid?: boolean;
  disabled?: boolean;
};

const { root, label, description, error } = fieldVariants();

export function Field({
  invalid = false,
  disabled = false,
  className,
  children,
  ...props
}: FieldProps) {
  return (
    <Stack
      {...props}
      fullWidth
      align="stretch"
      gap="sm"
      data-slot="field"
      data-disabled={JSON.stringify(disabled)}
      data-invalid={JSON.stringify(invalid)}
      role="group"
      className={root({ className })}
    >
      {children}
    </Stack>
  );
}

const RequiredAsterisk = () => (
  <Text
    type="label"
    color="error"
    fullWidth={false}
    className="w-min leading-0 select-none"
  >
    *
  </Text>
);

export type FieldLabelProps = ComponentProps<"label"> & {
  required?: boolean;
};

export function FieldLabel({ className, children, required, ...props }: FieldLabelProps) {
  return (
    <Label {...props} className={label({ className })}>
      {children}
      {required && <RequiredAsterisk />}
    </Label>
  );
}

export type FieldDescriptionProps = Omit<ComponentProps<"p">, "color">;

export function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <Text
      {...props}
      as="p"
      type="supporting"
      data-slot="field-description"
      className={description({ className })}
    />
  );
}

export type FieldErrorProps = Omit<ComponentProps<"p">, "color"> & {
  children?: ReactNode;
};

export function FieldError({ className, children, ...props }: FieldErrorProps) {
  if (!children) return null;

  return (
    <Text
      {...props}
      as="p"
      type="supporting"
      color="error"
      role="alert"
      data-slot="field-error"
      className={error({ className })}
    >
      {children}
    </Text>
  );
}
