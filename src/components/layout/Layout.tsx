import { ReactNode } from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { ChatAssistant } from '@/components/ChatAssistant';
import background from '@/assets/background.png';

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
    <div 
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${background})` }}
    >
      {showHeader && <Header title={headerTitle} />}
      <main className="flex-1 pb-20 overflow-y-auto">
        {children}
      </main>
      {showNav && <BottomNav />}
      <ChatAssistant />
    </div>
  );
}
