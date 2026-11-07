import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const INTENTS = [
  "accent",
  "default",
  "neutral",
  "info",
  "success",
  "warning",
  "error",
  "positive",
  "negative",
] as const;

const STEPS = [
  "base",
  "bg-subtle",
  "bg",
  "bg-hover",
  "bg-active",
  "line",
  "border",
  "border-hover",
  "solid",
  "solid-hover",
  "text",
  "text-contrast",
  "text-placeholder",
  "text-disabled",
  "contrast",
] as const;

const SURFACES = [
  { name: "app", variable: "--app-bg", utility: "bg-app" },
  { name: "panel", variable: "--panel", utility: "bg-panel" },
  { name: "overlay", variable: "--overlay", utility: "bg-overlay" },
  { name: "shadow", variable: "--shadow", utility: "shadow-shadow" },
];

// Full class names, so Tailwind's scanner generates every utility
const TYPOGRAPHY = [
  { name: "display-1", className: "typography-display-1" },
  { name: "display-2", className: "typography-display-2" },
  { name: "display-3", className: "typography-display-3" },
  { name: "display-4", className: "typography-display-4" },
  { name: "display-5", className: "typography-display-5" },
  { name: "display-6", className: "typography-display-6" },
  { name: "heading-1", className: "typography-heading-1" },
  { name: "heading-2", className: "typography-heading-2" },
  { name: "heading-3", className: "typography-heading-3" },
  { name: "heading-4", className: "typography-heading-4" },
  { name: "heading-5", className: "typography-heading-5" },
  { name: "heading-6", className: "typography-heading-6" },
  { name: "large", className: "typography-large" },
  { name: "body-lg", className: "typography-body-lg" },
  { name: "body-md", className: "typography-body-md" },
  { name: "body-sm", className: "typography-body-sm" },
  { name: "body-xs", className: "typography-body-xs" },
  { name: "label", className: "typography-label" },
  { name: "supporting", className: "typography-supporting" },
  { name: "code", className: "typography-code" },
];

const ELEMENT_SIZES = ["2xs", "xs", "sm", "md", "lg"] as const;

// Tailwind only outputs a theme variable when a utility uses it, so these are full
// utility classes rather than var(--radius-*) / var(--spacing-*) references
const RADII = [
  "rounded-element-xs",
  "rounded-element-sm",
  "rounded-element-md",
  "rounded-element-lg",
  "rounded-menu-sm",
  "rounded-menu-sm-inner",
  "rounded-menu-md",
  "rounded-menu-inner",
  "rounded-container",
  "rounded-container-inner",
];

const SPACING = [
  { utility: "p-menu-sm", className: "w-menu-sm" },
  { utility: "p-menu-md", className: "w-menu-md" },
  { utility: "p-container", className: "w-container" },
  { utility: "p-content", className: "w-content" },
];

function Code({ children }: { children: ReactNode }) {
  return <code className="typography-code text-default-text">{children}</code>;
}

function Grid({ children }: { children: ReactNode }) {
  return <div className="sb-unstyled grid gap-3 py-4">{children}</div>;
}

export function ColorScales() {
  return (
    <div className="sb-unstyled overflow-x-auto py-4">
      <table className="w-full border-separate border-spacing-1">
        <thead>
          <tr>
            <th className="w-20" />
            {STEPS.map((step) => (
              <th
                key={step}
                className="typography-supporting text-default-text h-24 pb-1 align-bottom font-normal"
              >
                <span className="inline-block rotate-180 whitespace-nowrap [writing-mode:vertical-rl]">
                  {step}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {INTENTS.map((intent) => (
            <tr key={intent}>
              <th className="typography-label text-default-text-contrast pr-3 text-left">
                {intent}
              </th>
              {STEPS.map((step) => (
                <td key={step}>
                  <div
                    title={`--${intent}-${step}`}
                    className="border-default-line rounded-element-xs h-10 border"
                    style={{ background: `var(--${intent}-${step})` }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SurfaceColors() {
  return (
    <Grid>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SURFACES.map(({ name, variable, utility }) => (
          <div key={name} className="flex flex-col gap-1.5">
            <div
              className="border-default-line rounded-element-md h-16 border"
              style={{ background: `var(${variable})` }}
            />
            <span className="typography-label text-default-text-contrast">{name}</span>
            <Code>{utility}</Code>
          </div>
        ))}
      </div>
    </Grid>
  );
}

function getPixels(value: string) {
  return `${Math.round(parseFloat(value) * 10) / 10}px`;
}

function getComputedType(element: HTMLElement) {
  const { fontSize, lineHeight, fontWeight } = getComputedStyle(element);
  return `${getPixels(fontSize)} / ${getPixels(lineHeight)} · ${fontWeight}`;
}

function TypeSample({ name, className }: { name: string; className: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [metrics, setMetrics] = useState("");

  useLayoutEffect(() => {
    if (ref.current) setMetrics(getComputedType(ref.current));
  }, []);

  return (
    <div className="border-default-line grid grid-cols-[12rem_1fr] items-baseline gap-4 border-b pb-3">
      <div className="flex flex-col gap-0.5">
        <Code>{className}</Code>
        <span className="typography-supporting text-default-text">{metrics}</span>
      </div>
      <p ref={ref} className={`${className} text-default-text-contrast truncate`}>
        {name === "code" ? "const total = 1_024.50;" : "Spending this month"}
      </p>
    </div>
  );
}

export function TypographyScale() {
  return (
    <Grid>
      {TYPOGRAPHY.map((type) => (
        <TypeSample key={type.name} {...type} />
      ))}
    </Grid>
  );
}

export function ElementSizes() {
  return (
    <Grid>
      <div className="flex flex-wrap items-end gap-4">
        {ELEMENT_SIZES.map((size) => (
          <div key={size} className="flex flex-col items-center gap-1.5">
            <div
              className="bg-accent-solid rounded-element-xs"
              style={{
                width: `var(--size-element-${size})`,
                height: `var(--size-element-${size})`,
              }}
            />
            <Code>{`element-${size}`}</Code>
          </div>
        ))}
      </div>
    </Grid>
  );
}

export function Radii() {
  return (
    <Grid>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        {RADII.map((radius) => (
          <div key={radius} className="flex flex-col gap-1.5">
            <div
              className={`bg-default-bg border-default-border h-16 border ${radius}`}
            />
            <Code>{radius}</Code>
          </div>
        ))}
      </div>
    </Grid>
  );
}

export function Spacing() {
  return (
    <Grid>
      {SPACING.map(({ utility, className }) => (
        <div key={utility} className="grid grid-cols-[12rem_1fr] items-center gap-4">
          <Code>{utility}</Code>
          <div className={`bg-accent-solid h-4 ${className}`} />
        </div>
      ))}
    </Grid>
  );
}
