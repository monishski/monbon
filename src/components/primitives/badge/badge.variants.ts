import type { VariantProps } from "tailwind-variants";

import { tv } from "../../../utils/tv";

export const badgeVariants = tv({
  base: [
    "w-fit rounded-full px-2 py-0.5",
    "inline-flex shrink-0 items-center justify-center gap-1 overflow-hidden",
    "typography-body-xs font-semibold whitespace-nowrap",
    "transition-[color,box-shadow]",
    "[&>svg]:pointer-events-none [&>svg]:size-3",
  ],
  variants: {
    variant: {
      primary: "bg-accent-solid text-accent-contrast [a&]:hover:bg-accent-solid-hover",
      secondary:
        "bg-default-bg text-default-text-contrast [a&]:hover:bg-default-bg-hover",
      outline:
        "text-default-text-contrast border-default-line [a&]:hover:bg-default-bg-hover border",
      link: "text-default-text-contrast underline-offset-4 hover:underline",
      info: "bg-info-bg text-info-text [a&]:hover:bg-info-bg-hover",
      success: "bg-success-bg text-success-text [a&]:hover:bg-success-bg-hover",
      warning: "bg-warning-bg text-warning-text [a&]:hover:bg-warning-bg-hover",
      error: "bg-error-bg text-error-text [a&]:hover:bg-error-bg-hover",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
