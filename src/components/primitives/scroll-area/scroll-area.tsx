"use client";

import type { ComponentProps, Ref } from "react";
import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";

import { scrollAreaVariants } from "./scroll-area.variants";
import { ScrollBar } from "./scroll-bar";

const { root, viewport } = scrollAreaVariants();

export type ScrollAreaProps = ComponentProps<typeof BaseScrollArea.Root> & {
  size?: number;
  showScrollbar?: boolean;
  viewportRef?: Ref<HTMLDivElement>;
};

export function ScrollArea({
  className,
  children,
  size = 40,
  style,
  showScrollbar = true,
  viewportRef,
  ...props
}: ScrollAreaProps) {
  const shadowSizeStyle: Record<"--scroll-area-shadow-size", string> = {
    "--scroll-area-shadow-size": `${size}px`,
  };

  return (
    <BaseScrollArea.Root
      data-slot="scroll-area"
      {...props}
      className={(state) =>
        root({
          className: typeof className === "function" ? className(state) : className,
        })
      }
      style={(state) => ({
        ...shadowSizeStyle,
        ...(typeof style === "function" ? style(state) : style),
      })}
    >
      <BaseScrollArea.Viewport
        ref={viewportRef}
        data-slot="scroll-area-viewport"
        className={viewport()}
      >
        <BaseScrollArea.Content data-slot="scroll-area-content">
          {children}
        </BaseScrollArea.Content>
      </BaseScrollArea.Viewport>
      {showScrollbar && (
        <>
          <ScrollBar orientation="vertical" />
          <ScrollBar orientation="horizontal" />
          <BaseScrollArea.Corner />
        </>
      )}
    </BaseScrollArea.Root>
  );
}
