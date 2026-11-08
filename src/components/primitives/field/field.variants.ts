import type { VariantProps } from "tailwind-variants";

import { tv } from "../../../utils/tv";

export const fieldVariants = tv({
  slots: {
    root: "group",
    label: [
      "flex items-center gap-2 leading-none [&_svg]:size-4 [&_svg]:shrink-0",
      "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
    ],
    description: [
      "text-default-text group-data-[invalid=true]:text-error-text leading-none",
      "group-data-[disabled=true]:opacity-50",
    ],
    error: "group-data-[disabled=true]:opacity-50",
  },
});

export type FieldVariantsProps = VariantProps<typeof fieldVariants>;
