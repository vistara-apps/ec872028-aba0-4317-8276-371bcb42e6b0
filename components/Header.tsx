'use client';

import { Menu, Search, Bell } from 'lucide-react';
import { Button } from './ui/Button';

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-bg/80 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <Menu className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SV</span>
            </div>
            <h1 className="text-xl font-bold text-textPrimary hidden sm:block">
              StakedVotes
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Search className="w-4 h-4" />
          </Button>
          
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
