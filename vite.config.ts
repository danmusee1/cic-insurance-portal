import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3333', // your backend server
        changeOrigin: true,
      }
    }
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
