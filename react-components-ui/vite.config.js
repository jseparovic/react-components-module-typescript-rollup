import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    root: 'src',
    build: {
        outDir: '../build',
        assetsDir: '',
        sourcemap: true,
        emptyOutDir: true,
        commonjsOptions: {
            exclude: [
                "react-components-library/*",
            ]
        },
    },
    plugins: [
        react(),
    ],
    resolve: {
        mainFields: ["browser"],
        },
    optimizeDeps: {
        include: [
            "react-components-library",
            "react-components-library/components",
        ]
    },
    publicDir: 'assets',
    server: {
        hmr: {
            clientPort: 443,
            overlay: false,
        }
    },
    esbuild: {
        logOverride: { 'this-is-undefined-in-esm': 'silent' }
    }
});
