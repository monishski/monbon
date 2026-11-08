import type { VariantProps } from "tailwind-variants";

import { tv } from "../../../utils/tv";

export const thumbnailVariants = tv({
  base: [
    "inline-flex shrink-0 items-center justify-center",
    "bg-default-bg text-default-text-contrast rounded-element-sm",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:stroke-[1.5]",
  ],
  variants: {
    size: {
      sm: "size-8 [&_svg]:!size-4",
      md: "size-10 [&_svg]:!size-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type ThumbnailVariantProps = VariantProps<typeof thumbnailVariants>;
