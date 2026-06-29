import type { Metadata } from 'next';

import Providers from './providers';

import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import Header from '@/components/layout/Header';
import TabBar from '@/components/layout/TabBar';
import DataSeeder from './DataSeeder';
import ThemeProvider from './ThemeProvider';

import './globals.css';

export const metadata: Metadata = {
  title: 'Track your expenses',
  description: 'Manage your spending with ease, even offline.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>
          <DataSeeder />
          <ServiceWorkerRegister />
          <ThemeProvider />
          <Header />
          <main className="container mx-auto px-4 py-16">{children}</main>
          <TabBar />
        </Providers>
      </body>
    </html>
  );
}
