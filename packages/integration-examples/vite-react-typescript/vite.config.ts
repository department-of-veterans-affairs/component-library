import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000
  },
  build: {
    chunkSizeWarningLimit: 1500, // Increase from default 500kb to 1500kb
    rollupOptions: {
      output: {
        manualChunks: {
          'va-components': [
            '@department-of-veterans-affairs/component-library',
          ],
          'vendor': [
            'react', 
            'react-dom'
          ]
        }
      }
    }
  }
});