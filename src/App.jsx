import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Achievements from './components/Achievements';
import Testimonials from './components/Testimonials';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import Blog from './components/Blog';
import PropertyDetail from './components/PropertyDetail';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import HomeProjects from './components/HomeProjects';
import HomeBlog from './components/HomeBlog';
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

  // Simple client-side hash routing
  const parseHash = () => {
    const hash = window.location.hash || '';
    if (hash.startsWith('#/blog/')) {
      const id = hash.replace('#/blog/', '');
      return { page: 'blog-detail', id };
    } else if (hash === '#/blog') {
      return { page: 'blog' };
    } else if (hash === '#/admin') {
      return { page: 'admin' };
    } else if (hash === '#/admin/login') {
      return { page: 'admin-login' };
    }
    return { page: 'home' };
  };

  const [route, setRoute] = useState(parseHash());

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Synchronize CSS class for dark theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Synchronize document SEO title and meta description based on language and route
  useEffect(() => {
    let titleText = portfolioData[language].meta.title;
    let descText = portfolioData[language].meta.description;

    if (route.page === 'blog') {
      titleText = language === 'vi' ? 'Bất Động Sản | Phú Mỹ & TP.HCM' : 'Real Estate Catalog';
      descText = language === 'vi' ? 'Xem danh sách đất nền, nhà bán lẻ tại Phú Mỹ và TP.HCM.' : 'Browse houses and land plots for sale.';
    } else if (route.page === 'admin' || route.page === 'admin-login') {
      titleText = language === 'vi' ? 'Trang Quản Trị | Admin' : 'Admin Panel';
    }

    document.title = titleText;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = descText;

    document.documentElement.lang = language;
  }, [language, route]);

  // Intersection Observer for scroll animations (up and down scroll reveal)
  useEffect(() => {
    if (route.page !== 'home') return;

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

    observeElements();

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
  }, [language, route]);

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
      
      {route.page === 'home' && (
        <main>
          <Hero language={language} />
          <About language={language} />
          <Services language={language} />
          <Achievements language={language} />
          <Testimonials language={language} />
          <Resume language={language} />
          <HomeProjects language={language} />
          <HomeBlog language={language} />
          <Contact language={language} />
        </main>
      )}

      {route.page === 'blog' && <Blog language={language} />}
      {route.page === 'blog-detail' && <PropertyDetail language={language} propertyId={route.id} />}
      {route.page === 'admin-login' && <AdminLogin language={language} />}
      {route.page === 'admin' && <AdminDashboard language={language} />}

      <Footer language={language} />
      {route.page === 'home' && <FloatingContact language={language} />}
    </>
  );
}
