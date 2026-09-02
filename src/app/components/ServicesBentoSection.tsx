'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { useCMS } from '@/lib/cmsContext';

const staticStyleMap: Record<string, { icon: string; cardClass: string; iconBg: string; iconColor: string; image?: string; imageAlt?: string }> = {
  cleaning: {
    icon: 'SparklesIcon',
    cardClass: 'service-card-sage',
    iconBg: 'bg-secondary/20',
    iconColor: 'text-secondary',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1fdc7d837-1772152005578.png',
    imageAlt: 'Bright clean kitchen with sparkling surfaces, warm morning light, professional cleaning result',
  },
  moving: {
    icon: 'TruckIcon',
    cardClass: 'service-card-navy',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  property: {
    icon: 'HomeModernIcon',
    cardClass: 'service-card-terracotta',
    iconBg: 'bg-terracotta/20',
    iconColor: 'text-terracotta',
  },
  childcare: {
    icon: 'HeartIcon',
    cardClass: 'service-card-rose',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-500',
  },
  handyman: {
    icon: 'WrenchScrewdriverIcon',
    cardClass: 'service-card-gold',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  security: {
    icon: 'ShieldCheckIcon',
    cardClass: 'service-card-teal',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
  },
  meals: {
    icon: 'CakeIcon',
    cardClass: 'service-card-gold',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
  },
};

export default function ServicesBentoSection() {
  const { content } = useCMS();
  const bento = content?.servicesBento;
  const servicesList = bento?.services || [];

  const cleaning = servicesList.find((s) => s.id === 'cleaning') || servicesList[0];
  const moving = servicesList.find((s) => s.id === 'moving') || servicesList[1];
  const property = servicesList.find((s) => s.id === 'property') || servicesList[2];
  const childcare = servicesList.find((s) => s.id === 'childcare') || servicesList[3];
  const handyman = servicesList.find((s) => s.id === 'handyman') || servicesList[4];
  const security = servicesList.find((s) => s.id === 'security') || servicesList[5];
  const meals = servicesList.find((s) => s.id === 'meals') || servicesList[6];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-700 uppercase tracking-widest text-secondary mb-3">
            {bento?.badge || 'What We Offer'}
          </span>
          <h2 className="text-section-title text-primary mb-4">
            {bento?.titleLine1 || 'All Your Services,'}<br />
            <span className="text-secondary">{bento?.titleHighlight || 'One Trusted Company'}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-500 text-base leading-relaxed">
            {bento?.subtitle || 'From daily cleaning to complex property management — we deliver professional, reliable services across the UK.'}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card: Cleaning (col-span-2, with image) */}
          {cleaning && (
            <div className="lg:col-span-2 rounded-4xl overflow-hidden relative group card-hover cursor-pointer bg-primary">
              <Link href={`/service-detail?service=${cleaning.id}`} className="block h-full">
                <div className="relative h-72 sm:h-80 flex flex-col justify-end">
                  <div className="absolute inset-0">
                    <AppImage
                      src={staticStyleMap.cleaning.image!}
                      alt={staticStyleMap.cleaning.imageAlt!}
                      fill
                      sizes="(max-width: 768px) 100vw, 66vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/75 to-primary/30" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/50 to-transparent" />
                  
                  <div className="relative z-10 p-6 sm:p-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-secondary text-white shadow-md mb-3">
                      <Icon name="SparklesIcon" size={24} className="text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-800 text-white mb-2 drop-shadow-sm">{cleaning.title}</h3>
                    <p className="text-white/90 text-sm sm:text-base font-500 leading-relaxed mb-4 max-w-lg drop-shadow-sm">{cleaning.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {cleaning.tags?.map((tag) => (
                        <span key={tag} className="text-xs font-700 bg-white/25 backdrop-blur-md text-white border border-white/30 px-3.5 py-1.5 rounded-full shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="service-card-sage p-5 flex items-center justify-between">
                  <span className="text-sm font-700 text-primary">{cleaning.ctaText || 'View Cleaning Services'}</span>
                  <Icon name="ArrowRightIcon" size={18} className="text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          )}

          {/* Card: Moving (col-span-1, row-span-2) */}
          {moving && (
            <div className="lg:row-span-2 rounded-4xl overflow-hidden service-card-navy group card-hover cursor-pointer flex flex-col h-full">
              <Link href={`/service-detail?service=${moving.id}`} className="flex flex-col h-full p-7">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 mb-5">
                  <Icon name="TruckIcon" size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-800 text-primary mb-3">{moving.title}</h3>
                <p className="text-muted-foreground text-sm font-500 leading-relaxed mb-5 flex-1">{moving.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {moving.tags?.map((tag) => (
                    <span key={tag} className="text-xs font-600 bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="bg-white/60 rounded-2xl p-4 space-y-2 mb-6">
                  {['Packing & Wrapping', 'Furniture Handling', 'Move-In Cleaning', 'Storage Coordination'].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-secondary/30 rounded-full flex items-center justify-center shrink-0">
                        <Icon name="CheckIcon" size={10} className="text-secondary" />
                      </div>
                      <span className="text-xs font-600 text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm font-700 text-primary group-hover:gap-3 transition-all">
                  {moving.ctaText || 'View Service'} <Icon name="ArrowRightIcon" size={16} />
                </div>
              </Link>
            </div>
          )}

          {/* Card: Property */}
          {property && <DynamicServiceCard service={property} style={staticStyleMap.property} />}

          {/* Card: Childcare */}
          {childcare && <DynamicServiceCard service={childcare} style={staticStyleMap.childcare} />}

          {/* Card: Handyman (col-span-2) */}
          {handyman && (
            <div className="lg:col-span-2 rounded-4xl overflow-hidden service-card-gold group card-hover cursor-pointer">
              <Link href={`/service-detail?service=${handyman.id}`} className="flex flex-col sm:flex-row h-full">
                <div className="p-7 flex-1">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-100 mb-5">
                    <Icon name="WrenchScrewdriverIcon" size={24} className="text-amber-600" />
                  </div>
                  <h3 className="text-xl font-800 text-primary mb-3">{handyman.title}</h3>
                  <p className="text-muted-foreground text-sm font-500 leading-relaxed mb-5 max-w-sm">{handyman.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {handyman.tags?.map((tag) => (
                      <span key={tag} className="text-xs font-600 bg-amber-600/10 text-amber-700 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-700 text-primary group-hover:gap-3 transition-all">
                    {handyman.ctaText || 'View Service'} <Icon name="ArrowRightIcon" size={16} />
                  </div>
                </div>
                <div className="sm:w-48 bg-amber-100/50 flex items-center justify-center p-8">
                  <div className="grid grid-cols-2 gap-3">
                    {['WrenchScrewdriverIcon', 'PaintBrushIcon', 'BoltIcon', 'HomeIcon'].map((iconName) => (
                      <div key={iconName} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                        <Icon name={iconName as any} size={22} className="text-amber-600" />
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Card: Security */}
          {security && <DynamicServiceCard service={security} style={staticStyleMap.security} />}

          {/* Card: Meals */}
          {meals && <DynamicServiceCard service={meals} style={staticStyleMap.meals} />}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl text-base font-700 hover:bg-navy-light transition-all shadow-card"
          >
            {bento?.viewAllBtnText || 'View All Services'}
            <Icon name="ArrowRightIcon" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function DynamicServiceCard({
  service,
  style,
}: {
  service: { id: string; title: string; description: string; tags: string[]; ctaText?: string };
  style?: { icon: string; cardClass: string; iconBg: string; iconColor: string };
}) {
  const cardClass = style?.cardClass || 'service-card-sage';
  const icon = (style?.icon as any) || 'SparklesIcon';
  const iconBg = style?.iconBg || 'bg-secondary/20';
  const iconColor = style?.iconColor || 'text-secondary';

  return (
    <div className={`rounded-4xl overflow-hidden ${cardClass} group card-hover cursor-pointer`}>
      <Link href={`/service-detail?service=${service.id}`} className="block p-7 h-full">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${iconBg} mb-5`}>
          <Icon name={icon} size={24} className={iconColor} />
        </div>
        <h3 className="text-xl font-800 text-primary mb-3">{service.title}</h3>
        <p className="text-muted-foreground text-sm font-500 leading-relaxed mb-5">{service.description}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {service.tags?.map((tag) => (
            <span key={tag} className="text-xs font-600 bg-primary/8 text-primary px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm font-700 text-primary group-hover:gap-3 transition-all">
          {service.ctaText || 'View Service'} <Icon name="ArrowRightIcon" size={16} />
        </div>
      </Link>
    </div>
  );
}