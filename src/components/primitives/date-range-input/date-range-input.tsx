"use client";

import type { Ref } from "react";
import type { CalendarDate } from "@internationalized/date";
import { X } from "lucide-react";
import {
  DateField as AriaDateField,
  DateInput as AriaDateInput,
  DateSegment,
  type RangeValue,
} from "react-aria-components";

import { getClampedDate } from "../../../utils/date";
import { IconButton } from "../button";
import {
  dateInputVariants,
  type DateInputVariantsProps,
} from "../date-input/date-input.variants";
import { Row } from "../flex";

export type DateRangeInputProps = {
  fieldRef?: Ref<HTMLDivElement>;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIconButton?: React.ReactNode;
  // Either bound can be null while the range is half entered
  value: RangeValue<CalendarDate | null> | null;
  // Shown while value is null, e.g. the range a filter uses when unset
  fallbackValue?: RangeValue<CalendarDate>;
  onChange: (value: RangeValue<CalendarDate | null> | null) => void;
  onClear?: () => void;
  minValue?: CalendarDate;
  maxValue?: CalendarDate;
  id?: string;
  autoFocus?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
} & DateInputVariantsProps;

export function DateRangeInput({
  fieldRef,
  id,
  className,
  leftIcon,
  rightIconButton,
  value,
  fallbackValue,
  onChange,
  onClear,
  minValue,
  maxValue,
  autoFocus,
  fullWidth,
  isReadOnly,
  isRequired,
  isDisabled,
  isInvalid,
  active,
  focusOutlineDisabled,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
}: DateRangeInputProps) {
  const {
    root,
    input,
    segments,
    segment,
    separator,
    inputLeftIcon,
    inputRightIconButtons,
  } = dateInputVariants({
    fullWidth,
    isDisabled,
    isInvalid,
    active,
    focusOutlineDisabled,
    hasLeftIcon: Boolean(leftIcon),
    hasRightIconButton: Boolean(rightIconButton),
  });

  const displayedRange = value ?? fallbackValue ?? null;

  const handleStartChange = (start: CalendarDate | null) => {
    const end = displayedRange?.end ?? null;
    onChange?.(start || end ? { start, end } : null);
  };

  const handleEndChange = (end: CalendarDate | null) => {
    const start = displayedRange?.start ?? null;
    onChange?.(start || end ? { start, end } : null);
  };

  // Clamp on blur rather than change: typing a year emits 2, 20, 202 first.
  // Start date: limited to [minValue, end ?? maxValue], so it can't go past the end
  const handleStartBlur = () => {
    if (!value?.start) return;
    const start = getClampedDate({
      date: value.start,
      minValue,
      maxValue: value.end ?? maxValue,
    });
    if (start !== value.start) onChange?.({ start, end: value.end });
  };

  // End date: limited to [start ?? minValue, maxValue], so it can't go before the start
  const handleEndBlur = () => {
    if (!value?.end) return;
    const end = getClampedDate({
      date: value.end,
      minValue: value.start ?? minValue,
      maxValue,
    });
    if (end !== value.end) onChange?.({ start: value.start, end });
  };

  return (
    <div
      ref={fieldRef}
      id={id}
      role="group"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      className={root({ className })}
    >
      {leftIcon && <span className={inputLeftIcon()}>{leftIcon}</span>}

      <div className={input({ className: "cursor-default" })}>
        <AriaDateField
          aria-label="Start date"
          autoFocus={autoFocus}
          isReadOnly={isReadOnly}
          isRequired={isRequired}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
          minValue={minValue}
          maxValue={displayedRange?.end ?? maxValue}
          value={displayedRange?.start ?? null}
          onChange={handleStartChange}
          onBlur={handleStartBlur}
        >
          <AriaDateInput className={segments()}>
            {(dateSegment) => <DateSegment segment={dateSegment} className={segment()} />}
          </AriaDateInput>
        </AriaDateField>

        <span aria-hidden className={separator()}>
          –
        </span>

        <AriaDateField
          aria-label="End date"
          isReadOnly={isReadOnly}
          isRequired={isRequired}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
          minValue={displayedRange?.start ?? minValue}
          maxValue={maxValue}
          value={displayedRange?.end ?? null}
          onChange={handleEndChange}
          onBlur={handleEndBlur}
        >
          <AriaDateInput className={segments()}>
            {(dateSegment) => <DateSegment segment={dateSegment} className={segment()} />}
          </AriaDateInput>
        </AriaDateField>
      </div>

      <Row gap="2xs" className={inputRightIconButtons()}>
        {value && !isDisabled && (
          <IconButton
            variant="ghost"
            size="xs"
            aria-label="Clear date range"
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
    </div>
  );
}
