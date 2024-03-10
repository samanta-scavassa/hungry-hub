import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.SERVER_URL': JSON.stringify(import.meta.env.SERVER_URL),
  },
  plugins: [react()],
  base: "/hungry-hub/",
});
