import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Vite config for building the component library as a distributable package.
 * Outputs to dist/lib/ with ESM format, external React deps, and CSS extraction.
 *
 * Usage: npx vite build --config vite.lib.config.ts
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist/lib',
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: (assetInfo) => {
          // Rename the extracted CSS to tokens.css
          if (assetInfo.name === 'style.css') return 'tokens.css';
          return assetInfo.name || 'asset';
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
});
