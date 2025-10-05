'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Bot,
  Minimize2,
  MessageCircle,
  MessageSquare
} from 'lucide-react';
// Modal removed since only chat action remains

interface AgentDockProps {}

export default function AgentDock({}: AgentDockProps) {
  const [isMinimized, setIsMinimized] = useState<boolean>(true);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const hasAutoOpenedRef = useRef<boolean>(false);
  const dockRef = useRef<HTMLDivElement | null>(null);

  const whatsappPhone = '+989128497929'; // International format without spaces

  const actions = [
    {
      id: 'chat',
      label: 'چت آنلاین',
      icon: Bot,
      description: 'گفتگو با ایجنت و دریافت پاسخ سریع',
      analytics: 'open_agent_chat'
    },
    {
      id: 'whatsapp',
      label: 'واتس‌اپ',
      icon: MessageCircle,
      description: 'گفتگو در WhatsApp',
      analytics: 'open_whatsapp_chat'
    },
    {
      id: 'chatbot',
      label: 'گفتگو',
      icon: MessageSquare,
      description: 'صفحه گفتگوی چت‌بات',
      analytics: 'open_chatbot_page'
    }
  ];

  const handleActionClick = (actionId: string) => {
    if (typeof window === 'undefined') return;
    if (actionId === 'whatsapp') {
      const waUrl = `https://wa.me/${whatsappPhone.replace(/[^\d+]/g, '')}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    if (actionId === 'chatbot') {
      window.location.href = '/chatbot';
      return;
    }
    window.location.href = '/agent';
  };

  // Detect viewport and session state (desktop default open)
  useEffect(() => {
    const computeIsDesktop = () => typeof window !== 'undefined' && window.innerWidth >= 1024;
    const updateViewport = () => setIsDesktop(computeIsDesktop());
    updateViewport();

    // Initialize minimized from sessionStorage on desktop
    if (computeIsDesktop()) {
      try {
        const stored = sessionStorage.getItem('ecomkar.agentDock.minimized');
        const minimized = stored === '1';
        setIsMinimized(minimized ? true : false);
        if (!minimized) {
          hasAutoOpenedRef.current = true;
        }
      } catch {}
    } else {
      // Mobile/tablet: keep FAB behavior (no change)
      setIsMinimized(true);
    }

    const onResize = () => {
      const wasDesktop = isDesktop;
      const nowDesktop = computeIsDesktop();
      setIsDesktop(nowDesktop);
      if (!wasDesktop && nowDesktop) {
        // Entered desktop; if not minimized in session and not auto-opened yet, open once
        try {
          const stored = sessionStorage.getItem('ecomkar.agentDock.minimized');
          if (stored !== '1' && !hasAutoOpenedRef.current) {
            setIsMinimized(false);
            hasAutoOpenedRef.current = true;
          }
        } catch {}
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Click outside to minimize (desktop only)
  useEffect(() => {
    if (!isDesktop || isMinimized) return;
    const onDocMouseDown = (e: MouseEvent) => {
      if (!dockRef.current) return;
      if (!dockRef.current.contains(e.target as Node)) {
        try { sessionStorage.setItem('ecomkar.agentDock.minimized', '1'); } catch {}
        setIsMinimized(true);
      }
    };
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, [isDesktop, isMinimized]);

  const handleMinimize = () => {
    try { sessionStorage.setItem('ecomkar.agentDock.minimized', '1'); } catch {}
    setIsMinimized(true);
  };

  const handleExpandFromFab = () => {
    try { sessionStorage.removeItem('ecomkar.agentDock.minimized'); } catch {}
    setIsMinimized(false);
  };

  return (
    <>
      {/* Desktop Dock / FAB (RTL start corner) */}
      <div className="hidden lg:block fixed bottom-8 right-8 z-50">
        <AnimatePresence initial={false}>
          {!isMinimized && (
            <motion.div
              key="dock-open"
              ref={dockRef}
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.18 }}
              className="relative bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl"
              data-analytics="view_agent_dock_open"
            >
              {/* Minimize button */}
              <button
                onClick={handleMinimize}
                className="absolute -top-3 -left-3 p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white/80 hover:text-white shadow-md"
                aria-label="کوچک‌کردن"
                title="کوچک‌کردن"
                data-analytics="click_agent_dock_minimize"
              >
                <Minimize2 className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-white">Agent</span>
                <span className="text-xs text-white/60">آنلاین</span>
              </div>

              <div className="space-y-2">
                {actions.map((action, index) => (
                  <motion.button
                    key={action.id}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.08 + index * 0.06 }}
                    onClick={() => handleActionClick(action.id)}
                    className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 rounded-xl transition-all duration-200 group"
                    data-analytics={action.analytics}
                    aria-label={action.label}
                  >
                    <action.icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-200" />
                    <div className="text-right">
                      <div className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors duration-200">
                        {action.label}
                      </div>
                      <div className="text-xs text-white/60">
                        {action.description}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {isMinimized && (
            <motion.button
              key="dock-fab-desktop"
              initial={{ opacity: 0, scale: 0.9, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 6 }}
              transition={{ duration: 0.18 }}
              onClick={handleExpandFromFab}
              className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 rounded-full shadow-lg hover:shadow-blue-500/25 flex items-center justify-center transition-all duration-200"
              data-analytics="click_agent_dock_expand"
              aria-label="باز کردن ایجنت"
              title="باز کردن ایجنت"
            >
              <Bot className="w-6 h-6 text-white" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Dock / FAB */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <AnimatePresence initial={false}>
          {!isMinimized && (
            <motion.div
              key="dock-open-mobile"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.18 }}
              className="relative bg-black/85 backdrop-blur-xl border border-white/15 rounded-2xl p-3 shadow-2xl"
              data-analytics="view_agent_dock_open_mobile"
            >
              <button
                onClick={handleMinimize}
                className="absolute -top-3 -left-3 p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white/80 hover:text-white shadow-md"
                aria-label="کوچک‌کردن"
                title="کوچک‌کردن"
                data-analytics="click_agent_dock_minimize_mobile"
              >
                <Minimize2 className="w-4 h-4" />
              </button>

              <div className="space-y-2 min-w-[220px]">
                {actions.map((action, index) => (
                  <motion.button
                    key={`m-${action.id}`}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.08 + index * 0.06 }}
                    onClick={() => handleActionClick(action.id)}
                    className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 rounded-xl transition-all duration-200"
                    data-analytics={`${action.analytics}_mobile`}
                    aria-label={action.label}
                  >
                    <action.icon className={`w-5 h-5 ${action.id === 'whatsapp' ? 'text-green-400' : 'text-blue-400'}`} />
                    <div className="text-right">
                      <div className="text-sm font-medium text-white">{action.label}</div>
                      <div className="text-xs text-white/60">{action.description}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {isMinimized && (
            <motion.button
              key="dock-fab-mobile"
              initial={{ opacity: 0, scale: 0.9, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 6 }}
              transition={{ duration: 0.18 }}
              onClick={handleExpandFromFab}
              className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 rounded-full shadow-lg hover:shadow-blue-500/25 flex items-center justify-center transition-all duration-200"
              data-analytics="click_agent_dock_expand_mobile"
              aria-label="باز کردن گزینه‌ها"
              title="باز کردن گزینه‌ها"
            >
              <Bot className="w-6 h-6 text-white" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

    </>
  );
}

