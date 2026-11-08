import type { VariantProps } from "tailwind-variants";

import { tv } from "../../../utils/tv";
import { baseButtonVariants } from "./base-button.variants";

export const iconButtonVariants = tv({
  extend: baseButtonVariants,
  variants: {
    size: {
      // TODO: size='2xs' is using body-xs and rounded-element-xs temporarily
      ["2xs"]:
        "size-element-2xs rounded-element-xs typography-body-xs p-0 [&_svg]:size-3",
      xs: "size-element-xs rounded-element-xs typography-body-xs p-0 [&_svg]:size-3.5",
      sm: "size-element-sm rounded-element-sm typography-body-sm p-0 [&_svg]:size-4",
      md: "size-element-md rounded-element-md typography-body-md p-0 [&_svg]:size-4.5",
      lg: "size-element-lg rounded-element-lg typography-body-lg p-0 [&_svg]:size-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type IconButtonVariantsProps = VariantProps<typeof iconButtonVariants>;
