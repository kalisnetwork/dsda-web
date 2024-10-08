// src/components/agency/AboutSection.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button';

function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mb-8 md:mb-0"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Dream Satisfy</h2>
            <p className="text-lg mb-4">
              We are a team of passionate developers and designers dedicated to creating innovative digital solutions.
              With years of experience and a commitment to staying at the forefront of technology, we deliver
              exceptional results for our clients.
            </p>
            <Button>Learn More About Us</Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Team working"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection