
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Fixed: Removed the explicit 'root' property that used process.cwd().
  // This resolves the error "Property 'cwd' does not exist on type 'Process'" 
  // as Vite defaults the project root to the current working directory automatically.
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
