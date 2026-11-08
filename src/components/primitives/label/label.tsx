import type { ComponentProps } from "react";

import { getVariantProps } from "../../../utils/tailwind-variants";
import type { LabelVariantProps } from "./label.variants";
import { labelVariants } from "./label.variants";

type LabelProps = ComponentProps<"label"> & LabelVariantProps;

export function Label({ className, ...props }: LabelProps) {
  const { variantProps, componentProps } = getVariantProps(
    props,
    labelVariants.variantKeys
  );

  return (
    <label
      data-slot="label"
      className={labelVariants({ ...variantProps, className })}
      {...componentProps}
    />
  );
}
