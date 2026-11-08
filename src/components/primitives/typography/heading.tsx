import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import { getVariantProps } from "../../../utils/tailwind-variants";
import type { HeadingAs, HeadingVariantsProps } from "./heading.variants";
import { headingTypeFromAs, headingVariants } from "./heading.variants";

export type HeadingProps = Omit<
  ComponentPropsWithoutRef<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">,
  "color"
> &
  HeadingVariantsProps & {
    as?: HeadingAs;
  };

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ children, className, as = "h1", truncate, maxLines, ...props }, ref) => {
    const { variantProps, componentProps } = getVariantProps(
      props,
      headingVariants.variantKeys
    );

    const type = variantProps.type ?? headingTypeFromAs[as];
    const Component = as;

    return (
      <Component
        ref={ref}
        className={headingVariants({
          ...variantProps,
          type,
          // maxLines wins over truncate when both are set
          truncate: maxLines ? undefined : truncate,
          maxLines,
          className,
        })}
        {...componentProps}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";
