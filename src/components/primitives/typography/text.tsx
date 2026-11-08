import { forwardRef } from "react";

import type { PolymorphicProps } from "../../../types/utils";
import { getVariantProps } from "../../../utils/tailwind-variants";
import { textVariants, type TextVariantsProps } from "./text.variants";

type TextProps = PolymorphicProps<"p" | "span"> & TextVariantsProps;

export const Text = forwardRef<HTMLParagraphElement & HTMLSpanElement, TextProps>(
  ({ children, className, as = "span", truncate, maxLines, wrap, ...props }, ref) => {
    const { variantProps, componentProps } = getVariantProps(
      props,
      textVariants.variantKeys
    );

    const Component = as;

    return (
      <Component
        ref={ref}
        className={textVariants({
          ...variantProps,
          // maxLines wins over truncate when both are set
          truncate: maxLines ? undefined : truncate,
          // truncate needs nowrap; the default text-wrap would win otherwise
          wrap: truncate && !maxLines ? "nowrap" : wrap,
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

Text.displayName = "Text";
