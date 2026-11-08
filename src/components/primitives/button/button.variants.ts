import type { VariantProps } from "tailwind-variants";

import { tv } from "../../../utils/tv";
import { baseButtonVariants } from "./base-button.variants";

export const buttonVariants = tv({
  extend: baseButtonVariants,
  variants: {
    size: {
      xs: "typography-body-xs h-element-xs rounded-element-xs px-2 [&_svg]:size-3.5",
      sm: "typography-body-sm h-element-sm rounded-element-sm px-2 [&_svg]:size-4",
      md: "typography-body-md h-element-md rounded-element-md px-3 [&_svg]:size-4.5",
      lg: "typography-body-lg h-element-lg rounded-element-lg px-4 [&_svg]:size-5",
    },
    fullWidth: {
      true: "w-full",
    },
    variant: {
      link: "text-default-text-contrast underline-offset-4 hover:underline",
    },
  },
  defaultVariants: {
    size: "md",
    fullWidth: false,
  },
});

export type ButtonVariantsProps = VariantProps<typeof buttonVariants>;
