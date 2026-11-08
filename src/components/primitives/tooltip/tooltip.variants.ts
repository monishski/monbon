import type { VariantProps } from "tailwind-variants";

import { tv } from "../../../utils/tv";

export const tooltipVariants = tv({
  slots: {
    tooltipContent: [
      "relative z-50 w-fit max-w-xs px-3 py-1.5 text-balance",
      "bg-panel text-default-text-contrast typography-supporting border-default-line border",
      "rounded-element-sm origin-[var(--transform-origin)] shadow-md outline-hidden",
      "data-open:animate-in data-closed:animate-out",
      "data-closed:fade-out-0 data-open:fade-in-0",
      "data-closed:zoom-out-95 data-open:zoom-in-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    ],
    tooltipArrow: [
      "block h-1.5 w-3",
      "data-[side=bottom]:-top-1.5",
      "data-[side=top]:-bottom-1.5 data-[side=top]:rotate-180",
      "data-[side=left]:-right-[9px] data-[side=left]:rotate-90",
      "data-[side=right]:-left-[9px] data-[side=right]:-rotate-90",
    ],
    tooltipArrowIcon: "fill-panel stroke-default-line block",
  },
});

export type TooltipVariantsProps = VariantProps<typeof tooltipVariants>;
