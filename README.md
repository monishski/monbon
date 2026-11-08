# monbon

A React component library built on [Base UI](https://base-ui.com) and
[React Aria](https://react-spectrum.adobe.com/react-aria/), styled with
[Tailwind CSS v4](https://tailwindcss.com).

**[Storybook](https://main--6af065bc0758bab4249d54f3.chromatic.com)** · **[npm](https://www.npmjs.com/package/@monbon-ui/react)**

> [!NOTE]
> Early days: the API may change between `0.x` releases.

## Install

```sh
pnpm add @monbon-ui/react
```

`react` and `react-dom` 19 and `tailwindcss` 4 are peer dependencies. Import the styles
after Tailwind in your app's CSS:

```css
@import "tailwindcss";
@import "@monbon-ui/react/styles.css";
```

Dark mode follows a `dark` class on a parent element, for example `<html class="dark">`.

## Usage

```tsx
import { Button } from "@monbon-ui/react";

export function SaveButton() {
  return <Button variant="primary">Save</Button>;
}
```

## Development

```sh
pnpm install
npx playwright install chromium   # once, for the Storybook tests

pnpm storybook    # Storybook on http://localhost:6006
pnpm test         # run every story as a test in headless Chromium
pnpm build        # build the package into dist/
pnpm typecheck
pnpm lint
```

## Licence

[MIT](./LICENSE)
