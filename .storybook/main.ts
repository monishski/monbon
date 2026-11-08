import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-themes",
  ],
  framework: "@storybook/react-vite",
  viteFinal(viteConfig) {
    viteConfig.plugins = [...(viteConfig.plugins ?? []), tailwindcss()];
    viteConfig.build = {
      ...viteConfig.build,
      rolldownOptions: {
        ...viteConfig.build?.rolldownOptions,
        // "use client" only means something to React Server Components, and
        // Storybook runs everything on the client
        onLog(level, log, defaultHandler) {
          if (log.code === "MODULE_LEVEL_DIRECTIVE") return;
          defaultHandler(level, log);
        },
      },
    };
    return viteConfig;
  },
};

export default config;
