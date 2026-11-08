import type { VariantProps } from "tailwind-variants";

import { tv } from "../../../utils/tv";

export const dateInputVariants = tv({
  slots: {
    root: "relative",
    input: [
      "typography-body-md",
      "h-element-md rounded-element-md flex w-full items-center py-1 pr-9 pl-3",
      "bg-panel border-default-line border shadow-xs",
      "cursor-text whitespace-nowrap",
      "transition-[color,box-shadow] outline-none",
      "data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
    ],
    segments: "flex cursor-text items-center whitespace-nowrap",
    segment: [
      "rounded-none px-0.5 tabular-nums caret-transparent outline-none",
      "[-webkit-tap-highlight-color:transparent]",
      "data-[placeholder]:text-default-text-placeholder",
      "data-[type=literal]:text-default-text data-[type=literal]:px-0",
      "selection:bg-default-bg selection:text-default-text-contrast",
      "data-[focused]:bg-default-bg",
      "data-[focus-visible]:bg-default-bg",
      "data-[disabled]:text-default-text",
    ],
    separator: "text-default-text shrink-0 px-1 select-none",
    inputLeftIcon:
      "absolute top-1/2 left-3 -translate-y-1/2 [&_svg]:size-4 [&_svg]:shrink-0",
    inputRightIconButtons: "absolute top-1/2 right-2 -translate-y-1/2",
  },
  variants: {
    fullWidth: {
      true: {
        root: "w-full",
      },
    },
    isDisabled: {
      true: {
        input: "pointer-events-none cursor-not-allowed opacity-50",
      },
    },
    isInvalid: {
      true: {
        input: [
          "ring-error-bg border-error-border ring-focus",
          "data-[focus-within]:ring-error-bg",
          "data-[focus-within]:border-error-border",
          "focus-within:ring-error-bg focus-within:border-error-border",
        ],
      },
    },
    hasLeftIcon: {
      true: {
        input: "pl-9",
      },
    },
    hasRightIconButton: {
      true: {
        input: "pr-16",
      },
    },
    active: {
      true: {
        input: "ring-accent-bg border-accent-border ring-focus",
      },
    },
    focusOutlineDisabled: {
      false: {
        input: [
          "data-[focus-within]:ring-accent-bg",
          "data-[focus-within]:border-accent-border",
          "data-[focus-within]:ring-focus",
          "focus-within:ring-accent-bg focus-within:border-accent-border",
          "focus-within:ring-focus",
        ],
      },
    },
  },
  defaultVariants: {
    fullWidth: true,
    focusOutlineDisabled: false,
  },
});

export type DateInputVariantsProps = VariantProps<typeof dateInputVariants>;
