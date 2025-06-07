import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import flowbiteReact from "flowbite-react/plugin/vite";

// שים לב שהרישיות תואמות לשם הריפו ב-GitHub!
export default defineConfig({
  base: "/ReactProject/",
  plugins: [react(), tailwindcss(), flowbiteReact()],
});

