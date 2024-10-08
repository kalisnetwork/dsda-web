import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/agency/Header';
import Footer from '../components/agency/Footer';
import LiquidCursor from '../components/LiquidCursor';
import { useDarkMode } from '../hooks/useDarkMode';

function MainLayout() {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <LiquidCursor isDarkMode={isDarkMode} />
      <Header
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isMenuOpen={isMenuOpen}       
        setIsMenuOpen={setIsMenuOpen}
      />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
