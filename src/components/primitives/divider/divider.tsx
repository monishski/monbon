"use client";

import type { ComponentProps } from "react";
import { Separator as BaseSeparator } from "@base-ui/react/separator";

import { getVariantProps } from "../../../utils/tailwind-variants";
import type { DividerVariantsProps } from "./divider.variants";
import { dividerVariants } from "./divider.variants";

type DividerProps = ComponentProps<typeof BaseSeparator> & DividerVariantsProps;

export function Divider({ className, ...props }: DividerProps) {
  const { variantProps, componentProps } = getVariantProps(
    props,
    dividerVariants.variantKeys
  );

  return (
    <BaseSeparator
      orientation={variantProps.orientation}
      className={(state) =>
        dividerVariants({
          ...variantProps,
          className: typeof className === "function" ? className(state) : className,
        })
      }
      {...componentProps}
    />
  );
}
