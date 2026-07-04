'use client';

import React, { Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import Chat from '@/components/chat/chat';

/**
 * Floating "Ask my AI" launcher. Opens the existing AI-twin chat in a
 * full-screen overlay so it becomes a bonus feature rather than the only
 * way to reach the portfolio content.
 */
export function AIChatWidget() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      {/* Launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Ask my AI twin"
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="bg-foreground text-background fixed right-5 bottom-5 z-40 inline-flex items-center gap-2 rounded-full py-3 pr-5 pl-4 text-sm font-medium shadow-lg shadow-black/10 ring-1 ring-black/5"
          >
            <span className="relative flex h-6 w-6 items-center justify-center">
              <span className="bg-brand/40 absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
              <Sparkles className="relative h-4 w-4" />
            </span>
            Ask my AI
          </motion.button>
        )}
      </AnimatePresence>

      {/* Full-screen chat overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            data-ai-overlay="open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-background fixed inset-0 z-50"
          >
            <div className="border-border bg-background/80 pointer-events-none fixed top-0 right-0 left-0 z-[60] flex items-center justify-between px-5 py-3">
              <span className="text-muted-foreground pointer-events-auto inline-flex items-center gap-2 text-sm font-medium">
                <Sparkles className="text-brand h-4 w-4" />
                Sheraz&apos;s AI twin
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="border-border bg-background text-muted-foreground hover:text-foreground pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <Suspense fallback={null}>
              <Chat />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AIChatWidget;
