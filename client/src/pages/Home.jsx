// src/pages/Home.jsx
import React from 'react'
import HeroSection from '../components/agency/HeroSection'
import ServicesSection from '../components/agency/ServicesSection'
import AboutSection from '../components/agency/AboutSection'
import ContactSection from '../components/agency/ContactSection'

function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
    </>
  )
}

export default Home