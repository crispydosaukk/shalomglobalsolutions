'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useCMS } from '@/lib/cmsContext';

const staticIcons = ['ShieldCheckIcon', 'DocumentCheckIcon', 'AcademicCapIcon', 'UserGroupIcon'];
const staticColors = [
  'bg-secondary/10 text-secondary',
  'bg-primary/10 text-primary',
  'bg-terracotta/10 text-terracotta',
  'bg-amber-100 text-amber-600',
];

export default function AboutCredentials() {
  const { content } = useCMS();
  const creds = content?.about?.credentials;
  const items = creds?.items || [];

  return (
    <section className="py-20 bg-background">
      <div className="site-container">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-700 uppercase tracking-widest text-secondary mb-3">
            {creds?.badge || 'Credentials'}
          </span>
          <h2 className="text-section-title text-primary mb-4">
            {creds?.title || 'Professional Standards You Can Rely On'}
          </h2>
          <p className="text-muted-foreground font-500 max-w-lg mx-auto text-sm">
            {creds?.subtitle || 'We hold our staff and services to the strictest UK regulatory standards so you have absolute peace of mind.'}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {items.map((c, i) => (
            <div key={c.title || i} className="bg-white border border-border rounded-3xl p-7 text-center card-hover">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 ${staticColors[i % staticColors.length]}`}>
                <Icon name={(c.icon || staticIcons[i % staticIcons.length]) as any} size={28} />
              </div>
              <h3 className="font-800 text-primary mb-2">{c.title}</h3>
              {c.badgeText && (
                <span className="inline-block mb-2 text-[10px] font-700 bg-secondary/10 text-secondary px-2.5 py-0.5 rounded-full">
                  {c.badgeText}
                </span>
              )}
              <p className="text-xs text-muted-foreground font-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="bg-primary rounded-4xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 grid-dot-bg opacity-20" />
          <div className="relative z-10">
            <h3 className="text-2xl font-800 text-white mb-4">
              Ready to Work with a Team You Can Trust?
            </h3>
            <p className="text-white/70 font-500 mb-8 max-w-lg mx-auto">
              Experience the Shalom Global Solution difference — professional, reliable, and always customer-focused.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/services" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-3.5 rounded-xl text-sm font-700 hover:bg-sage-dark transition-all">
                <Icon name="RectangleStackIcon" size={16} />
                View Our Services
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-3.5 rounded-xl text-sm font-700 hover:bg-white/10 transition-all">
                <Icon name="PhoneIcon" size={16} />
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}