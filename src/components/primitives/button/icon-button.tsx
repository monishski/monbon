import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { Button as BaseButton } from "@base-ui/react/button";

import { getVariantProps } from "../../../utils/tailwind-variants";
import { isTruthy } from "../../../utils/validity";
import type { IconButtonVariantsProps } from "./icon-button.variants";
import { iconButtonVariants } from "./icon-button.variants";

export type IconButtonProps = ComponentPropsWithoutRef<typeof BaseButton> &
  IconButtonVariantsProps;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, children, render, ...props }, ref) => {
    const { variantProps, componentProps } = getVariantProps(props, [
      ...iconButtonVariants.extend.variantKeys,
      ...iconButtonVariants.variantKeys,
    ]);

    const disabled = variantProps.disabled || isTruthy(componentProps["aria-disabled"]);

    return (
      <BaseButton
        ref={ref}
        className={(state) =>
          iconButtonVariants({
            ...variantProps,
            disabled,
            className: typeof className === "function" ? className(state) : className,
          })
        }
        disabled={disabled}
        render={render}
        {...componentProps}
      >
        {children}
      </BaseButton>
    );
  }
);

IconButton.displayName = "IconButton";
