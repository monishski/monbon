import type { VariantProps } from "tailwind-variants";

import { tv } from "../../../utils/tv";

export const statusDotVariants = tv({
  base: ["inline-block shrink-0 rounded-full"],
  variants: {
    status: {
      positive: "bg-positive-solid",
      neutral: "bg-neutral-solid",
      negative: "bg-negative-solid",
      accent: "bg-accent-solid",
      default: "bg-default-solid",
    },
    size: {
      xs: "size-2",
      sm: "size-2.5",
      md: "size-3",
      lg: "size-3.5",
    },
  },
  defaultVariants: {
    status: "default",
    size: "md",
  },
});

export type StatusDotVariantProps = VariantProps<typeof statusDotVariants>;
