import type { VariantProps } from "tailwind-variants";

import { tv } from "../../../utils/tv";

export const popoverVariants = tv({
  base: [
    "relative z-50 w-min min-w-56 p-4",
    "bg-panel border-default-line rounded-menu-md origin-[var(--transform-origin)] border shadow-md outline-hidden",
    "data-open:animate-in data-closed:animate-out",
    "data-closed:fade-out-0 data-open:fade-in-0",
    "data-closed:zoom-out-95 data-open:zoom-in-95",
    "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
    "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  ],
});

export type PopoverVariantsProps = VariantProps<typeof popoverVariants>;
