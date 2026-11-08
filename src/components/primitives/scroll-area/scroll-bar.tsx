"use client";

import type { ComponentProps } from "react";
import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";

import { scrollAreaVariants } from "./scroll-area.variants";

const { scrollbar, thumb } = scrollAreaVariants();

export type ScrollBarProps = ComponentProps<typeof BaseScrollArea.Scrollbar>;

export function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ScrollBarProps) {
  return (
    <BaseScrollArea.Scrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={(state) =>
        scrollbar({
          className: typeof className === "function" ? className(state) : className,
        })
      }
      {...props}
    >
      <BaseScrollArea.Thumb data-slot="scroll-area-thumb" className={thumb()} />
    </BaseScrollArea.Scrollbar>
  );
}
