import path from "path";
import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
  root: path.join(__dirname, "src/client"),
  plugins: [reactRefresh()],
  build: {
    sourcemap: true
  }
});