import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        https: {
            key: fs.readFileSync('./cert/localhost-key.pem'),
            cert: fs.readFileSync('./cert/localhost.pem'),
        },
        host: 'localhost',
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
