import type { ComponentProps } from "react";

import { getVariantProps } from "../../../utils/tailwind-variants";
import type { StatusDotVariantProps } from "./status-dot.variants";
import { statusDotVariants } from "./status-dot.variants";

export type StatusDotProps = ComponentProps<"span"> & StatusDotVariantProps;

export function StatusDot({ className, ...props }: StatusDotProps) {
  const { variantProps, componentProps } = getVariantProps(
    props,
    statusDotVariants.variantKeys
  );

  return (
    <span
      data-slot="status-dot"
      className={statusDotVariants({ ...variantProps, className })}
      {...componentProps}
    />
  );
}
