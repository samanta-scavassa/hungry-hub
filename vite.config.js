import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import process from 'process';

const SERVER_URL =  process.env.SERVER_URL || 'https://hungry-hub.adaptable.app';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    ' process.env.SERVER_URL': JSON.stringify(SERVER_URL),
  },
  plugins: [react()],
  base: "/hungry-hub/",
});
