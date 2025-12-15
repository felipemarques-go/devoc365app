import { Sun, Sparkles } from 'lucide-react';
import { HOTMART_PREMIUM_URL } from '@/data/mockData';

interface HeaderProps {
  title?: string;
  showPremium?: boolean;
}

export function Header({ title = 'Devoc365', showPremium = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full gradient-spiritual flex items-center justify-center">
            <Sun className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-serif font-semibold text-lg text-foreground">{title}</span>
        </div>
        
        {showPremium && (
          <a 
            href={HOTMART_PREMIUM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent/80 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Premium</span>
          </a>
        )}
      </div>
    </header>
  );
}
