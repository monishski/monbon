"use client";

import { useState } from "react";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../utils/cn";
import { getVariantProps } from "../../../utils/tailwind-variants";
import {
  avatarBadgeVariants,
  avatarFallbackVariants,
  avatarGroupVariants,
  avatarVariants,
  type AvatarBadgeVariantProps,
  type AvatarFallbackVariantProps,
  type AvatarVariantProps,
} from "./avatar.variants";

export type AvatarImageProps = {
  src: string;
  alt: string;
  className?: string;
  onError?: () => void;
};

export function AvatarImage({ src, alt, className, onError }: AvatarImageProps) {
  return (
    <img
      data-slot="avatar-image"
      src={src}
      alt={alt}
      className={cn("absolute inset-0 size-full rounded-full object-cover", className)}
      onError={onError}
    />
  );
}

export type AvatarFallbackProps = AvatarFallbackVariantProps & {
  children?: ReactNode;
  className?: string;
};

export function AvatarFallback({ children, className, ...props }: AvatarFallbackProps) {
  const { variantProps, componentProps } = getVariantProps(
    props,
    avatarFallbackVariants.variantKeys
  );

  return (
    <span
      data-slot="avatar-fallback"
      className={avatarFallbackVariants({ ...variantProps, className })}
      {...componentProps}
    >
      {children}
    </span>
  );
}

export type AvatarBadgeProps = AvatarBadgeVariantProps & {
  children?: ReactNode;
  className?: string;
};

export function AvatarBadge({ children, className, ...props }: AvatarBadgeProps) {
  const { variantProps, componentProps } = getVariantProps(
    props,
    avatarBadgeVariants.variantKeys
  );

  return (
    <span
      data-slot="avatar-badge"
      className={avatarBadgeVariants({ ...variantProps, className })}
      {...componentProps}
    >
      {children}
    </span>
  );
}

export type AvatarProps = Omit<ComponentProps<"span">, "children"> &
  AvatarVariantProps & {
    src?: string | null;
    alt?: string;
    fallback?: ReactNode;
    badge?: ReactNode;
  };

export function Avatar({ className, src, alt, fallback, badge, ...props }: AvatarProps) {
  const [hasError, setHasError] = useState(false);
  const { variantProps, componentProps } = getVariantProps(
    props,
    avatarVariants.variantKeys
  );
  const size = variantProps.size ?? "md";
  const label = alt ?? "Avatar";

  return (
    <span
      data-slot="avatar"
      className={avatarVariants({ ...variantProps, className })}
      {...componentProps}
    >
      {src && !hasError ? (
        <AvatarImage src={src} alt={label} onError={() => setHasError(true)} />
      ) : (
        <AvatarFallback size={size}>{fallback}</AvatarFallback>
      )}
      {badge ? <AvatarBadge size={size}>{badge}</AvatarBadge> : null}
    </span>
  );
}

export type AvatarGroupItem = {
  id: string;
  src?: string | null;
  alt?: string;
  fallback?: ReactNode;
  badge?: ReactNode;
};

export type AvatarGroupProps = Omit<ComponentProps<"div">, "children"> & {
  avatars: AvatarGroupItem[];
  max?: number;
  size?: AvatarVariantProps["size"];
  overflow?: ReactNode;
};

export function AvatarGroup({
  avatars,
  max,
  size,
  overflow,
  className,
  ...props
}: AvatarGroupProps) {
  const visible = max == null ? avatars : avatars.slice(0, max);
  const hiddenCount = max == null ? 0 : Math.max(avatars.length - max, 0);

  return (
    <div
      data-slot="avatar-group"
      className={avatarGroupVariants({ className })}
      {...props}
    >
      {visible.map((item) => (
        <Avatar
          key={item.id}
          src={item.src}
          alt={item.alt}
          fallback={item.fallback}
          badge={item.badge}
          size={size}
        />
      ))}
      {hiddenCount > 0 ? (
        <Avatar size={size} fallback={overflow ?? `+${hiddenCount}`} />
      ) : null}
    </div>
  );
}
