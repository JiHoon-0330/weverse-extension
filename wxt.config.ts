import { defineConfig } from "wxt";
import { env } from "@/src/env";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  outDir: "dist",
  manifest: {
    action: {
      default_title: "Weverse",
    },
    side_panel: {
      default_path: "sidepanel.html",
    },
    permissions: ["sidePanel", "tabs"],
    host_permissions: [`${env.WXT_ENV_SERVER_BASE_URL}/*`],
  },
});
