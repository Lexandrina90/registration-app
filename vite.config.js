import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
        '@': new URL('./src', import.meta.url).pathname,
      },
  },
  server: {
    port: 3000,
    historyApiFallback: true, 
  },
});
