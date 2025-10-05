'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Zap, Bot, MessageCircle, Link as LinkIcon, ArrowLeft } from 'lucide-react';
import { SubMenuItem } from './NavItem';

interface ServicePreviewProps {
  submenu: SubMenuItem[];
  isOpen: boolean;
  onClose: () => void;
}

const iconMap = {
  Zap,
  Bot,
  MessageCircle,
  LinkIcon
};

export default function ServicePreview({ submenu, isOpen, onClose }: ServicePreviewProps) {
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isVisible) return null;

  return (
    <div
      ref={dropdownRef}
      className={`absolute top-full right-0 mt-2 w-96 z-50 transition-all duration-200 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">خدمات ما</h3>
          <button
            onClick={onClose}
            className="p-1 text-white/60 hover:text-white/90 hover:bg-white/10 rounded-full transition-colors duration-200"
            aria-label="بستن منو"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {submenu.map((item) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap];
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className="group p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10"
                data-analytics={item.analytics}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg group-hover:from-blue-400/30 group-hover:to-purple-400/30 transition-all duration-200">
                    {IconComponent && <IconComponent className="w-5 h-5 text-blue-400" />}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-white group-hover:text-blue-300 transition-colors duration-200">
                      {item.title}
                    </h4>
                    <p className="text-sm text-white/70 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  
                  <ChevronDown className="w-4 h-4 text-white/40 group-hover:text-blue-400 transition-colors duration-200 transform rotate-180" />
                </div>
              </Link>
            );
          })}
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/10">
          <Link
            href="/services"
            className="flex items-center justify-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
            data-analytics="nav_services_view_all"
          >
            مشاهده همه خدمات
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

