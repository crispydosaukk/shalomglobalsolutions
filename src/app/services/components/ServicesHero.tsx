import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function ServicesHero() {
  return (
    <section className="bg-primary pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 grid-dot-bg opacity-20" />
      <div className="absolute top-0 right-0 w-96 h-96 blob-primary opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-6">
          <Icon name="RectangleStackIcon" size={14} className="text-secondary" />
          <span className="text-xs font-700 uppercase tracking-widest text-white/80">Our Services</span>
        </div>
        <h1 className="text-hero text-white mb-6">
          Professional Services<br />
          <span className="text-secondary">for Every Need</span>
        </h1>
        <p className="text-white/70 font-500 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
          From cleaning to childcare, property support to handyman repairs — Shalom Global Solution delivers quality services across the UK.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/contact" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-7 py-3.5 rounded-xl text-sm font-700 hover:bg-sage-dark transition-all">
            <Icon name="PhoneIcon" size={16} />
            Get a Free Quote
          </Link>
          <Link href="/about" className="inline-flex items-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-xl text-sm font-700 hover:bg-white/10 transition-all">
            Learn About Us
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 40L1440 40L1440 10C1200 40 720 0 0 20L0 40Z" fill="#FAF8F3" />
        </svg>
      </div>
    </section>
  );
}