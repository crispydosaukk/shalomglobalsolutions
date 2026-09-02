'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useCMS } from '@/lib/cmsContext';

const categories = ['All', 'Cleaning', 'Moving', 'Property', 'Childcare', 'Maintenance', 'Relocation'];

const articleImages = [
  'https://img.rocket.new/generatedImages/rocket_gen_img_1fdc7d837-1772152005578.png',
  'https://img.rocket.new/generatedImages/rocket_gen_img_11e492967-1773593378128.png',
  'https://img.rocket.new/generatedImages/rocket_gen_img_1e46ebffd-1772962818279.png',
  'https://img.rocket.new/generatedImages/rocket_gen_img_1a9de5f79-1767907222508.png',
];

export default function BlogGrid() {
  const { content } = useCMS();
  const [activeCategory, setActiveCategory] = useState('All');

  const rawPosts = content?.blog?.articles || [];

  const posts = rawPosts.map((p, idx) => ({
    ...p,
    image: articleImages[idx % articleImages.length],
    imageAlt: p.title,
    tagColor: 'bg-secondary/10 text-secondary',
  }));

  const filtered = activeCategory === 'All'
    ? posts
    : posts.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-600 transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-card'
                  : 'bg-muted text-muted-foreground hover:bg-cream-dark hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map((post) => (
            <article key={post.id} className="bg-white border border-border rounded-4xl overflow-hidden shadow-card group card-hover flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <AppImage
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className={`text-xs font-700 uppercase tracking-wider px-3 py-1.5 rounded-full ${post.tagColor}`}>
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-base font-800 text-primary mb-3 leading-snug group-hover:text-secondary transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground font-500 leading-relaxed flex-1 mb-5">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Icon name="UserIcon" size={13} className="text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs font-700 text-primary">{post.author}</p>
                      <p className="text-xs text-muted-foreground font-500">{post.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground font-500">
                    <Icon name="ClockIcon" size={12} />
                    {post.readTime}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="bg-primary rounded-4xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 grid-dot-bg opacity-20" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-800 text-white mb-3">
                Get Expert Tips Delivered to Your Inbox
              </h3>
              <p className="text-white/70 font-500 leading-relaxed">
                Join hundreds of homeowners and landlords who receive our monthly tips on home maintenance, cleaning, and property management.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50"
              />
              <button className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-3.5 rounded-xl text-sm font-700 hover:bg-sage-dark transition-all whitespace-nowrap">
                <Icon name="EnvelopeIcon" size={16} />
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Back to services */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-700 text-secondary hover:text-sage-dark transition-colors underline underline-offset-4"
          >
            <Icon name="ArrowLeftIcon" size={16} />
            Back to Services
          </Link>
        </div>
      </div>
    </section>
  );
}