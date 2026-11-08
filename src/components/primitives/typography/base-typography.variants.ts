import { tv } from "../../../utils/tv";

export const baseTypographyVariants = tv({
  base: [],
  variants: {
    family: {
      sans: "font-sans",
      mono: "font-mono",
      number: "font-number",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    color: {
      default: "text-default-text-contrast",
      muted: "text-default-text",
      placeholder: "text-default-text-placeholder",
      disabled: "text-default-text-disabled",
      accent: "text-accent-text",
      error: "text-error-text",
      success: "text-success-text",
      warning: "text-warning-text",
      info: "text-info-text",
      positive: "text-positive-text",
      negative: "text-negative-text",
      neutral: "text-neutral-text",
    },
    fullWidth: {
      true: "w-full",
    },
    wrap: {
      wrap: "text-wrap",
      nowrap: "text-nowrap",
      balance: "text-balance",
      pretty: "text-pretty",
    },
    wordBreak: {
      normal: "break-normal",
      words: "break-words",
      all: "break-all",
      keep: "break-keep",
    },
    truncate: {
      true: "truncate",
    },
    maxLines: {
      1: "line-clamp-1",
      2: "line-clamp-2",
      3: "line-clamp-3",
      4: "line-clamp-4",
      5: "line-clamp-5",
      6: "line-clamp-6",
    },
  },
  defaultVariants: {
    align: "left",
    color: "default",
    fullWidth: true,
    wordBreak: "normal",
  },
});
