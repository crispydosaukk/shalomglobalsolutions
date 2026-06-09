import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function ContactHero() {
  return (
    <section className="bg-primary pt-32 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 grid-dot-bg opacity-20" />
      <div className="absolute top-0 right-0 w-96 h-96 blob-primary opacity-40 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-6">
          <Icon name="ChatBubbleLeftRightIcon" size={14} className="text-secondary" />
          <span className="text-xs font-700 uppercase tracking-widest text-white/80">Contact Us</span>
        </div>
        <h1 className="text-hero text-white mb-6">
          Let&apos;s Talk About<br />
          <span className="text-secondary">Your Needs</span>
        </h1>
        <p className="text-white/70 font-500 text-lg max-w-xl mx-auto leading-relaxed">
          Our friendly team is ready to help you find the right service solution. Get in touch and we&apos;ll respond within 24 hours.
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 40L1440 40L1440 10C1200 40 720 0 0 20L0 40Z" fill="#FAF8F3" />
        </svg>
      </div>
    </section>
  );
}