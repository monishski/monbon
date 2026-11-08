# monbon

A React component library built on [Base UI](https://base-ui.com) and
[React Aria](https://react-spectrum.adobe.com/react-aria/), styled with
[Tailwind CSS v4](https://tailwindcss.com).

> [!NOTE]
> Work in progress. Components are being moved over from an existing app and nothing
> has been published yet.

## Install

```sh
pnpm add monbon-ui
```

`react` and `react-dom` 19 are peer dependencies.

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
