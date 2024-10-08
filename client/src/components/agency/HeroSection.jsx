// src/components/agency/HeroSection.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button';

function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Dream Satisfy Digital Agency
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl mb-8 text-muted-foreground"
        >
          We create cutting-edge digital experiences that push the boundaries of what's possible.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button size="lg" className="mr-4">Get Started</Button>
          <Button size="lg" variant="outline">Learn More</Button>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection