'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors"
    >
      {/* Avoid hydration mismatch: render a neutral icon until mounted */}
      {mounted ? (
        isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4 opacity-0" />
      )}
    </button>
  );
}

export default ThemeToggle;
