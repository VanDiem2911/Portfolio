import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Achievements from './components/Achievements';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import { portfolioData } from './data/portfolioData';

export default function App() {
  // Check browser/system preference or localStorage for initial theme
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return userPrefersDark ? 'dark' : 'light';
  };

  const [language, setLanguage] = useState('vi');
  const [theme, setTheme] = useState(getInitialTheme);

  // Synchronize CSS class for dark theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Synchronize document SEO title and meta description based on language
  useEffect(() => {
    const meta = portfolioData[language].meta;
    document.title = meta.title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = meta.description;

    // Set HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  // Intersection Observer for scroll animations (up and down scroll reveal)
  // Handles dynamic DOM updates (like tab switching) via MutationObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.05
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, observerOptions);

    const observeElements = () => {
      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach((el) => {
        observer.observe(el);
      });
    };

    // Initial observation
    observeElements();

    // Set up MutationObserver to detect new DOM elements when tabs or content change
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />
      <main>
        <Hero language={language} />
        <About language={language} />
        <Services language={language} />
        <Achievements language={language} />
        <Testimonials language={language} />
        <Blog language={language} />
        <Resume language={language} />
        <Contact language={language} />
      </main>
      <Footer language={language} />
      <FloatingContact language={language} />
    </>
  );
}
