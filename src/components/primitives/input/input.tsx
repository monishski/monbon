"use client";

import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { X } from "lucide-react";

import { cn } from "../../../utils/cn";
import { getVariantProps } from "../../../utils/tailwind-variants";
import { IconButton } from "../button";
import { Row } from "../flex";
import { inputVariants, type InputVariantsProps } from "./input.variants";

type InputProps = {
  leftIcon?: React.ReactNode;
  rightIconButton?: React.ReactNode;
  onClear?: () => void;
} & ComponentProps<"input"> &
  InputVariantsProps;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { value, className, id, disabled, leftIcon, rightIconButton, onClear, ...props },
    ref
  ) => {
    const { variantProps, componentProps: inputProps } = getVariantProps(
      { disabled, ...props },
      inputVariants.variantKeys
    );

    const { input, inputLeftIcon, inputRightIconButtons } = inputVariants({
      ...variantProps,
      hasLeftIcon: Boolean(leftIcon),
      hasRightIconButton: Boolean(rightIconButton),
    });

    const isDisabled = Boolean(variantProps.disabled);

    return (
      <Row fullWidth className={cn("relative", className)}>
        {leftIcon && <Row className={inputLeftIcon()}>{leftIcon}</Row>}

        <input
          {...inputProps}
          ref={ref}
          id={id}
          className={input()}
          disabled={isDisabled}
          value={value}
        />

        <Row gap="2xs" className={inputRightIconButtons()}>
          {value && !isDisabled && (
            <IconButton
              variant="ghost"
              size="xs"
              onClick={onClear}
              aria-label="Clear input"
            >
              <X />
            </IconButton>
          )}
          {rightIconButton}
        </Row>
      </Row>
    );
  }
);

Input.displayName = "Input";
