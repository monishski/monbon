"use client";

import type { Ref } from "react";
import type { CalendarDate } from "@internationalized/date";
import { X } from "lucide-react";
import {
  DateField as AriaDateField,
  DateInput as AriaDateInput,
  DateSegment,
  type DateFieldProps,
} from "react-aria-components";

import { getClampedDate } from "../../../utils/date";
import { getVariantProps } from "../../../utils/tailwind-variants";
import { IconButton } from "../button";
import { Row } from "../flex";
import { dateInputVariants, type DateInputVariantsProps } from "./date-input.variants";

export type DateInputProps = {
  fieldRef?: Ref<HTMLDivElement>;
  leftIcon?: React.ReactNode;
  rightIconButton?: React.ReactNode;
  onClear?: () => void;
  minValue?: CalendarDate;
  maxValue?: CalendarDate;
} & Omit<DateFieldProps<CalendarDate>, "defaultValue" | "minValue" | "maxValue"> &
  DateInputVariantsProps;

export function DateInput({
  fieldRef,
  className,
  value,
  onChange,
  onBlur,
  onClear,
  minValue,
  maxValue,
  leftIcon,
  rightIconButton,
  ...props
}: DateInputProps) {
  const { variantProps, componentProps } = getVariantProps(
    { ...props },
    dateInputVariants.variantKeys
  );

  const { root, input, segment, inputLeftIcon, inputRightIconButtons } =
    dateInputVariants({
      ...variantProps,
      hasLeftIcon: Boolean(leftIcon),
      hasRightIconButton: Boolean(rightIconButton),
    });

  return (
    <AriaDateField
      {...componentProps}
      ref={fieldRef}
      className={(state) =>
        root({
          className: typeof className === "function" ? className(state) : className,
        })
      }
      isDisabled={variantProps.isDisabled}
      isInvalid={variantProps.isInvalid}
      minValue={minValue}
      maxValue={maxValue}
      value={value}
      onChange={onChange}
      // Clamp on blur rather than change: typing a year emits 2, 20, 202 first
      onBlur={(event) => {
        if (value) {
          const date = getClampedDate({ date: value, minValue, maxValue });
          if (date !== value) onChange?.(date);
        }
        onBlur?.(event);
      }}
    >
      {leftIcon && <span className={inputLeftIcon()}>{leftIcon}</span>}

      <AriaDateInput data-slot="date-segment-input" className={input()}>
        {(dateSegment) => <DateSegment segment={dateSegment} className={segment()} />}
      </AriaDateInput>

      <Row gap="2xs" className={inputRightIconButtons()}>
        {value && !props.isDisabled && (
          <IconButton
            variant="ghost"
            size="xs"
            aria-label="Clear date"
            onClick={() => {
              onChange?.(null);
              onClear?.();
            }}
          >
            <X />
          </IconButton>
        )}
        {rightIconButton}
      </Row>
    </AriaDateField>
  );
}
