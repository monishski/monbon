"use client";

import type { ComponentProps } from "react";
import { Switch as BaseSwitch } from "@base-ui/react/switch";

import type { SwitchVariantsProps } from "./switch.variants";
import { switchVariants } from "./switch.variants";

export type SwitchProps = ComponentProps<typeof BaseSwitch.Root> & SwitchVariantsProps;

export function Switch({ className, size, ...props }: SwitchProps) {
  const { root, thumb } = switchVariants({ size });

  return (
    <BaseSwitch.Root
      data-slot="switch"
      className={(state) =>
        root({
          className: typeof className === "function" ? className(state) : className,
        })
      }
      {...props}
    >
      <BaseSwitch.Thumb className={thumb()} />
    </BaseSwitch.Root>
  );
}
