import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function BlogHero() {
  return (
    <section className="bg-primary pt-32 pb-0 relative overflow-hidden">
      <div className="absolute inset-0 grid-dot-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-0">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-6">
            <Icon name="NewspaperIcon" size={14} className="text-secondary" />
            <span className="text-xs font-700 uppercase tracking-widest text-white/80">Our Blog</span>
          </div>
          <h1 className="text-hero text-white mb-6">
            Tips, Guides &<br />
            <span className="text-secondary">Service Insights</span>
          </h1>
          <p className="text-white/70 font-500 text-lg max-w-xl mx-auto leading-relaxed">
            Helpful advice, home care tips, and professional insights from the Shalom Global Solution team.
          </p>
        </div>

        {/* Featured post */}
        <div className="bg-white rounded-t-4xl overflow-hidden shadow-hero">
          <div className="grid lg:grid-cols-2">
            <div className="relative h-64 lg:h-80">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1f6f818d2-1772221864719.png"
                alt="Bright, organised moving day with neatly packed boxes in clean modern home, warm daylight"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority />
              
              <div className="absolute top-4 left-4">
                <span className="bg-secondary text-secondary-foreground text-xs font-700 uppercase tracking-wider px-3 py-1.5 rounded-full">
                  Featured
                </span>
              </div>
            </div>
            <div className="p-10 flex flex-col justify-center">
              <span className="text-xs font-700 uppercase tracking-widest text-secondary mb-3">Moving Tips</span>
              <h2 className="text-2xl font-800 text-primary mb-4 leading-tight">
                10 Essential Tips for a Stress-Free Home Move in 2026
              </h2>
              <p className="text-muted-foreground font-500 text-sm leading-relaxed mb-6">
                Moving home doesn&apos;t have to be overwhelming. Our professional relocation team shares their top 10 tips to make your next move smooth, organised, and stress-free from start to finish.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Icon name="UserIcon" size={16} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs font-700 text-primary">ShalomGlobal Team</p>
                    <p className="text-xs text-muted-foreground font-500">9 June 2026</p>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-700 text-secondary hover:text-sage-dark transition-colors">
                  
                  Read More <Icon name="ArrowRightIcon" size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}