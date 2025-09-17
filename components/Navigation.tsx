'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, TrendingUp, Plus, BarChart3, User, X } from 'lucide-react';
import { Button } from './ui/Button';

interface NavigationProps {
  onClose?: () => void;
}

export function Navigation({ onClose }: NavigationProps) {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: TrendingUp, label: 'Trending', href: '/trending' },
    { icon: Plus, label: 'Create', href: '/create-poll' },
    { icon: BarChart3, label: 'Analytics', href: '/analytics' },
    { icon: User, label: 'Profile', href: '/profile' },
  ];

  return (
    <nav className="lg:hidden">
      {/* Mobile Sidebar */}
      <div className="lg:hidden p-4 space-y-2">
        {onClose && (
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-textPrimary">Menu</h2>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
        
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} onClick={onClose}>
            <Button
              variant={pathname === item.href ? "primary" : "outline"}
              className="w-full justify-start gap-3"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Button>
          </Link>
        ))}
      </div>

      {/* Bottom Navigation */}
      {!onClose && (
        <div className="bg-surface border-t border-border px-4 py-2">
          <div className="flex justify-around">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? "primary" : "outline"}
                  size="sm"
                  className="flex-col gap-1 h-auto py-2"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
