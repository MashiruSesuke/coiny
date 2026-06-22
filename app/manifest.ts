import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Coiny - Track your expenses',
    short_name: 'Coiny',
    description: 'Manage your spending with ease, even offline.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    display_override: ['window-controls-overlay', 'standalone'],
    theme_color: '#FBBF24',
    background_color: '#FFF8E7',
    orientation: 'portrait-primary',
    categories: ['finance', 'productivity'],
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/screenshots/screenshot1.png',
        sizes: '1280x720',
        type: 'image/png',
        platform: 'wide',
        label: 'Main dashboard',
      },
    ],
  };
}
