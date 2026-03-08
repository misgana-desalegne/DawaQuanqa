import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/DawaQuanqa/" : "/",
  server: {
    port: 5173
  }
}));
