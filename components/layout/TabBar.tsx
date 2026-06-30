'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { name: 'New', href: '/add', icon: '➕' },
  { name: 'Expenses', href: '/', icon: '📋' },
  { name: 'Stats', href: '/stats', icon: '📊' },
  { name: 'Profile', href: '/profile', icon: '👤' },
];

export default function TabBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary border-t border-primary-dark flex justify-around items-center h-16 z-50">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href || (tab.href === '/' && pathname === '/');
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={`flex flex-col items-center justify-center flex-1 h-full ${
              isActive ? 'font-black' : 'font-normal'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-xs mt-0.5">{tab.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
