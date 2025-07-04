import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  outDir: "dist",
  manifest: {
    action: {
      default_title: "Weverse",
    },
    side_panel: {
      default_path: "side-panel.html",
    },
    permissions: ["sidePanel", "tabs"],
    host_permissions: ["https://weverse-extension-server.onrender.com/*"],
  },
});
