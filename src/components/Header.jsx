import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Header({ language, setLanguage, theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const t = portfolioData[language].nav;
  const name = portfolioData[language].hero.name;

  // Split name for dynamic monogram logo: e.g. "Nguyễn Văn A" -> monogram "N" & text "Văn A"
  const nameParts = name.split(' ');
  const monogram = nameParts[0] ? nameParts[0].charAt(0) : 'A';
  const restOfName = nameParts.slice(1).join(' ') || 'Van A';

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'h-[70px] bg-white/80 dark:bg-[#0b0f19]/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-850/80 shadow-lg' 
          : 'h-20 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full">
        {/* Dynamic Monogram Logo */}
        <a 
          href="#home" 
          className="flex items-center gap-2.5 font-title font-bold text-lg text-stone-900 dark:text-white group"
          onClick={(e) => handleLinkClick(e, 'home')}
        >
          <span className="w-8 h-8 rounded-lg bg-brandGreen-600 dark:bg-[#0df58b] text-white dark:text-stone-950 flex items-center justify-center font-extrabold text-base transition-transform duration-300 group-hover:scale-105">
            {monogram}
          </span>
          <span className="tracking-tight text-stone-800 dark:text-stone-150">
            {monogram}.<span className="text-brandGreen-700 dark:text-[#0df58b]">{restOfName}</span>
          </span>
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
                    ? 'text-brandGreen-700 dark:text-[#0df58b]' 
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
            className="flex items-center justify-center h-9 px-3 rounded-full border border-stone-200 dark:border-stone-800 hover:border-brandGreen-600 dark:hover:border-[#0df58b] hover:text-brandGreen-700 dark:hover:text-[#0df58b] font-title text-xs font-bold text-stone-600 dark:text-stone-400 transition-all duration-300 bg-transparent" 
            onClick={toggleLanguage} 
            title={language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
            aria-label="Toggle language"
          >
            <Globe size={13} className="mr-1" />
            {language === 'vi' ? 'EN' : 'VI'}
          </button>

          {/* Theme Toggle (Hidden or customized since page is default dark) */}
          <button 
            className="flex items-center justify-center w-9 h-9 rounded-full border border-stone-200 dark:border-stone-800 hover:border-brandGreen-600 dark:hover:border-[#0df58b] hover:text-brandGreen-700 dark:hover:text-[#0df58b] text-stone-600 dark:text-stone-400 transition-all duration-300 bg-transparent" 
            onClick={toggleTheme} 
            title={theme === 'light' ? 'Bật Dark Mode' : 'Bật Light Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
          </button>

          {/* Outlined Action Button */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-full font-bold font-title text-xs border border-brandGreen-600 text-brandGreen-700 hover:bg-brandGreen-600 hover:text-white dark:border-[#0df58b] dark:text-[#0df58b] dark:hover:bg-[#0df58b] dark:hover:text-stone-950 transition-all duration-300 bg-transparent"
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
