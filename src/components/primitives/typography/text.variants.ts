import type { VariantProps } from "tailwind-variants";

import { tv } from "../../../utils/tv";
import { baseTypographyVariants } from "./base-typography.variants";

export const textVariants = tv({
  extend: baseTypographyVariants,
  variants: {
    type: {
      "body-xs": "typography-body-xs",
      "body-sm": "typography-body-sm",
      "body-md": "typography-body-md",
      "body-lg": "typography-body-lg",
      large: "typography-large",
      label: "typography-label",
      code: "typography-code font-mono",
      supporting: "typography-supporting",
    },
    // Overrides the type scale weight; ! so it wins over typography-* utilities
    weight: {
      normal: "!font-normal",
      medium: "!font-medium",
      semibold: "!font-semibold",
      bold: "!font-bold",
    },
  },
  defaultVariants: {
    type: "body-md",
    wrap: "wrap",
  },
});

export type TextVariantsProps = VariantProps<typeof textVariants>;
