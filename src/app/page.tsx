import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import ServicesBentoSection from '@/app/components/ServicesBentoSection';
import WhyChooseUsSection from '@/app/components/WhyChooseUsSection';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import HomeCTASection from '@/app/components/HomeCTASection';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesBentoSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <HomeCTASection />
      </main>
      <Footer />
    </>
  );
}