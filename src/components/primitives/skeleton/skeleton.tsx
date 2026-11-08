import type { ComponentProps } from "react";

import { getVariantProps } from "../../../utils/tailwind-variants";
import { skeletonVariants, type SkeletonVariantProps } from "./skeleton.variants";

export type SkeletonProps = ComponentProps<"div"> & SkeletonVariantProps;

export function Skeleton({ className, ...props }: SkeletonProps) {
  const { variantProps, componentProps } = getVariantProps(
    props,
    skeletonVariants.variantKeys
  );

  return (
    <div
      data-slot="skeleton"
      className={skeletonVariants({ ...variantProps, className })}
      {...componentProps}
    />
  );
}
