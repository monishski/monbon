import { DocsContainer } from "@storybook/addon-docs/blocks";
import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview, ReactRenderer } from "@storybook/react-vite";
import { themes } from "storybook/theming";

import "@fontsource-variable/figtree";
import "./preview.css";

const preview: Preview = {
  decorators: [
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "dark",
    }),
  ],
  parameters: {
    docs: {
      canvas: {
        className: "!bg-app !text-default-text-contrast",
      },
      // Match the docs page chrome to the selected theme
      // REF: https://github.com/storybookjs/storybook/discussions/28495#discussioncomment-11184489
      container: ({ children, context, ...props }) => {
        const html = document.querySelector("html");
        const isDark = context.store.userGlobals.globals.theme === "dark";
        html?.classList.toggle("dark", isDark);
        html?.classList.toggle("light", !isDark);
        // REF: https://storybook.js.org/docs/writing-docs/autodocs#customize-the-docs-container
        return (
          <DocsContainer
            context={context}
            {...props}
            theme={isDark ? themes.dark : themes.light}
          >
            {children}
          </DocsContainer>
        );
      },
    },
    backgrounds: {
      disable: true,
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: [
          "Introduction",
          "Foundations",
          ["Colors", "Typography", "Layout"],
          "Components",
          ["Action", "Content", "Feedback", "Form", "Layout", "Overlay", "Container"],
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
