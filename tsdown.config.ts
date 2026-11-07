import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  // One output file per source file, so each file keeps its own "use client" directive
  unbundle: true,
  format: "esm",
  platform: "neutral",
  dts: true,
  sourcemap: true,
  clean: true,
  inputOptions: {
    onLog(level, log, defaultHandler) {
      // Unbundled output keeps each module's directive, so this warning doesn't apply
      if (log.code === "MODULE_LEVEL_DIRECTIVE") return;
      defaultHandler(level, log);
    },
  },
});
