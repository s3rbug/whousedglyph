import { config } from './src/utils/config';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${config.ROUTER_BASE_URL}`
});