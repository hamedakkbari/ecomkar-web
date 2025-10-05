'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, Play, Calendar, BookOpen, MessageSquare, X, Command } from 'lucide-react';
import { commandPaletteActions } from './NavItem';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredActions = commandPaletteActions.filter(action =>
    action.label.toLowerCase().includes(query.toLowerCase()) ||
    action.description.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < filteredActions.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : filteredActions.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredActions[selectedIndex]) {
            const action = filteredActions[selectedIndex];
            if (action.href.startsWith('http')) {
              window.open(action.href, '_blank');
            } else {
              window.location.href = action.href;
            }
            onClose();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredActions, onClose]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // This will be handled by the parent component
        }
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const iconMap = {
    Play,
    Calendar,
    BookOpen,
    MessageSquare
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20">
      <div className="w-full max-w-2xl mx-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-white/10">
          <Search className="w-5 h-5 text-white/60" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="چه کاری انجام بدم؟"
            className="flex-1 bg-transparent text-white placeholder-white/60 outline-none text-lg"
            dir="rtl"
          />
          <div className="flex items-center gap-2 text-xs text-white/40">
            <kbd className="px-2 py-1 bg-white/10 rounded text-white/60">
              {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}K
            </kbd>
            <span>برای بستن</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/60 hover:text-white/90 hover:bg-white/10 rounded-full transition-colors duration-200"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Actions List */}
        <div ref={listRef} className="max-h-96 overflow-y-auto">
          {filteredActions.length === 0 ? (
            <div className="p-8 text-center text-white/60">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>نتیجه‌ای یافت نشد</p>
            </div>
          ) : (
            <div className="p-2">
              {filteredActions.map((action, index) => {
                const IconComponent = iconMap[action.icon as keyof typeof iconMap];
                const isSelected = index === selectedIndex;
                
                return (
                  <button
                    key={action.id}
                    onClick={() => {
                      if (action.href.startsWith('http')) {
                        window.open(action.href, '_blank');
                      } else {
                        window.location.href = action.href;
                      }
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-right ${
                      isSelected 
                        ? 'bg-blue-500/20 border border-blue-500/30' 
                        : 'hover:bg-white/5 border border-transparent'
                    }`}
                    data-analytics={action.analytics}
                  >
                    <div className={`p-2 rounded-lg ${
                      isSelected 
                        ? 'bg-blue-500/20' 
                        : 'bg-white/5'
                    }`}>
                      {IconComponent && <IconComponent className="w-5 h-5 text-blue-400" />}
                    </div>
                    
                    <div className="flex-1 text-right">
                      <div className="font-medium text-white">{action.label}</div>
                      <div className="text-sm text-white/60">{action.description}</div>
                    </div>
                    
                    <div className="text-xs text-white/40">
                      {action.href.startsWith('http') ? 'باز کردن' : 'رفتن'}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-white/5">
          <div className="flex items-center justify-between text-xs text-white/60">
            <div className="flex items-center gap-4">
              <span>↑↓ برای انتخاب</span>
              <span>↵ برای اجرا</span>
            </div>
            <div className="flex items-center gap-2">
              <Command className="w-3 h-3" />
              <span>دستورات سریع</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

