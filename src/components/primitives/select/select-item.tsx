"use client";

import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { Select } from "@base-ui/react/select";
import { Check } from "lucide-react";

import { tv } from "../../../utils/tv";

export const selectItemVariants = tv({
  slots: {
    selectItem: [
      "flex items-center",
      "relative w-full cursor-pointer outline-hidden select-none",
      "focus:bg-default-bg",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "data-[selected]:bg-default-bg",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0",
      "*:data-[slot=select-item-text]:min-w-0 *:data-[slot=select-item-text]:flex-1 *:data-[slot=select-item-text]:truncate",
      "typography-body-md",
      "rounded-menu-inner gap-2 px-2 py-1.5 [&_svg]:size-4",
      "group-data-[size=sm]/select:typography-body-sm group-data-[size=sm]/select:rounded-menu-sm-inner group-data-[size=sm]/select:gap-1.5 group-data-[size=sm]/select:px-1.5 group-data-[size=sm]/select:py-1 group-data-[size=sm]/select:[&_svg]:size-3",
    ],
    selectItemIndicator: "shrink-0",
  },
});

export type SelectItemProps = ComponentProps<typeof Select.Item>;

// TODO: you can navigate to disabled items when you use arrow keys
export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, ...props }, ref) => {
    const { selectItem, selectItemIndicator } = selectItemVariants();

    return (
      <Select.Item
        ref={ref}
        data-slot="select-item"
        className={(state) =>
          selectItem({
            className: typeof className === "function" ? className(state) : className,
          })
        }
        {...props}
      >
        <Select.ItemText data-slot="select-item-text">{children}</Select.ItemText>
        <Select.ItemIndicator className={selectItemIndicator()}>
          <Check />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";
