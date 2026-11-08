import type { VariantProps } from "tailwind-variants";

import { tv } from "../../../utils/tv";

export const scrollAreaVariants = tv({
  slots: {
    root: "relative",
    viewport: [
      "scroll-area-overflow-mask size-full max-h-[inherit] min-w-0 rounded-[inherit]",
      "transition-[color,box-shadow] outline-none",
      "focus-visible:ring-default-border/50 focus-visible:ring-focus focus-visible:outline-none",
    ],
    scrollbar: [
      "flex touch-none p-px transition-colors select-none",
      "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:border-l data-[orientation=vertical]:border-l-transparent",
      "data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-t-transparent",
    ],
    thumb: "bg-default-line relative flex-1 rounded-full",
  },
});

export type ScrollAreaVariantsProps = VariantProps<typeof scrollAreaVariants>;
