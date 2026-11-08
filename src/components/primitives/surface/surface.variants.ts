import type { VariantProps } from "tailwind-variants";

import { tv } from "../../../utils/tv";

export const surfaceVariants = tv({
  base: "bg-panel border-default-line rounded-container border shadow-md",
  variants: {
    variant: {
      content: "p-content",
      container: "p-container",
    },
  },
  defaultVariants: {
    variant: "content",
  },
});

export type SurfaceVariantProps = VariantProps<typeof surfaceVariants>;
