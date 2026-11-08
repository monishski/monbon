import type { VariantProps } from "tailwind-variants";

import { tv } from "../../../utils/tv";

export const skeletonVariants = tv({
  base: ["rounded-element-sm animate-pulse"],
  variants: {
    variant: {
      default: "bg-default-bg",
      subtle: "bg-default-bg-subtle", // For skeletons sitting on bg-default-bg
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type SkeletonVariantProps = VariantProps<typeof skeletonVariants>;
