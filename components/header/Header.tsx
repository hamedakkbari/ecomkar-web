'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Instagram, 
  Send, 
  Linkedin, 
  Youtube, 
  Globe,
  Command,
  Zap
} from 'lucide-react';
import AnnouncementBar from './AnnouncementBar';
import ServicePreview from './ServicePreview';
import CommandPalette from './CommandPalette';
import Logo from './Logo';
import { navigationItems, socialLinks } from './NavItem';

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [language, setLanguage] = useState('fa');
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const servicesItem = navigationItems.find(item => item.id === 'services');

  return (
    <>
      <AnnouncementBar />
      
      <header
        ref={headerRef}
        className={`sticky top-0 z-[80] w-full backdrop-blur-md border-b border-white/10 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[var(--surface)]/90 backdrop-blur-xl border-b border-[var(--primary-neon)]/30' 
            : 'bg-transparent'
        }`}
        dir="rtl"
        style={{
          background: isScrolled ? 'var(--surface)' : 'transparent',
          borderBottom: isScrolled ? '1px solid var(--border)' : '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Top Strip - Social Links & Language */}
        <div 
          className="backdrop-blur-sm border-b border-white/10"
          style={{
            background: 'var(--surface-hover)',
            borderBottom: '1px solid var(--border)'
          }}
        >
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-center text-sm">
              {/* Language Switch - Hidden */}
              {/* <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-white/60" />
                <button
                  onClick={() => setLanguage(language === 'fa' ? 'en' : 'fa')}
                  className="text-white/80 hover:text-white transition-colors duration-200"
                >
                  {language === 'fa' ? 'English' : 'فارسی'}
                </button>
              </div> */}

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => {
                  const IconComponent = {
                    Instagram,
                    Send,
                    Linkedin,
                    Youtube
                  }[social.icon as keyof typeof socialLinks];

                  return (
                  <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group transition-colors duration-200"
                      title={social.label}
                      data-analytics={social.analytics}
                    >
                      {IconComponent && <IconComponent className="w-4 h-4 text-[var(--primary-neon)] group-hover:text-white" />}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className={`transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-4 shrink-0">
                <Link href="/" aria-label="EcomKar" className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <Logo className="!h-12 md:!h-14 !w-auto" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mt-2 lg:block hidden animate-gradient-x">
                    EcomKar
                  </div>
                </Link>
              </div>

              {/* Mobile Logo Text - Centered */}
              <div className="lg:hidden flex-1 flex justify-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
                  EcomKar
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-8">
                {navigationItems.map((item) => (
                  <div key={item.id} className="relative">
                    <Link
                      href={item.href}
                      className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 font-medium"
                      data-analytics={item.analytics}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </nav>

              {/* CTA Buttons */}
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  href="/consultation"
                  className="px-4 py-2 border rounded-xl transition-all duration-200 text-sm font-medium btn-ghost"
                  data-analytics="cta_meeting_header"
                >
                  درخواست مشاوره
                </Link>

                <Link
                  href="/agent"
                  className="px-6 py-2 font-medium rounded-xl transition-all duration-200 shadow-lg btn-primary"
                  data-analytics="cta_demo_header"
                >
                  ایجنت معمار
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                aria-label="منوی موبایل"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            className="lg:hidden backdrop-blur-xl border-t"
            style={{
              background: 'var(--surface)',
              borderTop: '1px solid var(--border)'
            }}
          >
            <div className="container mx-auto px-4 py-6">
              <nav className="space-y-4">
                {navigationItems.map((item) => (
                  <div key={item.id}>
                    <Link
                      href={item.href}
                      className="block py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 font-medium"
                      data-analytics={item.analytics}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </nav>

              <div 
                className="mt-6 pt-6 space-y-3"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                <Link
                  href="/consultation"
                  className="block w-full text-center px-4 py-3 rounded-xl transition-all duration-200 btn-ghost"
                  data-analytics="cta_meeting_header"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  درخواست مشاوره
                </Link>

                <Link
                  href="/agent"
                  className="block w-full text-center px-4 py-3 font-medium rounded-xl transition-all duration-200 btn-primary"
                  data-analytics="cta_agent_header"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ایجنت معمار
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-500 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        رفتن به محتوا
      </a>
    </>
  );
}

