import type { VariantProps } from "tailwind-variants";

import { tv } from "../../../utils/tv";
import { baseTypographyVariants } from "./base-typography.variants";

export const headingVariants = tv({
  extend: baseTypographyVariants,
  variants: {
    type: {
      "heading-1": "typography-heading-1",
      "heading-2": "typography-heading-2",
      "heading-3": "typography-heading-3",
      "heading-4": "typography-heading-4",
      "heading-5": "typography-heading-5",
      "heading-6": "typography-heading-6",
      "display-1": "typography-display-1",
      "display-2": "typography-display-2",
      "display-3": "typography-display-3",
      "display-4": "typography-display-4",
      "display-5": "typography-display-5",
      "display-6": "typography-display-6",
    },
  },
  defaultVariants: {
    type: "heading-1",
    wrap: "balance",
  },
});

export type HeadingVariantsProps = VariantProps<typeof headingVariants>;

export type HeadingAs = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type HeadingType = NonNullable<HeadingVariantsProps["type"]>;

export const headingTypeFromAs: Record<HeadingAs, HeadingType> = {
  h1: "heading-1",
  h2: "heading-2",
  h3: "heading-3",
  h4: "heading-4",
  h5: "heading-5",
  h6: "heading-6",
};
