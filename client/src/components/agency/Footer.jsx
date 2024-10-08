// src/components/agency/Footer.jsx
import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-muted/80 backdrop-blur-sm py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Dream Satisfy</h3>
            <p className="text-sm text-muted-foreground">Shaping the future of digital experiences, one pixel at a time.</p>
          </div>
          <div className="flex space-x-4">
            <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
              Twitter
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
              LinkedIn
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
              GitHub
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Dream Satisfy Digital Agency. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer