import { ArrowRight, MessageSquare } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Hero({ language }) {
  const data = portfolioData[language].hero;

  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
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
  };

  const handleSlowScroll = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      const targetY = footer.getBoundingClientRect().top + window.scrollY;
      const startY = window.scrollY;
      const distance = targetY - startY;
      const duration = 15000; 
      let startTime = null;
      let animationFrameId = null;

      const linearEase = (t, b, c, d) => {
        return c * t / d + b;
      };

      const cancelScroll = () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        window.removeEventListener('wheel', cancelScroll);
        window.removeEventListener('touchstart', cancelScroll);
        window.removeEventListener('mousedown', cancelScroll);
        document.documentElement.style.scrollBehavior = '';
      };

      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = linearEase(timeElapsed, startY, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
          animationFrameId = requestAnimationFrame(animation);
        } else {
          cancelScroll();
        }
      };

      // Temporarily disable CSS smooth scroll for instant smooth JS scroll
      document.documentElement.style.scrollBehavior = 'auto';

      window.addEventListener('wheel', cancelScroll, { passive: true });
      window.addEventListener('touchstart', cancelScroll, { passive: true });
      window.addEventListener('mousedown', cancelScroll, { passive: true });
      animationFrameId = requestAnimationFrame(animation);
    }
  };

  return (
    <section 
      id="home" 
      className="relative pt-24 lg:pt-32 pb-20 min-h-[100dvh] flex items-center bg-brandBeige-50 dark:bg-[#0b0f19] overflow-hidden transition-colors duration-300"
    >
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#0df58b]/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-96 h-96 bg-[#0df58b]/5 rounded-full filter blur-[120px] pointer-events-none" />
      
      {/* Hex grid backdrop */}
      <div className="absolute inset-0 opacity-5 pointer-events-none hex-grid-pattern" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Hero Details */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left reveal reveal-left">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brandGreen-700 dark:text-[#0df58b]">
              {language === 'vi' ? 'XIN CHÀO, TÔI LÀ' : "HELLO, I'M"}
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-title leading-tight tracking-tight text-stone-950 dark:text-stone-50">
              {data.name} 
              <span className="block text-2xl sm:text-3xl lg:text-4xl mt-3 text-stone-500 dark:text-stone-400 font-semibold font-title">
                {language === 'vi' ? 'Chuyên viên Hỗ trợ' : 'Professional'}{' '}
                <span className="text-brandGreen-700 dark:text-[#0df58b]">
                  {language === 'vi' ? 'Vay Vốn.' : 'Loan Specialist.'}
                </span>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-lg leading-relaxed">
              {data.slogan}
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-2">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-bold font-title text-xs sm:text-sm text-stone-950 bg-brandGreen-600 hover:bg-brandGreen-700 dark:bg-[#0df58b] dark:hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(13,245,139,0.3)] transition-all duration-300 text-white dark:text-stone-950"
                onClick={(e) => handleScrollToSection(e, 'contact')}
              >
                {data.ctaPrimary} <ArrowRight size={14} className="stroke-[2.5]" />
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-bold font-title text-xs sm:text-sm border border-stone-250 dark:border-stone-750 text-stone-700 dark:text-stone-200 hover:text-brandGreen-700 dark:hover:text-[#0df58b] hover:border-brandGreen-700 dark:hover:border-[#0df58b] transition-all duration-300 bg-transparent"
                onClick={(e) => handleScrollToSection(e, 'contact')}
              >
                <MessageSquare size={14} /> {data.ctaSecondary}
              </a>
              <button 
                onClick={handleSlowScroll}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-bold font-title text-xs sm:text-sm border border-stone-250 dark:border-stone-750 text-stone-700 dark:text-stone-200 hover:text-brandGreen-700 dark:hover:text-[#0df58b] hover:border-brandGreen-700 dark:hover:border-[#0df58b] transition-all duration-300 bg-transparent cursor-pointer"
              >
                {data.ctaScroll}
              </button>
            </div>
          </div>
 
          {/* Right Hero Portrait Image Column */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none reveal reveal-right delay-200">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] rounded-3xl overflow-hidden bg-white dark:bg-[#111827]/40 shadow-2xl group border border-stone-200 dark:border-stone-800 transition-colors duration-300">
              {/* Hex grid pattern overlay */}
              <div className="absolute inset-0 opacity-10 hex-grid-pattern mix-blend-overlay" />
              
              {/* Decorative Hexagon outlines */}
              <svg className="absolute -top-10 -right-10 w-40 h-40 text-stone-200 dark:text-white/5" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 100 100">
                <polygon points="50,1 95,25 95,75 50,99 5,75 5,25" />
              </svg>
              <svg className="absolute -bottom-10 -left-10 w-40 h-40 text-stone-200 dark:text-white/5" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 100 100">
                <polygon points="50,1 95,25 95,75 50,99 5,75 5,25" />
              </svg>

              {/* Grid dots decoration overlay */}
              <div className="absolute bottom-16 right-8 w-24 h-24 opacity-15 bg-[radial-gradient(#888888_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />

              {/* The actual avatar image */}
              <img 
                src={data.avatar} 
                alt={data.name} 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full object-cover object-top transition-transform duration-750 group-hover:scale-[1.03]"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600";
                }}
              />
              
              {/* Curved bottom cover wave (matches next section background) */}
              <div className="absolute bottom-0 left-0 w-full z-10 pointer-events-none">
                <svg className="w-full text-white dark:text-[#090d16] fill-current transition-colors duration-300" viewBox="0 0 400 60" preserveAspectRatio="none">
                  <path d="M0,30 C150,90 250,-30 400,30 L400,60 L0,60 Z" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
