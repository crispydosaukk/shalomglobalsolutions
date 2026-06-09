import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactHero from '@/app/contact/components/ContactHero';
import ContactMain from '@/app/contact/components/ContactMain';
import ContactFAQ from '@/app/contact/components/ContactFAQ';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactHero />
        <ContactMain />
        <ContactFAQ />
      </main>
      <Footer />
    </>
  );
}