import type { ComponentProps } from "react";

import { getVariantProps } from "../../../utils/tailwind-variants";
import { surfaceVariants, type SurfaceVariantProps } from "./surface.variants";

type SurfaceProps = ComponentProps<"div"> & SurfaceVariantProps;

export function Surface({ className, ...props }: SurfaceProps) {
  const { variantProps, componentProps } = getVariantProps(
    props,
    surfaceVariants.variantKeys
  );

  return (
    <div
      data-slot="surface"
      className={surfaceVariants({ ...variantProps, className })}
      {...componentProps}
    />
  );
}
