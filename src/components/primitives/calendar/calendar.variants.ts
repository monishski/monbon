import type { VariantProps } from "tailwind-variants";

import { tv } from "../../../utils/tv";

export const calendarVariants = tv({
  slots: {
    root: "group/calendar w-fit bg-transparent p-2",
    months: "flex gap-4",
    month: "flex flex-col gap-0",
    monthCaption: "h-element-md relative flex w-full items-center justify-center px-8",
    buttonPrevious: "absolute left-1",
    buttonNext: "absolute right-1",
    captionLabel: "text-default-text-contrast typography-heading-4 select-none",
    table:
      "[&_td]:w-element-md [&_th]:w-element-md w-max border-collapse [&_td]:px-0 [&_td]:py-0.5 [&_th]:p-0",
    weekday:
      "text-default-text typography-body-sm h-element-md text-center font-normal whitespace-nowrap select-none",
    dayButton: [
      "relative w-full border-0 transition-none",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "data-[unavailable]:opacity-50",
      "data-[outside-month]:pointer-events-none data-[outside-month]:invisible",
      "data-[today]:font-semibold",
    ],
  },
  variants: {
    selection: {
      range: {
        dayButton: [
          "data-[selection-start]:not-data-[selection-end]:before:bg-default-bg data-[selection-start]:not-data-[selection-end]:before:pointer-events-none data-[selection-start]:not-data-[selection-end]:before:absolute data-[selection-start]:not-data-[selection-end]:before:inset-y-0 data-[selection-start]:not-data-[selection-end]:before:right-0 data-[selection-start]:not-data-[selection-end]:before:-z-10 data-[selection-start]:not-data-[selection-end]:before:w-1/2 data-[selection-start]:not-data-[selection-end]:before:content-['']",
          "data-[selection-end]:not-data-[selection-start]:before:bg-default-bg data-[selection-end]:not-data-[selection-start]:before:pointer-events-none data-[selection-end]:not-data-[selection-start]:before:absolute data-[selection-end]:not-data-[selection-start]:before:inset-y-0 data-[selection-end]:not-data-[selection-start]:before:left-0 data-[selection-end]:not-data-[selection-start]:before:-z-10 data-[selection-end]:not-data-[selection-start]:before:w-1/2 data-[selection-end]:not-data-[selection-start]:before:content-['']",
          "data-[selected]:not-data-[selection-start]:not-data-[selection-end]:rounded-none",
        ],
      },
    },
  },
});

export type CalendarVariantsProps = VariantProps<typeof calendarVariants>;
