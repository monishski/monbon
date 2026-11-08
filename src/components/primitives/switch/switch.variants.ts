import type { VariantProps } from "tailwind-variants";

import { tv } from "../../../utils/tv";

export const switchVariants = tv({
  slots: {
    root: [
      "inline-flex shrink-0 cursor-pointer items-center rounded-full",
      "bg-default-bg border border-transparent outline-none select-none",
      "transition-colors duration-150",
      "data-checked:bg-accent-solid",
      "data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50",
      "focus-visible:ring-accent-bg focus-visible:ring-focus",
      "aria-[invalid=true]:border-error-border aria-[invalid=true]:ring-error-bg aria-[invalid=true]:ring-focus",
    ],
    thumb: ["bg-panel block rounded-full shadow-xs", "transition-transform duration-150"],
  },
  variants: {
    // The thumb slides the track width, minus its border, padding and own size
    size: {
      sm: {
        root: "h-3.5 w-6",
        thumb: "size-3 data-checked:translate-x-2.5",
      },
      md: {
        root: "h-5 w-8 p-px",
        thumb: "size-4 data-checked:translate-x-3",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type SwitchVariantsProps = VariantProps<typeof switchVariants>;
