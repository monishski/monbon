import { tv } from "../../../utils/tv";

export const baseButtonVariants = tv({
  base: [
    "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2",
    "border border-transparent bg-clip-padding outline-none select-none",
    "transition-all duration-150 ease-in-out",
    "focus-visible:border-accent-border focus-visible:ring-accent-bg focus-visible:ring-focus",
    "aria-invalid:border-error-border aria-invalid:ring-error-bg aria-invalid:ring-focus",
    "active:scale-[0.95] active:not-aria-[haspopup]:translate-y-0.5",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:stroke-[1.5]",
    "tracking-tight text-balance",
  ],
  variants: {
    variant: {
      primary:
        "bg-accent-solid hover:bg-accent-solid-hover data-popup-open:bg-accent-solid-hover text-accent-contrast",
      secondary:
        "bg-default-bg hover:bg-default-bg-hover data-popup-open:bg-default-bg-hover text-default-text-contrast",
      outline:
        "border-default-line hover:bg-default-bg-hover data-popup-open:bg-default-bg-hover text-default-text-contrast border",
      ghost:
        "hover:bg-default-bg-hover data-popup-open:bg-default-bg-hover text-default-text-contrast",
      destructive: [
        "bg-negative-bg hover:bg-negative-bg-hover data-popup-open:bg-negative-bg-hover !text-negative-text",
        "focus-visible:border-negative-border focus-visible:ring-negative-bg",
        "font-semibold",
      ],
    },
    disabled: {
      true: "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    },
    active: {
      true: "",
    },
  },
  compoundVariants: [
    { active: true, variant: "primary", class: "bg-accent-solid-hover" },
    { active: true, variant: "secondary", class: "bg-default-bg-hover" },
    { active: true, variant: "outline", class: "bg-default-bg-hover" },
    { active: true, variant: "ghost", class: "bg-default-bg-hover" },
    {
      active: true,
      variant: "destructive",
      class: "bg-negative-bg-hover",
    },
  ],
  defaultVariants: {
    variant: "primary",
    disabled: false,
  },
});
