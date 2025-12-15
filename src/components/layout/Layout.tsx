import { ReactNode } from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

interface LayoutProps {
  children: ReactNode;
  headerTitle?: string;
  showHeader?: boolean;
  showNav?: boolean;
}

export function Layout({ 
  children, 
  headerTitle, 
  showHeader = true, 
  showNav = true 
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {showHeader && <Header title={headerTitle} />}
      <main className="flex-1 pb-20 overflow-y-auto">
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
}
