import type { VariantProps } from "tailwind-variants";

import { tv } from "../../../utils/tv";

export const menuContentVariants = tv({
  base: [
    "relative z-50 min-w-40 overflow-hidden p-1",
    "bg-panel border-default-line rounded-menu-md origin-[var(--transform-origin)] border shadow-md outline-hidden",
    "data-open:animate-in data-closed:animate-out",
    "data-closed:fade-out-0 data-open:fade-in-0",
    "data-closed:zoom-out-95 data-open:zoom-in-95",
    "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
    "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  ],
});

export type MenuContentVariantsProps = VariantProps<typeof menuContentVariants>;

export const menuItemVariants = tv({
  base: [
    "flex w-full cursor-pointer items-center gap-2",
    "rounded-menu-inner px-2 py-1.5",
    "typography-body-md outline-hidden select-none",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:stroke-[1.5]",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
  ],
  variants: {
    variant: {
      default: [
        "text-default-text-contrast",
        "data-highlighted:bg-default-bg-hover",
        "data-popup-open:bg-default-bg-hover",
      ],
      destructive: [
        "text-negative-text",
        "data-highlighted:bg-negative-bg",
        "data-popup-open:bg-negative-bg",
      ],
    },
    active: {
      true: "",
    },
  },
  compoundVariants: [
    { active: true, variant: "default", class: "bg-default-bg-hover" },
    { active: true, variant: "destructive", class: "bg-negative-bg" },
  ],
  defaultVariants: {
    variant: "default",
  },
});

export type MenuItemVariantsProps = VariantProps<typeof menuItemVariants>;

export const menuSeparatorVariants = tv({
  base: "bg-default-line my-1 h-px",
});

export type MenuSeparatorVariantsProps = VariantProps<typeof menuSeparatorVariants>;

export const menuLabelVariants = tv({
  base: "typography-heading-5 text-default-text px-2 py-0.5",
});

export type MenuLabelVariantsProps = VariantProps<typeof menuLabelVariants>;

export const menuShortcutVariants = tv({
  base: "typography-body-xs text-default-text ml-auto tracking-widest",
});

export type MenuShortcutVariantsProps = VariantProps<typeof menuShortcutVariants>;
