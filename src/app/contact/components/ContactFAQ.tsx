'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useCMS } from '@/lib/cmsContext';

export default function ContactFAQ() {
  const { content } = useCMS();
  const faqCMS = content?.contact?.faq;
  const items = faqCMS?.items || [];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-cream-dark/40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-700 uppercase tracking-widest text-secondary mb-3">
            {faqCMS?.badge || 'FAQs'}
          </span>
          <h2 className="text-section-title text-primary mb-4">
            {faqCMS?.title || 'Common Questions Answered'}
          </h2>
          {faqCMS?.subtitle && (
            <p className="text-sm text-muted-foreground font-500 max-w-md mx-auto">
              {faqCMS.subtitle}
            </p>
          )}
        </div>

        <div className="space-y-3">
          {items.map((faq, i) => (
            <div key={i} className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/30 transition-colors"
              >
                <span className="font-700 text-sm text-primary pr-6 leading-relaxed">{faq.question}</span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${openIndex === i ? 'bg-secondary text-white' : 'bg-muted text-muted-foreground'}`}>
                  <Icon name={openIndex === i ? 'MinusIcon' : 'PlusIcon'} size={16} />
                </div>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6">
                  <div className="h-px bg-border mb-4" />
                  <p className="text-sm text-muted-foreground font-500 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}