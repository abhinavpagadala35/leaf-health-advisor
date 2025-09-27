import React from 'react';
import { Button } from '@/components/ui/button';
import { Leaf, Home, Info, History } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'home', label: 'Scan Leaf', icon: Home },
    { id: 'diseases', label: 'Common Diseases', icon: Info },
    { id: 'history', label: 'History', icon: History },
  ];

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
              CropCare AI
            </h1>
          </div>
          
          <nav className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onTabChange(item.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};