import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutHero from '@/app/about/components/AboutHero';
import AboutMission from '@/app/about/components/AboutMission';
import AboutTeamValues from '@/app/about/components/AboutTeamValues';
import AboutCredentials from '@/app/about/components/AboutCredentials';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <AboutMission />
        <AboutTeamValues />
        <AboutCredentials />
      </main>
      <Footer />
    </>
  );
}