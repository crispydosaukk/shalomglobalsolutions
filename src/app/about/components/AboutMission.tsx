import React from 'react';
import Icon from '@/components/ui/AppIcon';

const values = [
  { icon: 'StarIcon', title: 'Excellence', desc: 'We hold ourselves to the highest standards in every service we deliver, every single day.' },
  { icon: 'ShieldCheckIcon', title: 'Trust & Integrity', desc: 'Honest, transparent, and reliable — we build lasting relationships through consistent quality.' },
  { icon: 'UserGroupIcon', title: 'Customer First', desc: 'Every decision we make centres on delivering the best possible experience for our clients.' },
  { icon: 'LightBulbIcon', title: 'Innovation', desc: 'We continuously improve our processes and services to stay ahead of industry standards.' },
  { icon: 'CheckBadgeIcon', title: 'Professionalism', desc: 'From our uniforms to our conduct, we represent our brand with pride and professionalism.' },
  { icon: 'HeartIcon', title: 'Community', desc: 'We are proud to serve communities across the UK, making everyday life easier and better.' },
];

export default function AboutMission() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <span className="inline-block text-xs font-700 uppercase tracking-widest text-secondary mb-3">Our Mission</span>
            <h2 className="text-section-title text-primary mb-6">
              Solutions for Every Need,<br />
              <span className="text-secondary">Under One Roof</span>
            </h2>
            <p className="text-muted-foreground font-500 leading-relaxed mb-6 text-base">
              Our mission is to provide professional, affordable, and trustworthy services that make everyday life easier, safer, cleaner, and more comfortable. We combine professionalism, innovation, customer care, and operational excellence to provide a wide range of essential services under one trusted brand.
            </p>
            <p className="text-muted-foreground font-500 leading-relaxed text-base">
              Whether you need cleaning solutions, property support, home security systems, home-cooked meals, tenant support services, or childcare assistance, Shalom Global Solution is committed to delivering dependable service with a personal touch.
            </p>
          </div>

          <div className="bg-primary rounded-4xl p-10 relative overflow-hidden">
            <div className="absolute inset-0 grid-dot-bg opacity-20" />
            <div className="relative z-10">
              <Icon name="QuoteIcon" size={48} className="text-secondary/40 mb-6" />
              <p className="text-white/90 text-xl font-600 leading-relaxed italic mb-8">
                &ldquo;Trusted Professionals Delivering Quality Services with Care, Reliability, and Excellence.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/30 rounded-xl flex items-center justify-center">
                  <Icon name="BuildingOffice2Icon" size={20} className="text-secondary" />
                </div>
                <div>
                  <p className="font-700 text-white text-sm">Shalom Global Solution</p>
                  <p className="text-white/50 text-xs font-500">UK Professional Services</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-700 uppercase tracking-widest text-secondary mb-3">Our Values</span>
            <h2 className="text-section-title text-primary">The Principles We Live By</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-white border border-border rounded-3xl p-7 card-hover">
                <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center mb-5">
                  <Icon name={v.icon as any} size={24} className="text-secondary" />
                </div>
                <h3 className="font-800 text-primary text-lg mb-3">{v.title}</h3>
                <p className="text-sm text-muted-foreground font-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}