import React from 'react';
import { Award } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Achievements({ language }) {
  const data = portfolioData[language].achievements;

  return (
    <section id="achievements" className="py-20 lg:py-28 bg-stone-100/40 dark:bg-stone-900/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="block font-title text-brandGreen-600 dark:text-brandGreen-600 text-xs font-bold uppercase tracking-widest mb-2">
            {data.subtitle}
          </span>
          <h2 className="inline-block text-3xl md:text-4xl font-title font-bold text-stone-900 dark:text-stone-50 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-brandBlue-600 dark:after:bg-brandBlue-500 after:rounded">
            {data.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Side: Stats Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data.stats.map((stat, i) => (
              <div 
                className={`bg-brandBeige-50 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800/80 p-8 rounded-2xl shadow-sm text-center reveal reveal-scale premium-card-hover ${i % 2 === 0 ? 'delay-100' : 'delay-200'}`} 
                key={i}
              >
                <div className="font-title font-bold text-3xl md:text-4xl text-brandGreen-600 mb-1">
                  {stat.value}
                  <span className="text-lg font-body font-medium text-stone-500 dark:text-stone-400 ml-0.5">
                    {stat.suffix}
                  </span>
                </div>
                <div className="text-xs md:text-sm font-medium text-stone-500 dark:text-stone-400 leading-snug">
                  {data.stats[i].label}
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Certs & Awards */}
          <div className="lg:col-span-6 flex flex-col gap-6 reveal reveal-right delay-200">
            <h3 className="text-xl font-bold font-title text-stone-900 dark:text-stone-100 border-b border-stone-200 dark:border-stone-800 pb-2 mb-2">
              {language === 'vi' ? 'Chứng nhận tiêu biểu' : 'Featured Credentials'}
            </h3>
            <div className="flex flex-col gap-4">
              {data.certs.map((cert, idx) => (
                <div 
                  className="bg-brandBeige-50 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800/80 p-4 rounded-xl flex items-center gap-4 hover:translate-x-1.5 hover:shadow-sm hover:border-brandBlue-600 dark:hover:border-brandBlue-500 transition-all duration-300" 
                  key={idx}
                >
                  <div className="w-12 h-12 rounded-lg bg-brandBlue-50 dark:bg-brandBlue-950/20 border border-stone-200 dark:border-stone-800 text-brandBlue-600 dark:text-brandBlue-400 flex items-center justify-center flex-shrink-0">
                    <Award size={24} />
                  </div>
                  <div className="flex-grow">
                    <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100 leading-snug">
                      {cert.title}
                    </h5>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                      {cert.issuer} • <strong className="font-semibold text-brandGreen-600">{cert.year}</strong>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
