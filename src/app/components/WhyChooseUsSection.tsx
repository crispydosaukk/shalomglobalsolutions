'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { useCMS } from '@/lib/cmsContext';

export default function WhyChooseUsSection() {
  const { content } = useCMS();
  const why = content?.whyChooseUs;

  return (
    <section className="py-20 bg-cream-dark/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {why?.stats?.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-3xl p-6 flex flex-col items-center text-center shadow-card border border-border"
            >
              <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center mb-4">
                <Icon name={stat.icon as any || 'ShieldCheckIcon'} size={24} className="text-secondary" />
              </div>
              <p className="text-3xl font-800 text-primary tracking-tight">{stat.value}</p>
              <p className="text-xs font-600 uppercase tracking-widest text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image with overlay */}
          <div className="relative">
            <div className="rounded-4xl overflow-hidden shadow-hero">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_123a93599-1777082822089.png"
                alt="Professional uniformed service team standing together in bright office environment, friendly and confident"
                width={580}
                height={520}
                className="w-full h-[420px] object-cover"
              />
            </div>
            {/* Overlay card */}
            <div className="absolute -bottom-6 -right-4 bg-primary text-primary-foreground rounded-3xl p-6 shadow-badge max-w-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-secondary/30 rounded-xl flex items-center justify-center">
                  <Icon name="CheckBadgeIcon" size={22} className="text-secondary" variant="solid" />
                </div>
                <p className="font-700 text-sm">{why?.isoBadgeTitle || 'ISO Compliant'}</p>
              </div>
              <p className="text-xs text-white/60 font-500 leading-relaxed">
                {why?.isoBadgeDesc || 'Fully compliant with UK Health & Safety, employment, and data protection regulations.'}
              </p>
            </div>
          </div>

          {/* Right: Reasons grid */}
          <div>
            <span className="inline-block text-xs font-700 uppercase tracking-widest text-secondary mb-3">
              {why?.badge || 'Why Choose Us'}
            </span>
            <h2 className="text-section-title text-primary mb-4">
              {why?.titleLine1 || 'Trusted by Hundreds'}<br />
              <span className="text-secondary">{why?.titleHighlight || 'Across the UK'}</span>
            </h2>
            <p className="text-muted-foreground font-500 leading-relaxed mb-10">
              {why?.subtitle || 'We combine professionalism, innovation, and customer care to deliver high-quality services you can depend on — every single time.'}
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {why?.reasons?.map((r) => (
                <div key={r.title} className="flex gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${r.color || 'bg-secondary/10 text-secondary'}`}>
                    <Icon name={r.icon as any || 'ShieldCheckIcon'} size={20} />
                  </div>
                  <div>
                    <p className="font-700 text-sm text-primary mb-1">{r.title}</p>
                    <p className="text-xs text-muted-foreground font-500 leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}