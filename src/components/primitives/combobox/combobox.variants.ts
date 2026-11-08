import type { VariantProps } from "tailwind-variants";

import { tv } from "../../../utils/tv";

export const comboboxVariants = tv({
  slots: {
    // A static field; only the chevron IconButton inside it opens the popup
    root: [
      "shrink-0 cursor-default",
      "bg-panel border-default-line text-default-text-contrast border bg-clip-padding shadow-xs",
      "select-none",
      "transition-all duration-150 ease-in-out",
      "typography-body-md h-element-md rounded-element-md pr-1.5 pl-3 [&>svg]:size-4.5",
      "[&>svg]:pointer-events-none [&>svg]:shrink-0 [&>svg]:stroke-[1.5]",
      // Highlighted while open, read from Base UI's trigger
      "has-data-[popup-open]:border-accent-border has-data-[popup-open]:ring-accent-bg has-data-[popup-open]:ring-focus",
    ],
    badge: "min-w-5 px-1.5 py-0",
    trigger: "data-[popup-open]:bg-default-bg-hover",
    triggerIcon: "transition-transform duration-200 in-data-[popup-open]:rotate-180",
    popup: [
      "relative z-50 flex w-72 flex-col overflow-hidden",
      "bg-panel text-default-text-contrast border-default-line rounded-menu-md border shadow-md outline-none",
      "origin-[var(--transform-origin)] font-sans",
      "data-open:animate-in data-closed:animate-out",
      "data-closed:fade-out-0 data-open:fade-in-0",
      "data-closed:zoom-out-95 data-open:zoom-in-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
    ],
    search: [
      "border-default-line text-default-text-contrast h-element-md shrink-0 border-b pr-2 pl-3",
      "[&_svg]:size-4 [&_svg]:shrink-0",
    ],
    searchInput: [
      "typography-body-md text-default-text-contrast min-w-0 flex-1 bg-transparent outline-none",
      "placeholder:text-default-text-placeholder",
    ],
    scrollArea: "max-h-80 min-h-0",
    list: "relative w-full",
    // Rows are absolutely positioned by the virtualizer. When the list
    // scrolls, the overlaid scrollbar's thumb ends 8px from the edge, so
    // right-3 keeps the same 4px gap as the left
    item: [
      "absolute inset-x-1 top-0 flex items-center gap-2",
      "in-data-[has-overflow-y]:right-3",
      "typography-body-md rounded-menu-inner px-2 py-1.5",
      "cursor-pointer outline-none select-none",
      "data-[highlighted]:bg-default-bg data-[selected]:bg-default-bg",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    ],
    // Children can shrink, so whatever renderItem returns can truncate
    itemLabel: "min-w-0 *:min-w-0",
    // Sized here, not on the item, so icons in renderItem keep their own size
    itemIndicator: "ml-auto shrink-0 [&_svg]:size-4",
    // Positioned and sized like an item, at the end of the list
    skeletonRow: [
      "absolute inset-x-1 top-0 in-data-[has-overflow-y]:right-3",
      "h-8 px-2",
    ],
    empty: "px-3 py-2",
    // Same spacing and row height as the list
    emptySkeleton: "p-1",
    emptySkeletonRow: "h-8 px-2",
    footer: "border-default-line h-element-md shrink-0 border-t pr-1 pl-3",
    // Base UI marks Clear as popup-open, which buttons style as pressed
    clear: "data-popup-open:not-hover:bg-transparent",
  },
  variants: {
    // The badge is always rendered so the field keeps its width
    hasValue: {
      false: {
        badge: "invisible",
      },
    },
    // Highlighted while something is selected
    active: {
      true: {
        root: "border-accent-border ring-accent-bg ring-focus",
      },
    },
    disabled: {
      true: {
        root: "pointer-events-none cursor-not-allowed opacity-50",
      },
    },
  },
});

export type ComboboxVariantsProps = VariantProps<typeof comboboxVariants>;
