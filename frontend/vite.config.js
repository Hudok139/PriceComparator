import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: ".",
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ["9dab-181-191-230-189.ngrok-free.app", ".ngrok-free.app"],
  },
});
