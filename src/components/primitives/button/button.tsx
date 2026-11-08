import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { Button as BaseButton } from "@base-ui/react/button";

import { getVariantProps } from "../../../utils/tailwind-variants";
import { isTruthy } from "../../../utils/validity";
import type { ButtonVariantsProps } from "./button.variants";
import { buttonVariants } from "./button.variants";

export type ButtonProps = ComponentPropsWithoutRef<typeof BaseButton> &
  ButtonVariantsProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, render, ...props }, ref) => {
    const { variantProps, componentProps } = getVariantProps(props, [
      ...buttonVariants.extend.variantKeys,
      ...buttonVariants.variantKeys,
    ]);

    const disabled = variantProps.disabled || isTruthy(componentProps["aria-disabled"]);

    return (
      <BaseButton
        ref={ref}
        className={(state) =>
          buttonVariants({
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

Button.displayName = "Button";
