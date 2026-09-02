'use client';

import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useCMS } from '@/lib/cmsContext';

const staticIcons = ['ShieldCheckIcon', 'AcademicCapIcon', 'BriefcaseIcon', 'ClockIcon', 'UserGroupIcon', 'HeartIcon'];
const staticColors = ['text-secondary', 'text-primary', 'text-terracotta', 'text-amber-600', 'text-teal-600', 'text-pink-500'];

export default function AboutTeamValues() {
  const { content } = useCMS();
  const teamVal = content?.about?.teamValues;
  const values = teamVal?.values || [];

  return (
    <section className="py-20 bg-cream-dark/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-700 uppercase tracking-widest text-secondary mb-3">
            {teamVal?.badge || 'Our Team'}
          </span>
          <h2 className="text-section-title text-primary mb-4">
            {teamVal?.title || 'The Foundation of Our Success'}
          </h2>
          <p className="text-muted-foreground font-500 max-w-xl mx-auto leading-relaxed">
            {teamVal?.subtitle || 'Our employees are the heart of Shalom Global Solution. We invest in their development, wellbeing, and professional growth to ensure exceptional service delivery.'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-4xl overflow-hidden">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_1547c46fd-1763299917427.png"
                  alt="Professional female team member in smart uniform, friendly and confident in bright work environment"
                  width={280}
                  height={380}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="rounded-4xl overflow-hidden mt-8">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_14efa66f7-1772257127195.png"
                  alt="Professional male team member smiling in work uniform, bright clean professional environment"
                  width={280}
                  height={380}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="rounded-4xl overflow-hidden -mt-8">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_107bcec45-1773085527984.png"
                  alt="Professional team member with warm smile in bright UK professional services environment"
                  width={280}
                  height={380}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="rounded-4xl overflow-hidden">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_1353db03d-1771894285467.png"
                  alt="Professional male team member in clean uniform, confident and approachable expression"
                  width={280}
                  height={380}
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-800 text-primary mb-8">Why Our Team Stands Out</h3>
            <div className="space-y-5">
              {values.map((item, idx) => (
                <div key={item.title || idx} className="flex items-start gap-4 bg-white border border-border rounded-2xl p-5">
                  <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name={(item.icon || staticIcons[idx % staticIcons.length]) as any} size={20} className={staticColors[idx % staticColors.length]} />
                  </div>
                  <div>
                    <span className="font-700 text-sm text-primary block">{item.title}</span>
                    <span className="text-xs text-muted-foreground font-500">{item.desc}</span>
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