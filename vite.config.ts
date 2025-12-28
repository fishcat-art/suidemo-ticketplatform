import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
//import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      '@mysten/sui': `@mysten/sui`,
    },
  },
  optimizeDeps: {
    include: ['@mysten/sui', '@mysten/wallet-standard'],
  },
  server: {
    port: 3000,
  },
});