import type { VariantProps } from "tailwind-variants";

import { tv } from "../../../utils/tv";

export const labelVariants = tv({
  base: [
    "typography-label",
    "select-none",
    "group-data-[disabled=true]:text-default-text group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
    "peer-disabled:text-default-text peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
    "group-data-[invalid=true]:text-error-text",
    "peer-invalid:text-error-text",
  ],
});

export type LabelVariantProps = VariantProps<typeof labelVariants>;
