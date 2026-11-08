"use client";

import type { CalendarDate } from "@internationalized/date";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Key } from "react-aria-components";
import {
  Button as AriaButton,
  Calendar as AriaCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarHeading,
  CalendarMonthPicker,
  CalendarYearPicker,
  type CalendarProps as AriaCalendarProps,
} from "react-aria-components";

import { IconButton } from "../button";
import { Row, Stack } from "../flex";
import { Select, SelectItem } from "../select";
import { calendarVariants } from "./calendar.variants";

export type CalendarProps = {
  caption?: "label" | "dropdown";
} & Omit<AriaCalendarProps<CalendarDate>, "visibleDuration">;

export function Calendar({ caption = "label", className, ...props }: CalendarProps) {
  const {
    root,
    month,
    monthCaption,
    captionLabel,
    buttonPrevious,
    buttonNext,
    table,
    weekday,
    dayButton,
  } = calendarVariants();

  return (
    <AriaCalendar
      {...props}
      firstDayOfWeek="mon"
      pageBehavior="single"
      visibleDuration={{ months: 1 }}
      className={(state) =>
        root({
          className: typeof className === "function" ? className(state) : className,
        })
      }
    >
      <Stack gap="none" align="stretch" className={month()}>
        <header className={monthCaption()}>
          <AriaButton
            slot="previous"
            render={(buttonProps) => (
              <IconButton
                variant="ghost"
                size="sm"
                {...buttonProps}
                className={buttonPrevious()}
              />
            )}
          >
            <ArrowLeft />
          </AriaButton>

          {caption === "label" && <CalendarHeading className={captionLabel()} />}

          {caption === "dropdown" && (
            <Row gap="xs">
              <CalendarMonthPicker>
                {({ value, onChange, items, ...props }) => (
                  <Select<Key>
                    {...props}
                    size="sm"
                    fullWidth={false}
                    alignItemWithTrigger
                    value={value}
                    onValueChange={onChange}
                    items={items.map((item) => ({
                      value: item.id,
                      label: item.formatted,
                    }))}
                  >
                    {items.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.formatted}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              </CalendarMonthPicker>

              <CalendarYearPicker>
                {({ value, onChange, items, ...props }) => (
                  <Select<Key>
                    {...props}
                    size="sm"
                    fullWidth={false}
                    alignItemWithTrigger
                    value={value}
                    onValueChange={onChange}
                    items={items.map((item) => ({
                      value: item.id,
                      label: item.formatted,
                    }))}
                  >
                    {items.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.formatted}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              </CalendarYearPicker>
            </Row>
          )}

          <AriaButton
            slot="next"
            render={(buttonProps) => (
              <IconButton
                variant="ghost"
                size="sm"
                {...buttonProps}
                className={buttonNext()}
              />
            )}
          >
            <ArrowRight />
          </AriaButton>
        </header>

        <CalendarGrid weekdayStyle="short" className={table()}>
          <CalendarGridHeader>
            {(day) => (
              <CalendarHeaderCell className={weekday()}>{day}</CalendarHeaderCell>
            )}
          </CalendarGridHeader>

          <CalendarGridBody>
            {(date) => (
              <CalendarCell
                date={date}
                render={(cellProps, { isSelected, isDisabled }) => (
                  <IconButton
                    render={<div {...cellProps} />}
                    nativeButton={false}
                    variant={isSelected ? "primary" : "ghost"}
                    size="md"
                    disabled={isDisabled}
                    className={dayButton()}
                  />
                )}
              />
            )}
          </CalendarGridBody>
        </CalendarGrid>
      </Stack>
    </AriaCalendar>
  );
}
