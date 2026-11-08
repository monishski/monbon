import type { VariantProps } from "tailwind-variants";

import { tv } from "../../../utils/tv";

export const avatarVariants = tv({
  base: [
    "group/avatar relative inline-flex shrink-0",
    "rounded-full select-none",
    "bg-default-bg text-default-text-contrast",
    // Drawn over the image, so light logos keep their round edge
    "after:border-default-line after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:border",
  ],
  variants: {
    size: {
      ["2xs"]: "size-element-2xs typography-body-xs",
      xs: "size-element-xs typography-body-xs",
      sm: "size-element-sm typography-body-sm",
      md: "size-element-md typography-body-md",
      lg: "size-element-lg typography-body-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const avatarFallbackVariants = tv({
  base: [
    "absolute inset-0 flex items-center justify-center overflow-hidden rounded-full bg-inherit",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:stroke-[1.5]",
  ],
  variants: {
    size: {
      ["2xs"]: "[&_svg]:size-3",
      xs: "[&_svg]:size-3.5",
      sm: "[&_svg]:size-4",
      md: "[&_svg]:size-4.5",
      lg: "[&_svg]:size-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const avatarBadgeVariants = tv({
  base: [
    "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center",
    "rounded-full select-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:stroke-[1.5]",
    "[&_[data-slot=status-dot]]:ring-panel [&_[data-slot=status-dot]]:ring-2",
  ],
  variants: {
    size: {
      ["2xs"]: "[&_svg]:size-1.5",
      xs: "[&_svg]:size-2",
      sm: "[&_svg]:size-2.5",
      md: "[&_svg]:size-3",
      lg: "[&_svg]:size-3.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const avatarGroupVariants = tv({
  base: ["flex items-center -space-x-2"],
});

export type AvatarVariantProps = VariantProps<typeof avatarVariants>;
export type AvatarFallbackVariantProps = VariantProps<typeof avatarFallbackVariants>;
export type AvatarBadgeVariantProps = VariantProps<typeof avatarBadgeVariants>;
