import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
  base: "/ofirpro89/ReactProject",
  plugins: [react(), tailwindcss(), flowbiteReact()],
});
