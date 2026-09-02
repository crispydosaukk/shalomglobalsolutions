'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import ContactForm from '@/app/components/ContactForm';
import { useCMS } from '@/lib/cmsContext';

export default function ContactMain() {
  const { content } = useCMS();
  const main = content?.contact?.main;
  const formCMS = content?.contact?.form;

  const contactDetails = [
    {
      icon: 'PhoneIcon',
      title: main?.phoneTitle || 'Phone',
      value: main?.phoneNumber || '+44 (0) 7700 900000',
      sub: main?.hoursWeekdays || 'Monday – Friday, 8am – 7pm',
      color: 'bg-secondary/10 text-secondary',
    },
    {
      icon: 'EnvelopeIcon',
      title: main?.emailTitle || 'Email',
      value: main?.emailAddress || 'info@shalomglobalsolution.co.uk',
      sub: 'We reply within 2 hours',
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: 'MapPinIcon',
      title: main?.officeTitle || 'Office Address',
      value: main?.officeAddress || '128 City Road, London',
      sub: main?.officeCity || 'United Kingdom, EC1V 2NX',
      color: 'bg-terracotta/10 text-terracotta',
    },
    {
      icon: 'ClockIcon',
      title: main?.hoursTitle || 'Operating Hours',
      value: main?.hoursWeekdays || 'Mon – Fri: 8am – 7pm',
      sub: main?.emergencyNote || 'Emergency support available',
      color: 'bg-amber-100 text-amber-600',
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Contact info */}
          <div>
            <span className="inline-block text-xs font-700 uppercase tracking-widest text-secondary mb-3">Get in Touch</span>
            <h2 className="text-section-title text-primary mb-6">
              We&apos;re Here to<br />
              <span className="text-secondary">Help You</span>
            </h2>
            <p className="text-muted-foreground font-500 leading-relaxed mb-10 text-base">
              Whether you need a one-off service or a long-term arrangement, our team is ready to discuss your requirements and provide a tailored solution.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {contactDetails.map((item) => (
                <div key={item.title} className="bg-white border border-border rounded-3xl p-5 card-hover">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
                    <Icon name={item.icon as any} size={20} />
                  </div>
                  <p className="text-xs font-700 uppercase tracking-widest text-muted-foreground mb-1">{item.title}</p>
                  <p className="font-700 text-sm text-primary">{item.value}</p>
                  <p className="text-xs text-muted-foreground font-500 mt-1">{item.sub}</p>
                </div>
              ))}
            </div>

            {/* Map banner */}
            <div className="rounded-4xl overflow-hidden bg-muted border border-border h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Icon name="MapIcon" size={28} className="text-secondary" />
                </div>
                <p className="font-700 text-primary text-sm">Nationwide UK Coverage</p>
                <p className="text-xs text-muted-foreground font-500 mt-1">Serving homes and businesses across the UK</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <div className="bg-white border border-border rounded-4xl p-8 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center">
                  <Icon name="PaperAirplaneIcon" size={24} className="text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-800 text-primary">{formCMS?.title || 'Send an Enquiry'}</h3>
                  <p className="text-xs text-muted-foreground font-500">{formCMS?.subtitle || 'We respond within 24 hours'}</p>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}