"use client";

import type { ComponentProps } from "react";
import { useCallback, useState } from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { ChevronDown, ChevronUp, X } from "lucide-react";

import { getVariantProps } from "../../../utils/tailwind-variants";
import { IconButton } from "../button";
import { Row } from "../flex";
import { selectVariants, type SelectVariantsProps } from "./select.variants";

export type SelectProps<
  Value,
  Multiple extends boolean | undefined = false,
> = SelectVariantsProps &
  Omit<ComponentProps<typeof BaseSelect.Root<Value, Multiple>>, "id" | "children"> & {
    id?: string;
    className?: ComponentProps<typeof BaseSelect.Trigger>["className"];
    placeholder?: string;
    children?: React.ReactNode;
    onClear?: () => void;
    "aria-label"?: string;
    "aria-invalid"?: boolean;
  };

export function Select<Value, Multiple extends boolean | undefined = false>({
  id,
  value,
  items,
  children,
  placeholder = "Select an option...",
  size = "md",
  fullWidth = true,
  alignItemWithTrigger = false,
  disabled,
  onClear,
  "aria-label": ariaLabel,
  "aria-invalid": ariaInvalid,
  className,
  ...props
}: SelectProps<Value, Multiple>) {
  const [open, setOpen] = useState(false);

  const { variantProps, componentProps } = getVariantProps(
    {
      disabled,
      size,
      fullWidth,
      alignItemWithTrigger,
      ...props,
    },
    selectVariants.variantKeys
  );

  const {
    selectTrigger,
    selectTriggerValue,
    selectTriggerIconButton,
    selectTriggerIcon,
    selectContent,
    selectViewport,
    selectScrollArrow,
  } = selectVariants(variantProps);

  const handleClear = useCallback(
    (e: React.MouseEvent | React.PointerEvent | React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onClear?.();
    },
    [onClear]
  );

  return (
    <BaseSelect.Root
      open={open}
      onOpenChange={setOpen}
      disabled={disabled}
      value={value}
      items={items}
      {...componentProps}
    >
      <BaseSelect.Trigger
        id={id}
        data-slot="select-trigger"
        className={(state) =>
          selectTrigger({
            className: typeof className === "function" ? className(state) : className,
          })
        }
        aria-label={ariaLabel}
        aria-invalid={ariaInvalid || undefined}
      >
        <BaseSelect.Value
          data-slot="select-value"
          placeholder={placeholder}
          className={selectTriggerValue()}
        />

        <Row gap="2xs" className="shrink-0">
          {onClear && value != null && (!Array.isArray(value) || value.length > 0) && (
            <IconButton
              variant="ghost"
              size={size === "sm" ? "2xs" : "xs"}
              className={selectTriggerIconButton()}
              onClick={handleClear}
              onPointerDown={handleClear}
            >
              <X />
            </IconButton>
          )}
          <IconButton
            render={
              <BaseSelect.Icon>
                <ChevronDown className={selectTriggerIcon()} />
              </BaseSelect.Icon>
            }
            nativeButton={false}
            tabIndex={-1}
            variant="ghost"
            size={size === "sm" ? "2xs" : "xs"}
            className={selectTriggerIconButton()}
            active={open || props.open}
          />
        </Row>
      </BaseSelect.Trigger>

      <BaseSelect.Portal>
        <BaseSelect.Positioner
          sideOffset={alignItemWithTrigger ? 0 : size === "sm" ? 2 : 4}
          alignItemWithTrigger={alignItemWithTrigger}
        >
          <BaseSelect.Popup
            data-slot="select-content"
            data-size={size}
            className={selectContent()}
          >
            <BaseSelect.ScrollUpArrow
              data-slot="select-scroll-up"
              className={selectScrollArrow()}
            >
              <ChevronUp />
            </BaseSelect.ScrollUpArrow>
            <BaseSelect.List className={selectViewport()}>{children}</BaseSelect.List>
            <BaseSelect.ScrollDownArrow
              data-slot="select-scroll-down"
              className={selectScrollArrow()}
            >
              <ChevronDown />
            </BaseSelect.ScrollDownArrow>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
