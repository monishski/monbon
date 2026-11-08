import type { ComponentProps } from "react";

import { getVariantProps } from "../../../utils/tailwind-variants";
import type { ThumbnailVariantProps } from "./thumbnail.variants";
import { thumbnailVariants } from "./thumbnail.variants";

export type ThumbnailProps = ComponentProps<"span"> & ThumbnailVariantProps;

export function Thumbnail({ className, ...props }: ThumbnailProps) {
  const { variantProps, componentProps } = getVariantProps(
    props,
    thumbnailVariants.variantKeys
  );

  return (
    <span
      data-slot="thumbnail"
      className={thumbnailVariants({ ...variantProps, className })}
      {...componentProps}
    />
  );
}
