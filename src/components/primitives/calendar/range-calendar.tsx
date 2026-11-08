"use client";

import type { CalendarDate } from "@internationalized/date";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Button as AriaButton,
  RangeCalendar as AriaRangeCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarHeading,
  type RangeCalendarProps as AriaRangeCalendarProps,
} from "react-aria-components";

import { IconButton } from "../button";
import { Row, Stack } from "../flex";
import { calendarVariants } from "./calendar.variants";

export type RangeCalendarProps = Omit<
  AriaRangeCalendarProps<CalendarDate>,
  "visibleDuration"
>;

export function RangeCalendar({ className, ...props }: RangeCalendarProps) {
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
    <AriaRangeCalendar
      {...props}
      firstDayOfWeek="mon"
      pageBehavior="single"
      selectionAlignment="start"
      visibleDuration={{ months: 2 }}
      className={(state) =>
        root({
          className: typeof className === "function" ? className(state) : className,
        })
      }
    >
      <Row gap="lg" align="start" justify="start">
        {[0, 1].map((index) => (
          <Stack key={index} gap="none" align="stretch" className={month()}>
            <header className={monthCaption()}>
              {index === 0 && (
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
              )}

              <CalendarHeading offset={{ months: index }} className={captionLabel()} />

              {index === 1 && (
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
              )}
            </header>

            <CalendarGrid
              offset={{ months: index }}
              weekdayStyle="short"
              className={table()}
            >
              <CalendarGridHeader>
                {(day) => (
                  <CalendarHeaderCell className={weekday()}>{day}</CalendarHeaderCell>
                )}
              </CalendarGridHeader>

              <CalendarGridBody>
                {(date) => (
                  <CalendarCell
                    date={date}
                    render={(
                      cellProps,
                      { isSelected, isDisabled, isSelectionStart, isSelectionEnd }
                    ) => {
                      return (
                        <IconButton
                          render={<div {...cellProps} />}
                          nativeButton={false}
                          variant={
                            !isSelected
                              ? "ghost"
                              : isSelectionStart || isSelectionEnd
                                ? "primary"
                                : "secondary"
                          }
                          size="md"
                          disabled={isDisabled}
                          className={dayButton({ selection: "range" })}
                        />
                      );
                    }}
                  />
                )}
              </CalendarGridBody>
            </CalendarGrid>
          </Stack>
        ))}
      </Row>
    </AriaRangeCalendar>
  );
}
