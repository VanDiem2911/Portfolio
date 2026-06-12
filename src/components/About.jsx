import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function About({ language }) {
  const data = portfolioData[language].about;

  return (
    <section id="about" className="py-20 lg:py-28 bg-stone-100/40 dark:bg-stone-900/20">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Image */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none reveal reveal-left">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border border-stone-200 dark:border-stone-850 premium-card-hover">
              <img 
                src={data.avatar} 
                alt={data.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600";
                }}
              />
            </div>
          </div>

          {/* Right Column: Bio & Timeline */}
          <div className="lg:col-span-7 flex flex-col gap-6 reveal reveal-right delay-200">
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
              {data.intro}
            </p>
            
            <div className="bg-brandBlue-50 dark:bg-brandBlue-900/10 border-l-4 border-brandBlue-600 dark:border-brandBlue-500 p-5 rounded-r-xl">
              <h4 className="font-title font-bold text-brandBlue-700 dark:text-brandBlue-400 mb-1.5 text-base">
                {data.missionTitle}
              </h4>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                {data.missionText}
              </p>
            </div>

            <h3 className="text-xl font-bold font-title border-b border-stone-200 dark:border-stone-800 pb-2 mt-6 text-stone-800 dark:text-stone-200">
              {data.timelineTitle}
            </h3>
            
            <div className="relative pl-6 border-l border-stone-200 dark:border-stone-800 space-y-8 mt-6">
              {data.timeline.map((item, i) => (
                <div className="relative group" key={i}>
                  {/* Timeline bullet dot */}
                  <div className="absolute -left-[30px] top-1.5 w-2.5 h-2.5 rounded-full bg-brandGreen-600 border-2 border-brandBeige-50 dark:border-brandBeige-950 group-hover:bg-brandBlue-600 group-hover:scale-125 transition-all duration-300" />
                  
                  <span className="font-title text-xs font-bold text-brandGreen-600 block mb-1">
                    {item.year}
                  </span>
                  <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 leading-snug">
                    {item.role}
                  </h4>
                  <span className="text-xs text-stone-500 dark:text-stone-400 italic block mt-0.5">
                    {item.place}
                  </span>
                  <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
