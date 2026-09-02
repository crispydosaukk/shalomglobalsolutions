'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { useCMS } from '@/lib/cmsContext';

export default function Header() {
  const { content } = useCMS();
  const headerData = content?.header;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = headerData?.navLinks || [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-card border-b border-border'
            : 'bg-primary/40 backdrop-blur-md border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <AppLogo size={40} />
            <span
              className={`font-extrabold text-lg tracking-tight hidden sm:block transition-colors ${
                scrolled ? 'text-primary' : 'text-white'
              }`}
            >
              {headerData?.logoText || 'ShalomGlobal'}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks?.map((link) => (
              <Link
                key={link?.href}
                href={link?.href}
                className={`px-4 py-2 text-sm font-700 rounded-xl transition-all duration-200 ${
                  scrolled
                    ? 'text-muted-foreground hover:text-primary hover:bg-muted'
                    : 'text-white/90 hover:text-white hover:bg-white/15'
                }`}
              >
                {link?.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-700 transition-all duration-200 shadow-sm ${
                scrolled
                  ? 'bg-primary text-primary-foreground hover:bg-navy-light'
                  : 'bg-secondary text-white hover:bg-sage-dark'
              }`}
            >
              <Icon name="PhoneIcon" size={16} />
              {headerData?.quoteButtonText || 'Get a Quote'}
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className={`md:hidden p-2 rounded-xl transition-colors ${
                scrolled ? 'hover:bg-muted text-primary' : 'hover:bg-white/10 text-white'
              }`}
              aria-label="Open menu"
            >
              <Icon name="Bars3Icon" size={24} className={scrolled ? 'text-primary' : 'text-white'} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div
            className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 bottom-0 w-80 bg-white shadow-hero flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <AppLogo size={36} />
                <span className="font-extrabold text-base text-primary">
                  {headerData?.logoText || 'ShalomGlobal'}
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-xl hover:bg-muted transition-colors"
                aria-label="Close menu"
              >
                <Icon name="XMarkIcon" size={24} className="text-primary" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-4 flex-1">
              {navLinks?.map((link) => (
                <Link
                  key={link?.href}
                  href={link?.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-600 text-foreground hover:bg-muted hover:text-primary transition-all"
                >
                  {link?.label}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-border">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground px-5 py-3.5 rounded-xl text-base font-700 hover:bg-navy-light transition-all"
              >
                <Icon name="PhoneIcon" size={18} />
                {headerData?.quoteButtonText || 'Get a Free Quote'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}