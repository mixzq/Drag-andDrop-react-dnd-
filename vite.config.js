import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    host: "0.0.0.0",
    hmr: true,
  },
  plugins: [react()],
});
