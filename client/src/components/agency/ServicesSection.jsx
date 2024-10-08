// src/components/agency/ServicesSection.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Code, Rocket, Zap, Globe } from 'lucide-react'

function ServicesSection() {
  const services = [
    { icon: <Code className="h-8 w-8 mb-4" />, title: "Web Development", description: "Crafting responsive and performant websites using the latest technologies." },
    { icon: <Rocket className="h-8 w-8 mb-4" />, title: "App Development", description: "Building cross-platform mobile apps that deliver exceptional user experiences." },
    { icon: <Zap className="h-8 w-8 mb-4" />, title: "UI/UX Design", description: "Creating intuitive and visually stunning interfaces that users love." },
    { icon: <Globe className="h-8 w-8 mb-4" />, title: "Digital Marketing", description: "Boosting your online presence with data-driven marketing strategies." },
  ]

  return (
    <section id="services" className="py-20 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  {service.icon}
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection