import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    reporters: ['default', 'html'],
    outputFile: {
      html: './reports/test-report.html',
    },
    coverage: {
      reporter: ['text', 'json'],
      reportOnFailure: true,
    }
  },
});