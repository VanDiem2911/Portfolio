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
      className="relative pt-24 pb-20 lg:py-0 min-h-[100dvh] flex items-center bg-white dark:bg-[#0c101b] text-stone-900 dark:text-white overflow-hidden w-full border-b border-stone-200 dark:border-stone-850 transition-colors duration-300"
    >
      {/* Background split panel for desktop */}
      <div className="absolute right-0 top-0 h-full w-[40%] bg-[#0df58b] hidden lg:block z-0 lg:border-r-[16px] lg:border-white" />

      {/* Floating decorative shapes - Left Side */}
      {/* Outlined Triangle */}
      <svg className="absolute top-[18%] left-[8%] w-10 h-10 text-stone-300 dark:text-stone-700/35 animate-float pointer-events-none z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12,2 22,22 2,22" />
      </svg>
      {/* Floating Hexagon */}
      <svg className="absolute bottom-[20%] left-[4%] w-14 h-14 text-stone-300 dark:text-stone-700/35 animate-float-slow pointer-events-none z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7v10l10 5 10-5V7z" />
      </svg>
      {/* Floating wavy line */}
      <svg className="absolute bottom-[12%] left-[25%] w-16 h-4 text-stone-300 dark:text-stone-700/35 pointer-events-none z-10" viewBox="0 0 60 10" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M0,5 Q7.5,10 15,5 T30,5 T45,5 T60,5" strokeLinecap="round" />
      </svg>

      {/* Floating decorative shapes - Right Side (within/near green panel) */}
      {/* Dot Grid */}
      <div className="absolute top-[20%] right-[10%] w-24 h-24 opacity-15 bg-[radial-gradient(#000000_2px,transparent_2px)] [background-size:12px_12px] hidden lg:block z-10 pointer-events-none" />
      {/* Floating Hexagon Outline on Green Panel */}
      <svg className="absolute bottom-[30%] right-[6%] w-24 h-24 text-stone-900/15 animate-float-delay pointer-events-none z-10 hidden lg:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7v10l10 5 10-5V7z" />
      </svg>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Hero Details */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left reveal reveal-left">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-brandGreen-700 dark:text-[#0df58b]">
              {language === 'vi' ? 'XIN CHÀO, TÔI LÀ' : "HELLO, I'M"}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold font-title leading-[1.05] tracking-tight text-stone-950 dark:text-white">
              {language === 'vi' ? 'Chuyên Viên' : 'Professional'}
              <span className="block text-brandGreen-700 dark:text-[#0df58b] mt-1">
                {language === 'vi' ? 'Hỗ Trợ Vay Vốn.' : 'Loan Specialist.'}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-lg leading-relaxed mt-2">
              {language === 'vi'
                ? 'Chào bạn, tôi là Nguyễn Văn A - Trưởng nhóm tư vấn tài chính chuyên nghiệp với hơn 5 năm kinh nghiệm. Đồng hành cùng khách hàng sở hữu ngôi nhà mơ ước và tiếp cận nguồn vốn kinh doanh tối ưu nhất.'
                : "Hi, I'm Nguyen Van A - a professional financial advisor & senior credit specialist based in Vietnam. Helping you secure the best mortgage rates and business capital solutions."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-brandGreen-600 text-white dark:bg-[#0df58b] dark:text-stone-950 hover:bg-stone-950 dark:hover:bg-white dark:hover:text-stone-950 font-bold font-title text-xs tracking-wider uppercase rounded-sm hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(13,245,139,0.35)] transition-all duration-300 shadow-md dark:shadow-none"
                onClick={(e) => handleScrollToSection(e, 'contact')}
              >
                {data.ctaPrimary} <ArrowRight size={14} className="ml-2 stroke-[2.5]" />
              </a>
            </div>
          </div>

          {/* Right Hero Portrait Image Column - Visible in flow on mobile, hidden on desktop */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none lg:opacity-0 lg:pointer-events-none">
            <div className="relative w-full h-[55vh] flex items-end justify-center">
              <img 
                src={data.avatar} 
                alt={data.name} 
                className="relative z-10 w-auto h-full max-h-full object-contain object-bottom select-none filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.25)]"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600";
                }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Absolute positioned profile cutout centered exactly on the vertical split boundary (60% mark) on desktop */}
      <div className="absolute bottom-20 left-[60%] -translate-x-1/2 z-10 w-full max-w-[380px] lg:max-w-[420px] xl:max-w-[460px] h-[75vh] xl:h-[80vh] hidden lg:flex items-end justify-center pointer-events-none">
        <div className="w-full h-full flex items-end justify-center reveal reveal-right delay-200">
          <img 
            src={data.avatar} 
            alt={data.name} 
            className="relative z-10 w-auto h-full max-h-full object-contain object-bottom select-none filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)] hover:scale-[1.02] transition-transform duration-500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600";
            }}
          />
        </div>
      </div>

      {/* Scroll Down to Explore Indicator */}
      <button
        onClick={handleSlowScroll}
        className="absolute bottom-10 left-6 hidden lg:flex items-center gap-4 px-5 py-3 rounded-full bg-white/90 dark:bg-[#111827]/90 backdrop-blur-sm border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-[#0df58b] hover:border-brandGreen-600/30 dark:hover:border-[#0df58b]/30 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer focus:outline-none z-10"
      >
        <div className="flex flex-col items-start leading-tight text-left">
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase">Scroll Down</span>
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-stone-400 dark:text-stone-600">to Explore</span>
        </div>
        <div className="w-[1px] h-7 bg-stone-200 dark:bg-stone-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-brandGreen-600 dark:bg-[#0df58b] animate-bounce" />
        </div>
      </button>
    </section>
  );
}
