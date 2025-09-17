'use client';

import { Home, TrendingUp, Plus, BarChart3, User, X } from 'lucide-react';
import { Button } from './ui/Button';

interface NavigationProps {
  onClose?: () => void;
}

export function Navigation({ onClose }: NavigationProps) {
  const navItems = [
    { icon: Home, label: 'Home', href: '/', active: true },
    { icon: TrendingUp, label: 'Trending', href: '/trending' },
    { icon: Plus, label: 'Create', href: '/create' },
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
          <Button
            key={item.href}
            variant={item.active ? "primary" : "outline"}
            className="w-full justify-start gap-3"
            onClick={onClose}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </Button>
        ))}
      </div>

      {/* Bottom Navigation */}
      {!onClose && (
        <div className="bg-surface border-t border-border px-4 py-2">
          <div className="flex justify-around">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={item.active ? "primary" : "outline"}
                size="sm"
                className="flex-col gap-1 h-auto py-2"
              >
                <item.icon className="w-4 h-4" />
                <span className="text-xs">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
