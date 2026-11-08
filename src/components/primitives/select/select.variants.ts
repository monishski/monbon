import type { VariantProps } from "tailwind-variants";

import { tv } from "../../../utils/tv";

export const selectVariants = tv({
  slots: {
    selectTrigger: [
      "text-default-text-contrast flex min-w-0 items-center text-left",
      "bg-panel border-default-line border shadow-xs transition-[color,box-shadow] outline-none",
      "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
      "focus-visible:ring-accent-bg focus-visible:border-accent-border focus-visible:ring-focus",
      "data-[popup-open]:ring-accent-bg data-[popup-open]:border-accent-border data-[popup-open]:outline-none",
      "aria-[invalid=true]:ring-error-bg aria-[invalid=true]:border-error-border",
      "aria-[invalid=true]:ring-focus",
      "aria-[invalid=true]:focus-visible:ring-error-bg",
      "aria-[invalid=true]:focus-visible:border-error-border",
    ],
    selectTriggerValue: [
      "min-w-0 truncate text-left",
      "data-[placeholder]:text-default-text-placeholder",
    ],
    selectTriggerIconButton: "shrink-0",
    selectTriggerIcon:
      "transition-transform duration-200 in-data-[popup-open]:rotate-180",
    selectContent: [
      "relative z-50 flex max-h-96 w-(--anchor-width) flex-col",
      "group/select bg-panel text-default-text-contrast border-default-line overflow-hidden border shadow-md outline-none",
      "font-sans",
      "data-open:animate-in data-closed:animate-out",
      "data-closed:fade-out-0 data-open:fade-in-0",
      "data-closed:zoom-out-95 data-open:zoom-in-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    ],
    selectViewport: [
      "flex w-full flex-col",
      "max-h-inherit min-h-0 overflow-y-auto overscroll-contain",
      "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
    ],
    selectScrollArrow: [
      "absolute z-10 flex w-full shrink-0 items-center justify-center",
      "bg-panel text-default-text cursor-default",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0",
      "data-[direction=down]:bottom-0 data-[direction=up]:top-0",
    ],
  },
  variants: {
    size: {
      sm: {
        selectTrigger: [
          "typography-body-sm",
          "h-element-sm rounded-element-sm gap-2 py-0.5 pr-1 pl-2",
          "data-[popup-open]:ring-focus",
        ],
        selectTriggerValue: "typography-body-sm",
        selectContent: "rounded-menu-sm max-h-52 shadow-xs",
        selectViewport: "p-menu-sm gap-px",
        selectScrollArrow: "py-0.5 [&_svg]:size-3",
      },
      md: {
        selectTrigger: [
          "typography-body-md",
          "h-element-md rounded-element-md gap-2.5 py-2 pr-2 pl-3",
          "data-[popup-open]:ring-focus",
        ],
        selectTriggerValue: "typography-body-md",
        selectContent: "rounded-menu-md max-h-[300px]",
        selectViewport: "p-menu-md gap-0.5",
        selectScrollArrow: "py-1 [&_svg]:size-4",
      },
    },
    fullWidth: {
      true: {
        selectTrigger: "w-full",
        selectTriggerValue: "flex-1",
      },
      false: {
        selectTrigger: "w-max max-w-full",
      },
    },
    alignItemWithTrigger: {
      true: {
        selectTrigger: [
          "data-[popup-open]:ring-0",
          "data-[popup-open]:focus-visible:ring-0",
          "data-[popup-open]:border-default-line",
          "data-[popup-open]:shadow-none",
        ],
        selectContent: ["max-h-(--available-height)", "data-[side=none]:animate-none"],
      },
    },
    disabled: {
      true: {
        selectTrigger:
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
  },
  defaultVariants: {
    size: "md",
    fullWidth: true,
  },
});

export type SelectVariantsProps = VariantProps<typeof selectVariants>;
export type SelectSize = NonNullable<SelectVariantsProps["size"]>;
