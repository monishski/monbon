"use client";

import { useRef, useState } from "react";
import { isSameDay, type CalendarDate } from "@internationalized/date";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import type { RangeValue } from "react-aria-components";

import { cn } from "../../../utils/cn";
import {
  DATE_RANGE_PRESET_IDS,
  getClampedDate,
  getDateRangePreset,
} from "../../../utils/date";
import { Button, IconButton } from "../button";
import { RangeCalendar } from "../calendar";
import { DateRangeInput, type DateRangeInputProps } from "../date-range-input";
import { Divider } from "../divider";
import { Row } from "../flex";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

export type DateRangePickerProps = DateRangeInputProps;

export function DateRangePicker({
  className,
  onClear,
  value,
  onChange,
  minValue,
  maxValue,
  isDisabled,
  isInvalid,
  fallbackValue,
  active,
  ...props
}: DateRangePickerProps) {
  const fieldRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const displayedRange = value ?? fallbackValue ?? null;
  const { start = null, end = null } = displayedRange ?? {};

  // The calendar only aligns its first month to the start date when it
  // mounts; moving focus backwards aligns it as the last month instead. So
  // typed and preset ranges remount it, while calendar selections don't,
  // keeping the visible months put while picking
  const [calendarKey, setCalendarKey] = useState(0);

  const handleRangeChange = (next: RangeValue<CalendarDate | null> | null) => {
    onChange(next);
    setCalendarKey((key) => key + 1);
  };

  // Presets are clamped to min/max so they never select unavailable dates
  const presets = DATE_RANGE_PRESET_IDS.map((id) => {
    const { label, range } = getDateRangePreset({ id });
    const start = getClampedDate({
      date: range.start,
      minValue,
      maxValue,
    });
    const end = getClampedDate({ date: range.end, minValue, maxValue });
    return { id, label, range: { start, end } };
  });

  const selectedPresetId = presets.find(
    ({ range }) =>
      start && end && isSameDay(start, range.start) && isSameDay(end, range.end)
  )?.id;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <DateRangeInput
        {...props}
        fieldRef={fieldRef}
        fullWidth={false}
        className={cn("w-max", className)}
        value={value}
        fallbackValue={fallbackValue}
        onChange={handleRangeChange}
        onClear={onClear}
        minValue={minValue}
        maxValue={maxValue}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        active={active || open}
        leftIcon={<CalendarIcon />}
        rightIconButton={
          <PopoverTrigger
            disabled={isDisabled}
            render={
              <IconButton
                variant="ghost"
                size="xs"
                aria-label="Open calendar"
                active={open}
                disabled={isDisabled}
                className="active:translate-y-0"
              >
                <ChevronDown className="transition-transform duration-200 in-data-[popup-open]:rotate-180" />
              </IconButton>
            }
          />
        }
      />

      <PopoverContent
        align="start"
        side="bottom"
        anchor={fieldRef}
        className="flex w-max flex-col p-0"
      >
        <RangeCalendar
          key={calendarKey}
          aria-label="Date range"
          value={start && end ? { start, end } : null}
          defaultFocusedValue={start ?? end ?? undefined}
          onChange={onChange}
          minValue={minValue}
          maxValue={maxValue}
          isDisabled={isDisabled}
        />

        <Divider />

        <Row wrap="wrap" gap="xs" justify="start" className="w-0 min-w-full p-2">
          {presets.map((preset) => {
            const selected = selectedPresetId === preset.id;

            return (
              <Button
                key={preset.id}
                type="button"
                variant="outline"
                size="sm"
                active={selected}
                aria-pressed={selected}
                onClick={() => handleRangeChange(preset.range)}
              >
                {preset.label}
              </Button>
            );
          })}
        </Row>
      </PopoverContent>
    </Popover>
  );
}
