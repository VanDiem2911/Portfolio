import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Globe, User } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import BrandLogo from './BrandLogo';

export default function Header({ language, setLanguage, theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const t = portfolioData[language].nav;

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem('adminToken');
      setIsAdminLoggedIn(!!token);
    };
    checkLogin();
    window.addEventListener('hashchange', checkLogin);
    return () => window.removeEventListener('hashchange', checkLogin);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // If we are currently on the blog/real estate page, lock the active nav tab to blog
      if (window.location.hash.startsWith('#/blog')) {
        setActiveSection('blog');
        return;
      }

      // If we are currently on the admin page, lock the active nav tab to admin
      if (window.location.hash.startsWith('#/admin')) {
        setActiveSection('admin');
        return;
      }

      const sections = ['home', 'about', 'services', 'achievements', 'resume', 'homeBlog', 'contact'];
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

    // Run initially to capture current hash on load
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleScroll);
    };
  }, []);

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // Navigate to blog section directly
    if (sectionId === 'blog') {
      window.location.hash = '#/blog';
      setActiveSection('blog');
      return;
    }

    // Navigate to admin section directly
    if (sectionId === 'admin') {
      window.location.hash = '#/admin';
      setActiveSection('admin');
      return;
    }

    // Cross-page navigation back to homepage from another subpage
    if (window.location.hash && window.location.hash !== '#/' && !window.location.hash.startsWith('#home')) {
      window.location.hash = '#/';
      setTimeout(() => {
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
        }
      }, 150);
      setActiveSection(sectionId);
      return;
    }

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'h-[70px] bg-white/80 dark:bg-[#0b0f19]/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-850/80 shadow-lg' 
          : 'h-20 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full">
        {/* Brand logo */}
        <a 
          href="#home" 
          className="group"
          onClick={(e) => handleLinkClick(e, 'home')}
          aria-label={language === 'vi' ? 'Phạm Thị Thu — Trang chủ' : 'Pham Thi Thu — Home'}
        >
          <BrandLogo imageClassName={isScrolled ? 'h-[60px] md:h-[80px]' : 'h-[100px] md:h-[120px]'} />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {Object.keys(t).map((key) => {
            if (key === 'consultBtn') return null;
            const isActive = activeSection === key;
            return (
              <a
                key={key}
                href={`#${key}`}
                className={`font-title font-semibold text-xs tracking-wider uppercase transition-colors duration-300 relative py-2 ${
                  isActive 
                    ? 'text-brandGreen-750 dark:text-[#0df58b]' 
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
                onClick={(e) => handleLinkClick(e, key)}
              >
                {t[key]}
                <span 
                  className={`absolute bottom-0 left-0 h-[2px] bg-brandGreen-600 dark:bg-[#0df58b] transition-all duration-300 ${
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
            className={`flex items-center justify-center h-9 px-3 rounded-full border transition-all duration-300 bg-transparent font-title text-xs font-bold ${
              isScrolled 
                ? 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-brandGreen-600 dark:hover:border-[#0df58b] hover:text-brandGreen-700 dark:hover:text-[#0df58b]' 
                : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:border-brandGreen-600 dark:hover:border-[#0df58b] hover:text-brandGreen-700 dark:hover:text-[#0df58b] lg:border-stone-950 lg:text-stone-950 lg:hover:bg-stone-950 lg:hover:text-[#0df58b]'
            }`}
            onClick={toggleLanguage} 
            title={language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
            aria-label="Toggle language"
          >
            <Globe size={13} className="mr-1" />
            {language === 'vi' ? 'EN' : 'VI'}
          </button>

          {/* Theme Toggle */}
          <button 
            className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 bg-transparent ${
              isScrolled 
                ? 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-brandGreen-600 dark:hover:border-[#0df58b] hover:text-brandGreen-700 dark:hover:text-[#0df58b]' 
                : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:border-brandGreen-600 dark:hover:border-[#0df58b] hover:text-brandGreen-700 dark:hover:text-[#0df58b] lg:border-stone-950 lg:text-stone-950 lg:hover:bg-stone-950 lg:hover:text-[#0df58b]'
            }`}
            onClick={toggleTheme} 
            title={theme === 'light' ? 'Bật Dark Mode' : 'Bật Light Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
          </button>

          {/* Admin Avatar Toggle Icon */}
          <button 
            className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 bg-transparent ${
              isAdminLoggedIn 
                ? 'border-brandGreen-600 text-brandGreen-700 dark:border-[#0df58b] dark:text-[#0df58b] bg-brandGreen-50 dark:bg-brandGreen-950/20' 
                : isScrolled 
                  ? 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-brandGreen-600 dark:hover:border-[#0df58b] hover:text-brandGreen-700 dark:hover:text-[#0df58b]' 
                  : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:border-brandGreen-600 dark:hover:border-[#0df58b] hover:text-brandGreen-700 dark:hover:text-[#0df58b] lg:border-stone-950 lg:text-stone-950 lg:hover:bg-stone-950 lg:hover:text-[#0df58b]'
            }`}
            onClick={() => window.location.hash = '#/admin'} 
            title={isAdminLoggedIn 
              ? (language === 'vi' ? 'Bảng quản trị (Đang đăng nhập)' : 'Admin Dashboard (Logged In)')
              : (language === 'vi' ? 'Đăng nhập Quản trị' : 'Admin Login')}
            aria-label="Admin Login"
          >
            {isAdminLoggedIn ? (
              <span className="text-[10px] font-title font-black uppercase tracking-wider">AD</span>
            ) : (
              <User size={15} />
            )}
          </button>

          {/* Outlined Action Button */}
          <a
            href="#contact"
            className={`hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-full font-bold font-title text-xs transition-all duration-300 bg-transparent border ${
              isScrolled 
                ? 'border-brandGreen-600 text-brandGreen-700 hover:bg-brandGreen-600 hover:text-white dark:border-[#0df58b] dark:text-[#0df58b] dark:hover:bg-[#0df58b] dark:hover:text-stone-950' 
                : 'border-brandGreen-600 text-brandGreen-700 hover:bg-brandGreen-600 hover:text-white dark:border-[#0df58b] dark:text-[#0df58b] dark:hover:bg-[#0df58b] dark:hover:text-stone-950 lg:border-stone-950 lg:text-stone-950 lg:hover:bg-stone-950 lg:hover:text-[#0df58b]'
            }`}
            onClick={(e) => handleLinkClick(e, 'contact')}
          >
            {t.consultBtn}
          </a>

          {/* Mobile drawer toggle */}
          <button 
            className="md:hidden flex items-center justify-center w-9 h-9 text-stone-600 dark:text-stone-300 hover:text-[#0df58b] transition-colors border border-stone-200 dark:border-stone-800 rounded-full" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      <nav 
        className={`md:hidden fixed top-[70px] left-0 w-full bg-white dark:bg-[#0b0f19] border-b border-stone-200 dark:border-stone-850 flex flex-col items-center py-6 px-6 gap-3 shadow-lg transition-all duration-300 z-40 ${
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
              className={`w-full text-center py-2 text-xs uppercase font-bold tracking-wider font-title rounded-lg transition-colors ${
                isActive 
                  ? 'bg-stone-100 dark:bg-stone-900 text-brandGreen-700 dark:text-[#0df58b]' 
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100/50 dark:hover:bg-stone-900/40 hover:text-stone-900 dark:hover:text-white'
              }`}
              onClick={(e) => handleLinkClick(e, key)}
            >
              {t[key]}
            </a>
          );
        })}
        
        <a
          href="#contact"
          className="w-full text-center py-2.5 mt-2 rounded-full font-bold font-title text-xs border border-brandGreen-600 text-brandGreen-700 hover:bg-brandGreen-600 hover:text-white dark:border-[#0df58b] dark:text-[#0df58b] dark:hover:bg-[#0df58b] dark:hover:text-stone-950 transition-colors"
          onClick={(e) => handleLinkClick(e, 'contact')}
        >
          {t.consultBtn}
        </a>
      </nav>
    </header>
  );
}
