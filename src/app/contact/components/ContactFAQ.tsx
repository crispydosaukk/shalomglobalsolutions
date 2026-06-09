'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const faqs = [
  {
    q: 'How quickly can you start a service?',
    a: 'For most services, we can begin within 24–48 hours of booking. For larger projects, we will discuss a suitable start date during our initial consultation.',
  },
  {
    q: 'Are your staff background checked?',
    a: 'Yes, all Shalom Global Solution staff are DBS checked, identity verified, and legally employed in compliance with UK employment regulations.',
  },
  {
    q: 'Do you offer services for businesses as well as homes?',
    a: 'Absolutely. We serve residential homes, offices, hotels, restaurants, care homes, shops, retail units, and commercial properties of all sizes.',
  },
  {
    q: 'Can I book multiple services together?',
    a: 'Yes, we encourage customers to combine services for convenience and often offer package arrangements. Contact us to discuss your specific needs.',
  },
  {
    q: 'What areas of the UK do you cover?',
    a: 'We provide services across the UK. Please contact us with your location and we will confirm service availability in your area.',
  },
  {
    q: 'How do I get a quote?',
    a: 'Simply fill in our contact form, call us, or email us with your requirements. We will provide a tailored, no-obligation quote within 24 hours.',
  },
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-cream-dark/40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-700 uppercase tracking-widest text-secondary mb-3">FAQs</span>
          <h2 className="text-section-title text-primary mb-4">
            Common Questions<br />
            <span className="text-secondary">Answered</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs?.map((faq, i) => (
            <div key={i} className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/30 transition-colors"
              >
                <span className="font-700 text-sm text-primary pr-6 leading-relaxed">{faq?.q}</span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${openIndex === i ? 'bg-secondary text-white' : 'bg-muted text-muted-foreground'}`}>
                  <Icon name={openIndex === i ? 'MinusIcon' : 'PlusIcon'} size={16} />
                </div>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6">
                  <div className="h-px bg-border mb-4" />
                  <p className="text-sm text-muted-foreground font-500 leading-relaxed">{faq?.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}