import React from 'react';
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

  return (
    <section id="home" className="pt-24 lg:pt-32 pb-16 min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Hero Details */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left reveal reveal-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-title font-bold leading-tight tracking-tight text-stone-900 dark:text-stone-50">
              <span className="block text-brandBlue-600 dark:text-brandBlue-500 mb-1">{data.name}</span>
              {data.title}
            </h1>
            <p className="text-base md:text-lg text-stone-600 dark:text-stone-400 max-w-xl">
              {data.slogan}
            </p>
            
            <div className="flex flex-wrap gap-4 mt-2">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold font-title text-sm text-white bg-gradient-to-r from-brandBlue-600 to-brandBlue-700 hover:from-brandBlue-700 hover:to-brandBlue-800 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                onClick={(e) => handleScrollToSection(e, 'contact')}
              >
                {data.ctaPrimary} <ArrowRight size={16} />
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold font-title text-sm border-2 border-stone-200 dark:border-stone-800 hover:border-brandBlue-500 text-stone-700 dark:text-stone-300 hover:text-brandBlue-600 dark:hover:text-brandBlue-400 hover:bg-brandBlue-50/10 transition-all duration-300 hover:-translate-y-0.5"
                onClick={(e) => handleScrollToSection(e, 'contact')}
              >
                <MessageSquare size={16} /> {data.ctaSecondary}
              </a>
            </div>
 
            {/* Visual Numbers */}
            <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-stone-200 dark:border-stone-800/80">
              {data.stats.map((stat, i) => (
                <div className="flex flex-col" key={i}>
                  <span className="font-title font-bold text-2xl md:text-3xl lg:text-4xl text-brandGreen-600">
                    {stat.value}
                  </span>
                  <span className="text-xs text-stone-500 dark:text-stone-400 mt-1 font-medium leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
 
          {/* Right Hero Portrait Image */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none reveal reveal-right delay-200">
            <img 
              src={data.avatar} 
              alt={data.name} 
              className="w-full aspect-[4/5] object-cover rounded-2xl shadow-2xl transition-all duration-500 bg-stone-100 dark:bg-stone-900 hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
