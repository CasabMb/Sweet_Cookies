import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "/",
  // base: "/sweet_cookies_2/",
  // server: {
  //   hmr: false, // Désactive le Hot Module Replacement
  // },
  //   logLevel: "info"
});
