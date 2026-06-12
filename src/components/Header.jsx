import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Header({ language, setLanguage, theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const t = portfolioData[language].nav;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['home', 'about', 'services', 'achievements', 'blog', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'vi' ? 'en' : 'vi'));
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-brandBeige-50/80 dark:bg-brandBeige-950/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-800/80 ${
        isScrolled ? 'h-[70px] shadow-sm' : 'h-20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full">
        {/* Logo */}
        <a 
          href="#home" 
          className="flex items-center gap-1 font-title font-bold text-xl text-brandBlue-600 dark:text-brandBlue-50"
          onClick={(e) => handleLinkClick(e, 'home')}
        >
          Port<span className="text-brandGreen-600">folio</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {Object.keys(t).map((key) => {
            if (key === 'consultBtn') return null;
            const isActive = activeSection === key;
            return (
              <a
                key={key}
                href={`#${key}`}
                className={`font-title font-medium text-sm transition-colors duration-300 relative py-2 ${
                  isActive 
                    ? 'text-brandBlue-600 dark:text-brandBlue-500' 
                    : 'text-stone-500 dark:text-stone-400 hover:text-brandBlue-600 dark:hover:text-brandBlue-400'
                }`}
                onClick={(e) => handleLinkClick(e, key)}
              >
                {t[key]}
                <span 
                  className={`absolute bottom-0 left-0 h-[2px] bg-brandBlue-600 dark:bg-brandBlue-500 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button 
            className="flex items-center justify-center h-10 px-3 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-brandBlue-50 dark:hover:bg-brandBlue-900/40 hover:text-brandBlue-600 dark:hover:text-brandBlue-400 hover:border-brandBlue-500 dark:hover:border-brandBlue-500 font-title text-xs font-bold text-stone-500 dark:text-stone-400 transition-all duration-300" 
            onClick={toggleLanguage} 
            title={language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
            aria-label="Toggle language"
          >
            <Globe size={14} className="mr-1" />
            {language === 'vi' ? 'EN' : 'VI'}
          </button>

          {/* Theme Toggle */}
          <button 
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-brandBlue-50 dark:hover:bg-brandBlue-900/40 hover:text-brandBlue-600 dark:hover:text-brandBlue-400 hover:border-brandBlue-500 dark:hover:border-brandBlue-500 text-stone-500 dark:text-stone-400 transition-all duration-300" 
            onClick={toggleTheme} 
            title={theme === 'light' ? 'Bật Dark Mode' : 'Bật Light Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* CTA desktop */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold font-title text-sm bg-gradient-to-r from-brandBlue-600 to-brandBlue-700 hover:from-brandBlue-700 hover:to-brandBlue-800 text-white shadow hover:shadow-md transition-all duration-300 hover:-translate-y-[1px]"
            onClick={(e) => handleLinkClick(e, 'contact')}
          >
            {t.consultBtn}
          </a>

          {/* Mobile hamburger toggle */}
          <button 
            className="md:hidden flex items-center justify-center w-10 h-10 text-stone-700 dark:text-stone-200 hover:text-brandBlue-600 dark:hover:text-brandBlue-400 transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      <nav 
        className={`md:hidden fixed top-[70px] left-0 w-full bg-brandBeige-50 dark:bg-brandBeige-950 border-b border-stone-200 dark:border-stone-800 flex flex-col items-center py-6 px-6 gap-3 shadow-lg transition-all duration-300 z-40 ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        {Object.keys(t).map((key) => {
          if (key === 'consultBtn') return null;
          const isActive = activeSection === key;
          return (
            <a
              key={key}
              href={`#${key}`}
              className={`w-full text-center py-2 text-sm font-semibold font-title rounded-lg transition-colors ${
                isActive 
                  ? 'bg-brandBlue-50 dark:bg-brandBlue-900/20 text-brandBlue-600 dark:text-brandBlue-400' 
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900'
              }`}
              onClick={(e) => handleLinkClick(e, key)}
            >
              {t[key]}
            </a>
          );
        })}
        
        <a
          href="#contact"
          className="w-full text-center py-2.5 mt-2 rounded-lg font-semibold font-title text-sm bg-brandBlue-600 hover:bg-brandBlue-700 text-white transition-colors"
          onClick={(e) => handleLinkClick(e, 'contact')}
        >
          {t.consultBtn}
        </a>
      </nav>
    </header>
  );
}
