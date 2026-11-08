"use client";

import type { ComponentProps, ReactNode } from "react";
import { Popover as BasePopover } from "@base-ui/react/popover";

import { getVariantProps } from "../../../utils/tailwind-variants";
import { popoverVariants, type PopoverVariantsProps } from "./popover.variants";

export type PopoverProps = ComponentProps<typeof BasePopover.Root>;

export function Popover({ ...props }: PopoverProps) {
  return <BasePopover.Root {...props} />;
}

export type PopoverTriggerProps = ComponentProps<typeof BasePopover.Trigger>;

export function PopoverTrigger({ ...props }: PopoverTriggerProps) {
  return <BasePopover.Trigger {...props} />;
}

export type PopoverContentProps = Omit<
  ComponentProps<typeof BasePopover.Positioner>,
  "className"
> &
  PopoverVariantsProps & {
    className?: ComponentProps<typeof BasePopover.Popup>["className"];
    children?: ReactNode;
  };

export function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  children,
  ...props
}: PopoverContentProps) {
  const { variantProps, componentProps } = getVariantProps(
    props,
    popoverVariants.variantKeys
  );

  return (
    <BasePopover.Portal>
      <BasePopover.Positioner align={align} sideOffset={sideOffset} {...componentProps}>
        <BasePopover.Popup
          className={(state) =>
            popoverVariants({
              ...variantProps,
              className: typeof className === "function" ? className(state) : className,
            })
          }
        >
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}
