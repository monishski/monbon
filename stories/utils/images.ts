// Placeholder images drawn as inline SVGs, so stories and visual tests don't
// depend on outside URLs

function getSvgDataUri(svg: string) {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export const portrait = getSvgDataUri(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <rect width="64" height="64" fill="#8e4ec6" />
    <circle cx="32" cy="25" r="11" fill="#e0c4f4" />
    <path d="M10 64c0-14 10-22 22-22s22 8 22 22z" fill="#e0c4f4" />
  </svg>`
);

const LOGO_SHAPES = {
  circle: `<circle cx="32" cy="32" r="16" fill="#fff" />`,
  square: `<rect x="18" y="18" width="28" height="28" rx="4" fill="#fff" />`,
  triangle: `<path d="M32 15l18 32H14z" fill="#fff" />`,
  diamond: `<path d="M32 12l20 20-20 20-20-20z" fill="#fff" />`,
};

export function getLogo({
  color,
  shape,
}: {
  color: string;
  shape: keyof typeof LOGO_SHAPES;
}) {
  return getSvgDataUri(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" fill="${color}" />
      ${LOGO_SHAPES[shape]}
    </svg>`
  );
}
