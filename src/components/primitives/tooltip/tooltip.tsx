"use client";

import type { ComponentProps } from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

import { tooltipVariants, type TooltipVariantsProps } from "./tooltip.variants";

export type TooltipProviderProps = ComponentProps<typeof BaseTooltip.Provider>;

export function TooltipProvider({ delay = 0, ...props }: TooltipProviderProps) {
  return <BaseTooltip.Provider delay={delay} {...props} />;
}

export type TooltipProps = ComponentProps<typeof BaseTooltip.Root>;

export function Tooltip({ ...props }: TooltipProps) {
  return <BaseTooltip.Root {...props} />;
}

export type TooltipTriggerProps = ComponentProps<typeof BaseTooltip.Trigger>;

export function TooltipTrigger({ ...props }: TooltipTriggerProps) {
  return <BaseTooltip.Trigger {...props} />;
}

export type TooltipContentProps = Omit<
  ComponentProps<typeof BaseTooltip.Positioner>,
  "className"
> &
  TooltipVariantsProps & {
    className?: ComponentProps<typeof BaseTooltip.Popup>["className"];
    children?: React.ReactNode;
    showArrow?: boolean;
  };

export function TooltipContent({
  className,
  align = "center",
  side = "top",
  showArrow = true,
  sideOffset = showArrow ? 8 : 4,
  children,
  ...props
}: TooltipContentProps) {
  const { tooltipContent, tooltipArrow, tooltipArrowIcon } = tooltipVariants();

  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner
        align={align}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
        {...props}
      >
        <BaseTooltip.Popup
          data-slot="tooltip-content"
          className={(state) =>
            tooltipContent({
              className: typeof className === "function" ? className(state) : className,
            })
          }
        >
          {children}
          {showArrow && (
            <BaseTooltip.Arrow data-slot="tooltip-arrow" className={tooltipArrow()}>
              {/* Stroke ends sit on the popup's 1px border row (y 5–6). */}
              <svg
                width="12"
                height="6"
                viewBox="0 0 12 6"
                className={tooltipArrowIcon()}
              >
                <path d="M0 5.5 L6 0.5 L12 5.5 V6 H0 Z" stroke="none" />
                <path d="M0 5.5 L6 0.5 L12 5.5" fill="none" strokeLinejoin="round" />
              </svg>
            </BaseTooltip.Arrow>
          )}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  );
}
