import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { getVariantProps } from "../../../utils/tailwind-variants";
import type { BadgeVariantProps } from "./badge.variants";
import { badgeVariants } from "./badge.variants";

export type BadgeProps = useRender.ComponentProps<"span"> & BadgeVariantProps;

export function Badge({ className, render, ...props }: BadgeProps) {
  const { variantProps, componentProps } = getVariantProps(
    props,
    badgeVariants.variantKeys
  );

  const _className = badgeVariants({ ...variantProps, className });

  const element = useRender({
    defaultTagName: "span",
    render,
    props: mergeProps<"span">({ className: _className }, componentProps),
  });

  return element;
}
