"use client";

import type { ComponentProps, ReactNode } from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { Check, ChevronRight } from "lucide-react";

import { getVariantProps } from "../../../utils/tailwind-variants";
import {
  menuContentVariants,
  menuItemVariants,
  menuLabelVariants,
  menuSeparatorVariants,
  menuShortcutVariants,
  type MenuContentVariantsProps,
  type MenuItemVariantsProps,
} from "./menu.variants";

export type MenuProps = ComponentProps<typeof BaseMenu.Root>;

export function Menu({ ...props }: MenuProps) {
  return <BaseMenu.Root {...props} />;
}

export type MenuTriggerProps = ComponentProps<typeof BaseMenu.Trigger>;

export function MenuTrigger({ ...props }: MenuTriggerProps) {
  return <BaseMenu.Trigger {...props} />;
}

export type MenuContentProps = Omit<
  ComponentProps<typeof BaseMenu.Positioner>,
  "className"
> &
  MenuContentVariantsProps & {
    className?: ComponentProps<typeof BaseMenu.Popup>["className"];
    children?: ReactNode;
  };

type MenuPopupFrameProps = MenuContentProps & {
  dataSlot: "menu-content" | "menu-sub-content";
};

function MenuPopupFrame({
  className,
  align,
  side,
  sideOffset,
  children,
  dataSlot,
  ...props
}: MenuPopupFrameProps) {
  const { variantProps, componentProps } = getVariantProps(
    props,
    menuContentVariants.variantKeys
  );

  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        align={align}
        side={side}
        sideOffset={sideOffset}
        {...componentProps}
      >
        <BaseMenu.Popup
          data-slot={dataSlot}
          className={(state) =>
            menuContentVariants({
              ...variantProps,
              className: typeof className === "function" ? className(state) : className,
            })
          }
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

export function MenuContent({
  align = "start",
  side = "bottom",
  sideOffset = 4,
  ...props
}: MenuContentProps) {
  return (
    <MenuPopupFrame
      align={align}
      side={side}
      sideOffset={sideOffset}
      dataSlot="menu-content"
      {...props}
    />
  );
}

export function MenuSubContent({
  align = "start",
  side = "right",
  sideOffset = 2,
  alignOffset = -4,
  ...props
}: MenuContentProps) {
  return (
    <MenuPopupFrame
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      dataSlot="menu-sub-content"
      {...props}
    />
  );
}

export type MenuGroupProps = ComponentProps<typeof BaseMenu.Group>;

export function MenuGroup({ ...props }: MenuGroupProps) {
  return <BaseMenu.Group data-slot="menu-group" {...props} />;
}

export type MenuLabelProps = ComponentProps<typeof BaseMenu.GroupLabel>;

export function MenuLabel({ className, ...props }: MenuLabelProps) {
  return (
    <BaseMenu.GroupLabel
      data-slot="menu-label"
      className={(state) =>
        menuLabelVariants({
          className: typeof className === "function" ? className(state) : className,
        })
      }
      {...props}
    />
  );
}

export type MenuItemProps = ComponentProps<typeof BaseMenu.Item> & MenuItemVariantsProps;

export function MenuItem({ className, variant, active, ...props }: MenuItemProps) {
  return (
    <BaseMenu.Item
      data-slot="menu-item"
      className={(state) =>
        menuItemVariants({
          variant,
          active,
          className: typeof className === "function" ? className(state) : className,
        })
      }
      {...props}
    />
  );
}

export type MenuCheckboxItemProps = ComponentProps<typeof BaseMenu.CheckboxItem> &
  MenuItemVariantsProps;

export function MenuCheckboxItem({
  className,
  variant,
  active,
  children,
  ...props
}: MenuCheckboxItemProps) {
  return (
    <BaseMenu.CheckboxItem
      data-slot="menu-checkbox-item"
      className={(state) =>
        menuItemVariants({
          variant,
          active,
          className: typeof className === "function" ? className(state) : className,
        })
      }
      {...props}
    >
      {children}
      <BaseMenu.CheckboxItemIndicator
        keepMounted
        className="ml-auto flex size-4 items-center justify-center data-unchecked:invisible"
      >
        <Check />
      </BaseMenu.CheckboxItemIndicator>
    </BaseMenu.CheckboxItem>
  );
}

export type MenuRadioGroupProps = ComponentProps<typeof BaseMenu.RadioGroup>;

export function MenuRadioGroup({ ...props }: MenuRadioGroupProps) {
  return <BaseMenu.RadioGroup data-slot="menu-radio-group" {...props} />;
}

export type MenuRadioItemProps = ComponentProps<typeof BaseMenu.RadioItem> &
  MenuItemVariantsProps;

export function MenuRadioItem({
  className,
  variant,
  active,
  children,
  ...props
}: MenuRadioItemProps) {
  return (
    <BaseMenu.RadioItem
      data-slot="menu-radio-item"
      className={(state) =>
        menuItemVariants({
          variant,
          active,
          className: typeof className === "function" ? className(state) : className,
        })
      }
      {...props}
    >
      {children}
      <BaseMenu.RadioItemIndicator
        keepMounted
        className="ml-auto flex size-4 items-center justify-center data-unchecked:invisible"
      >
        <Check />
      </BaseMenu.RadioItemIndicator>
    </BaseMenu.RadioItem>
  );
}

export type MenuSeparatorProps = ComponentProps<typeof BaseMenu.Separator>;

export function MenuSeparator({ className, ...props }: MenuSeparatorProps) {
  return (
    <BaseMenu.Separator
      data-slot="menu-separator"
      className={(state) =>
        menuSeparatorVariants({
          className: typeof className === "function" ? className(state) : className,
        })
      }
      {...props}
    />
  );
}

export type MenuShortcutProps = ComponentProps<"span">;

export function MenuShortcut({ className, ...props }: MenuShortcutProps) {
  return (
    <span
      data-slot="menu-shortcut"
      className={menuShortcutVariants({ className })}
      {...props}
    />
  );
}

export type MenuSubProps = ComponentProps<typeof BaseMenu.SubmenuRoot>;

export function MenuSub({ ...props }: MenuSubProps) {
  return <BaseMenu.SubmenuRoot {...props} />;
}

export type MenuSubTriggerProps = ComponentProps<typeof BaseMenu.SubmenuTrigger> &
  MenuItemVariantsProps;

export function MenuSubTrigger({
  className,
  variant,
  active,
  children,
  ...props
}: MenuSubTriggerProps) {
  return (
    <BaseMenu.SubmenuTrigger
      data-slot="menu-sub-trigger"
      className={(state) =>
        menuItemVariants({
          variant,
          active,
          className: typeof className === "function" ? className(state) : className,
        })
      }
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto" />
    </BaseMenu.SubmenuTrigger>
  );
}
