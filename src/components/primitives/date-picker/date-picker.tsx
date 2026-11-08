"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "../../../utils/cn";
import { IconButton } from "../button";
import { Calendar, type CalendarProps } from "../calendar";
import { DateInput, type DateInputProps } from "../date-input";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

export type DatePickerProps = {
  isDateUnavailable?: CalendarProps["isDateUnavailable"];
} & DateInputProps;

export function DatePicker({
  value,
  onChange,
  onClear,
  minValue,
  maxValue,
  isDisabled,
  isDateUnavailable,
  active,
  ...props
}: DatePickerProps) {
  const fieldRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <DateInput
        {...props}
        fieldRef={fieldRef}
        fullWidth={false}
        className={cn(
          "w-[calc(var(--size-element-md)*7+1rem)]",
          typeof props.className === "string" ? props.className : undefined
        )}
        value={value}
        onChange={onChange}
        onClear={onClear}
        minValue={minValue}
        maxValue={maxValue}
        isDisabled={isDisabled}
        active={active || open}
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
        className="w-(--anchor-width) min-w-max p-0"
      >
        <Calendar
          value={value}
          onChange={onChange}
          minValue={minValue}
          maxValue={maxValue}
          isDisabled={isDisabled}
          isDateUnavailable={isDateUnavailable}
        />
      </PopoverContent>
    </Popover>
  );
}
