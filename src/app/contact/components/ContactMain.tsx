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
      value: main?.phoneNumber || '07493109832',
      sub: 'Business Hours: 10.00 am to 6 pm',
      href: `tel:${main?.phoneNumber || '07493109832'}`,
      color: 'bg-secondary/10 text-secondary',
    },
    {
      icon: 'EnvelopeIcon',
      title: main?.emailTitle || 'Email',
      value: main?.emailAddress || 'info@shalomglobalsolution.co.uk',
      sub: 'We reply within 2 hours',
      href: `mailto:${main?.emailAddress || 'info@shalomglobalsolution.co.uk'}`,
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: 'MapPinIcon',
      title: main?.officeTitle || 'Office Address',
      value: main?.officeAddress || '241e, High Street',
      sub: main?.officeCity || 'London, E12 6SJ',
      href: 'https://maps.google.com/?q=241e+High+Street,+London+E12+6SJ',
      color: 'bg-terracotta/10 text-terracotta',
    },
    {
      icon: 'ClockIcon',
      title: main?.hoursTitle || 'Business Hours',
      value: main?.hoursWeekdays || '10.00 am to 6 pm',
      sub: 'Monday – Friday',
      color: 'bg-amber-100 text-amber-600',
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="site-container">
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

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {contactDetails.map((item) => {
                const CardInner = (
                  <div className="bg-white border border-border rounded-3xl p-5 card-hover h-full flex flex-col justify-between">
                    <div>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
                        <Icon name={item.icon as any} size={20} />
                      </div>
                      <p className="text-xs font-700 uppercase tracking-widest text-muted-foreground mb-1">{item.title}</p>
                      <p className="font-700 text-sm text-primary group-hover:text-secondary transition-colors">{item.value}</p>
                    </div>
                    <p className="text-xs text-muted-foreground font-500 mt-2">{item.sub}</p>
                  </div>
                );

                return item.href ? (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group block transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-secondary/40 rounded-3xl"
                  >
                    {CardInner}
                  </a>
                ) : (
                  <div key={item.title}>
                    {CardInner}
                  </div>
                );
              })}
            </div>

            {/* Interactive Google Map of London E12 6SJ */}
            <div className="rounded-3xl overflow-hidden border border-border bg-white shadow-card relative">
              <div className="p-4 bg-primary text-white flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <Icon name="MapPinIcon" size={18} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs font-700 leading-tight">241e, High Street, London, E12 6SJ</p>
                    <p className="text-[11px] text-white/60">Mon – Fri: 10.00 am to 6 pm</p>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=241e+High+Street,+London+E12+6SJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-700 text-secondary hover:text-white transition-colors bg-white/10 px-3 py-1.5 rounded-lg shrink-0"
                >
                  <span>Directions</span>
                  <Icon name="ArrowTopRightOnSquareIcon" size={13} />
                </a>
              </div>
              <div className="h-64 w-full relative bg-muted">
                <iframe
                  title="Office Location: 241e, High Street, London, E12 6SJ"
                  src="https://maps.google.com/maps?q=241e+High+Street,+London+E12+6SJ&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
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