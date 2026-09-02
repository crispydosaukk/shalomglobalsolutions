'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useCMS } from '@/lib/cmsContext';

export default function HomeCTASection() {
  const { content } = useCMS();
  const cta = content?.homeCTA;

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Grid texture */}
      <div className="absolute inset-0 grid-dot-bg opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block text-xs font-700 uppercase tracking-widest text-secondary mb-4 px-4 py-1.5 bg-white/10 rounded-full">
          {cta?.badge || 'Ready to Get Started?'}
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-800 text-white tracking-tight leading-tight mb-6">
          {cta?.titleLine1 || 'Let Us Handle the Hard Work,'}<br />
          <span className="text-secondary">{cta?.titleHighlight || 'You Enjoy the Results'}</span>
        </h2>

        <p className="text-white/80 font-500 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          {cta?.subtitle || 'Book any of our professional services today. Contact our team for a free, no-obligation quote tailored to your exact needs.'}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-xl text-base font-700 hover:bg-sage-dark transition-all duration-200 shadow-hero"
          >
            <Icon name="ChatBubbleLeftIcon" size={18} />
            {cta?.quoteBtnText || 'Request a Free Quote'}
          </Link>
          <a
            href={`tel:${cta?.phoneDisplay || '+447700900000'}`}
            className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-xl text-base font-700 hover:bg-white/10 transition-all duration-200"
          >
            <Icon name="PhoneIcon" size={18} />
            {cta?.callBtnText || 'Call Us Directly'}
          </a>
        </div>

        {/* Trust assurance */}
        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/15 px-6 py-3 rounded-2xl text-left">
          <div className="w-8 h-8 bg-secondary/30 rounded-xl flex items-center justify-center shrink-0">
            <Icon name="ShieldCheckIcon" size={18} className="text-secondary" variant="solid" />
          </div>
          <div>
            <p className="text-xs font-700 text-white">{cta?.guaranteeTitle || '100% Satisfaction Guarantee'}</p>
            <p className="text-[11px] text-white/60 font-500">{cta?.guaranteeDesc || 'Not fully satisfied? We will make it right at no extra charge to you.'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}