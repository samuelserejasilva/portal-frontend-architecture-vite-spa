import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

export default defineConfig({
  // Path aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, './src/core'),
      '@services': path.resolve(__dirname, './src/services'),
      '@models': path.resolve(__dirname, './src/models'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@config': path.resolve(__dirname, './src/config'),
    },
  },

  // Dev server
  server: {
    port: 3000,
    open: true,
    cors: true,
    hmr: true,
  },

  // Build otimizado
  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    
    // Minificação
    minify: 'esbuild',
    cssMinify: true,
    
    // Sourcemaps apenas para erros
    sourcemap: 'hidden',
    
    // Code splitting manual
    rollupOptions: {
      output: {
        // Estratégia de chunking
        manualChunks: {
          // Vendor chunk (dependências)
          'vendor-core': [
            './src/core/router/Router',
            './src/core/http/HttpClient',
            './src/core/state/Store',
            './src/core/logger/Logger',
          ],
          
          // Performance utilities
          'vendor-performance': [
            './src/core/performance/PerformanceMonitor',
            './src/core/performance/LazyLoader',
            './src/core/performance/ImageOptimizer',
          ],
          
          // Auth chunk
          'auth': [
            './src/services/auth.service',
            './src/pages/public/login/LoginPage',
            './src/pages/public/register/RegisterPage',
          ],
          
          // Admin chunk
          'admin': [
            './src/pages/admin/dashboard/DashboardPage',
          ],
        },
        
        // Nomes de chunks otimizados
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    
    // Chunk size warnings
    chunkSizeWarningLimit: 500, // 500kb
  },

  // Plugins
  plugins: [
    // PWA com Service Worker
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Portal Auditoria',
        short_name: 'Auditoria',
        description: 'Sistema de Gestão de Auditoria',
        theme_color: '#0066cc',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        // Estratégia de cache
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 ano
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 dias
              },
            },
          },
          {
            urlPattern: /\/api\//i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 5, // 5 minutos
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),

    // Compressão Gzip
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // 10kb
      algorithm: 'gzip',
      ext: '.gz',
    }),

    // Compressão Brotli
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),

    // Bundle analyzer
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  // Otimização de dependências
  optimizeDeps: {
    include: [],
    exclude: [],
  },

  // CSS
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      // Se usar SASS no futuro
    },
  },

  // ESBuild (minificação)
  esbuild: {
    legalComments: 'none',
    drop: ['console', 'debugger'], // Remove em produção
  },
});
