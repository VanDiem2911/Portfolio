import React from 'react';
import { Star } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Testimonials({ language }) {
  const data = portfolioData[language].testimonials;

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white dark:bg-[#0c0a09]">
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

        {/* 3-Column Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.list.map((item, index) => {
            const delayClass = index === 0 ? 'delay-100' : index === 1 ? 'delay-200' : 'delay-300';
            return (
              <div 
                key={index} 
                className={`bg-brandBeige-50/50 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800/80 p-6 md:p-8 rounded-3xl shadow-sm text-center flex flex-col items-center gap-5 relative overflow-hidden reveal reveal-scale premium-card-hover ${delayClass}`}
              >
              {/* Quote watermark */}
              <span className="absolute top-4 left-6 text-7xl font-sans text-brandBlue-100 dark:text-brandBlue-900/10 select-none pointer-events-none leading-none opacity-60">
                “
              </span>
              
              {/* Stars rating */}
              <div className="flex justify-center gap-1.5 text-amber-400 z-10">
                {[...Array(item.stars)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" stroke="none" />
                ))}
              </div>

              {/* Testimonial Quote */}
              <p className="text-sm italic text-stone-700 dark:text-stone-300 leading-relaxed z-10 flex-grow">
                "{item.text}"
              </p>

              {/* Author Information */}
              <div className="flex items-center justify-center gap-3 mt-2 pt-4 border-t border-stone-200/60 dark:border-stone-800/60 w-full z-10">
                <img 
                  src={item.avatar} 
                  alt={item.author} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-brandBlue-600 dark:border-brandBlue-500 bg-stone-100 dark:bg-stone-900"
                />
                <div className="text-left">
                  <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100">
                    {item.author}
                  </h4>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400">
                    {item.role}
                  </span>
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>
    </section>
  );
}
