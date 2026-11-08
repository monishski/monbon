import type { VariantProps } from "tailwind-variants";

import { tv } from "../../../utils/tv";

export const inputVariants = tv({
  slots: {
    input: [
      "typography-body-md",
      "h-element-md rounded-element-md w-full py-1 pr-9 pl-3",
      "peer bg-panel border-default-line border shadow-xs transition-[color,box-shadow]",
      "placeholder:text-default-text-placeholder",
      "selection:bg-accent-solid selection:text-accent-contrast",
      "focus-visible:outline-none",
      "aria-[invalid=true]:ring-error-bg aria-[invalid=true]:border-error-border",
      "aria-[invalid=true]:ring-focus",
      "aria-[invalid=true]:focus-visible:ring-error-bg",
      "aria-[invalid=true]:focus-visible:border-error-border",
    ],
    inputLeftIcon:
      "absolute top-1/2 left-3 -translate-y-1/2 [&_svg]:size-4 [&_svg]:shrink-0",
    inputRightIconButtons: "absolute top-1/2 right-2 -translate-y-1/2",
  },
  variants: {
    disabled: {
      true: {
        input:
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
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
    focusOutlineDisabled: {
      false: {
        input:
          "focus-visible:ring-accent-bg focus-visible:border-accent-border focus-visible:ring-focus",
      },
    },
    active: {
      true: {
        input: "ring-accent-bg border-accent-border ring-focus",
      },
    },
  },
  defaultVariants: {
    focusOutlineDisabled: false,
  },
});

export type InputVariantsProps = VariantProps<typeof inputVariants>;
