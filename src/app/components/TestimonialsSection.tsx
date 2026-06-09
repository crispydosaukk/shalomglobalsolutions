import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const testimonials = [
{
  name: 'Margaret Thompson',
  role: 'Homeowner, London',
  quote: 'Shalom Global cleaned our 4-bedroom home before our move-in. The team was punctual, professional, and left everything spotless. I was genuinely impressed.',
  rating: 5,
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bddfb0d2-1769187553156.png",
  service: 'Cleaning Services'
},
{
  name: 'David Okafor',
  role: 'Landlord, Birmingham',
  quote: 'Their property and tenant support team helped me navigate all the compliance certificates — EPC, gas safety, EICR. Saved me hours of stress.',
  rating: 5,
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bea1928a-1769399135374.png",
  service: 'Property Support'
},
{
  name: 'Priya Sharma',
  role: 'Working Parent, Manchester',
  quote: 'I needed emergency childcare on short notice. The babysitter was caring, responsible, and my daughter absolutely loved her. Will definitely book again.',
  rating: 5,
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_128a088f6-1773131398847.png",
  service: 'Childcare'
},
{
  name: 'James Whitfield',
  role: 'Small Business Owner, Leeds',
  quote: 'The handyman team assembled our entire office, mounted TVs, and sorted some minor electrical issues. Fast, clean, and reasonably priced.',
  rating: 5,
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11e26d191-1772128628563.png",
  service: 'Handyman Services'
}];


export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-700 uppercase tracking-widest text-secondary mb-3">
            Client Testimonials
          </span>
          <h2 className="text-section-title text-primary mb-4">
            Real People,{' '}
            <span className="text-secondary">Real Results</span>
          </h2>
          <p className="text-muted-foreground font-500 max-w-lg mx-auto">
            Hundreds of satisfied clients across the UK trust Shalom Global Solution for their homes and businesses.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials?.map((t, i) =>
          <div
            key={t?.name}
            className={`rounded-4xl overflow-hidden group card-hover ${
            i === 0 ? 'sm:col-span-2 lg:col-span-2' : ''}`
            }>
            
              {i === 0 ? (
            /* Featured testimonial */
            <div className="relative h-full min-h-[280px] flex items-end">
                  <AppImage
                src={t?.avatar}
                alt="Happy client in bright home environment, warm natural lighting, soft background"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700" />
              
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                  <div className="relative z-10 p-8">
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: t?.rating })?.map((_, j) =>
                  <Icon key={j} name="StarIcon" size={14} className="text-terracotta" variant="solid" />
                  )}
                    </div>
                    <p className="text-white font-500 text-base leading-relaxed mb-5 italic">
                      &ldquo;{t?.quote}&rdquo;
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-700 text-white text-sm">{t?.name}</p>
                        <p className="text-white/60 text-xs font-500">{t?.role}</p>
                      </div>
                      <span className="text-xs font-600 bg-secondary/30 text-white px-3 py-1.5 rounded-full">
                        {t?.service}
                      </span>
                    </div>
                  </div>
                </div>) : (

            /* Regular testimonial */
            <div className="bg-white border border-border p-7 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0">
                      <AppImage
                    src={t?.avatar}
                    alt={`${t?.name} profile photo`}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover" />
                  
                    </div>
                    <div>
                      <p className="font-700 text-sm text-primary">{t?.name}</p>
                      <p className="text-xs text-muted-foreground font-500">{t?.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t?.rating })?.map((_, j) =>
                <Icon key={j} name="StarIcon" size={13} className="text-terracotta" variant="solid" />
                )}
                  </div>
                  <p className="text-muted-foreground text-sm font-500 leading-relaxed flex-1 italic">
                    &ldquo;{t?.quote}&rdquo;
                  </p>
                  <span className="inline-block mt-5 text-xs font-600 bg-secondary/10 text-secondary px-3 py-1.5 rounded-full self-start">
                    {t?.service}
                  </span>
                </div>)
            }
            </div>
          )}
        </div>
      </div>
    </section>);

}