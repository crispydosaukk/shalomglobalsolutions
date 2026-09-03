'use client';

import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useCMS } from '@/lib/cmsContext';

export default function AboutHero() {
  const { content } = useCMS();
  const hero = content?.about?.hero;

  return (
    <section className="bg-primary pt-32 pb-0 relative overflow-hidden">
      <div className="absolute inset-0 grid-dot-bg opacity-20" />

      <div className="relative z-10 site-container pb-0">
        <div className="grid lg:grid-cols-2 gap-16 items-end">
          <div className="pb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-6">
              <Icon name="InformationCircleIcon" size={14} className="text-secondary" />
              <span className="text-xs font-700 uppercase tracking-widest text-white/80">
                {hero?.badge || 'About Us'}
              </span>
            </div>
            <h1 className="text-hero text-white mb-6">
              {hero?.titleLine1 || 'Trusted Professionals'}<br />
              <span className="text-secondary">{hero?.titleHighlight || 'Delivering Excellence'}</span>
            </h1>
            <p className="text-white/70 font-500 text-lg leading-relaxed mb-8 max-w-lg">
              {hero?.subtitle || 'Shalom Global Solution is a modern, reliable, and customer-focused service company dedicated to delivering high-quality solutions for homes, businesses, hotels, restaurants, care homes, and commercial properties across the UK.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/services" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-7 py-3.5 rounded-xl text-sm font-700 hover:bg-sage-dark transition-all">
                {hero?.servicesBtnText || 'Our Services'}
                <Icon name="ArrowRightIcon" size={16} />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-xl text-sm font-700 hover:bg-white/10 transition-all">
                {hero?.contactBtnText || 'Contact Us'}
              </Link>
            </div>
          </div>

          <div className="relative self-end">
            <div className="rounded-t-4xl overflow-hidden shadow-hero">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_123a93599-1777082822089.png"
                alt="Professional uniformed service team in bright modern office, friendly and confident, UK professional services"
                width={580}
                height={480}
                className="w-full h-80 lg:h-[420px] object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-white">
        <div className="site-container py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {hero?.stats?.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Icon name={stat.icon as any || 'ShieldCheckIcon'} size={22} className="text-secondary" />
                </div>
                <p className="text-3xl font-800 text-primary tracking-tight">{stat.value}</p>
                <p className="text-xs font-600 uppercase tracking-widest text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}