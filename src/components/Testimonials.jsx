import { Star } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Testimonials({ language }) {
  const data = portfolioData[language].testimonials;

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[#fdfbf7] dark:bg-[#090d16] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-[#0df58b]/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="block font-title text-brandGreen-700 dark:text-[#0df58b] text-xs font-bold uppercase tracking-[0.25em] mb-3">
            {data.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-title font-bold text-stone-950 dark:text-stone-50">
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
                className={`bg-white dark:bg-[#111827]/40 border border-stone-200 dark:border-stone-850 p-6 md:p-8 rounded-3xl text-center flex flex-col items-center gap-5 relative overflow-hidden reveal reveal-scale premium-card-hover ${delayClass}`}
              >
              {/* Quote watermark */}
              <span className="absolute top-2 left-6 text-8xl font-serif text-brandGreen-600/5 dark:text-[#0df58b]/5 select-none pointer-events-none leading-none">
                “
              </span>
              
              {/* Stars rating */}
              <div className="flex justify-center gap-1.5 text-amber-400 z-10">
                {[...Array(item.stars)].map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" stroke="none" />
                ))}
              </div>

              {/* Testimonial Quote */}
              <p className="text-sm italic text-stone-600 dark:text-stone-300 leading-relaxed z-10 flex-grow">
                "{item.text}"
              </p>

              {/* Author Information */}
              <div className="flex items-center justify-center gap-3 mt-2 pt-4 border-t border-stone-200 dark:border-stone-850 w-full z-10">
                <img 
                  src={item.avatar} 
                  alt={item.author} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-brandGreen-600/30 dark:border-[#0df58b]/30 bg-stone-900"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150";
                  }}
                />
                <div className="text-left">
                  <h4 className="font-bold text-xs text-stone-900 dark:text-stone-50">
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
