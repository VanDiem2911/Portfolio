import { Award } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Achievements({ language }) {
  const data = portfolioData[language].achievements;

  return (
    <section id="achievements" className="py-20 lg:py-28 bg-white dark:bg-[#090d16] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-[#0df58b]/5 rounded-full filter blur-[100px] pointer-events-none" />

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Side: Stats Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data.stats.map((stat, i) => (
              <div 
                className={`bg-stone-50 dark:bg-[#111827]/40 border border-stone-200 dark:border-stone-850 p-8 rounded-2xl text-center reveal reveal-scale premium-card-hover ${i % 2 === 0 ? 'delay-100' : 'delay-200'}`} 
                key={i}
              >
                <div className="font-title font-bold text-3xl md:text-4xl text-brandGreen-700 dark:text-[#0df58b] mb-1">
                  {stat.value}
                  <span className="text-base font-body font-medium text-stone-500 dark:text-stone-400 ml-1">
                    {stat.suffix}
                  </span>
                </div>
                <div className="text-xs md:text-sm font-semibold text-stone-600 dark:text-stone-400 leading-snug">
                  {data.stats[i].label}
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Certs & Awards */}
          <div className="lg:col-span-6 flex flex-col gap-6 reveal reveal-right delay-200 text-left">
            <h3 className="text-xl font-bold font-title text-stone-955 dark:text-stone-50 border-b border-stone-200 dark:border-stone-850 pb-3 mb-2">
              {language === 'vi' ? 'Chứng nhận tiêu biểu' : 'Featured Credentials'}
            </h3>
            <div className="flex flex-col gap-4">
              {data.certs.map((cert, idx) => (
                <div 
                  className="bg-stone-50 dark:bg-[#111827]/40 border border-stone-200 dark:border-stone-850 p-4 rounded-xl flex items-center gap-4 hover:translate-x-1.5 hover:border-brandGreen-600/30 dark:hover:border-[#0df58b]/30 transition-all duration-300" 
                  key={idx}
                >
                  <div className="w-12 h-12 rounded-lg bg-brandGreen-600/10 dark:bg-[#0df58b]/10 border border-brandGreen-600/20 dark:border-[#0df58b]/20 text-brandGreen-700 dark:text-[#0df58b] flex items-center justify-center flex-shrink-0">
                    <Award size={22} className="stroke-[2]" />
                  </div>
                  <div className="flex-grow">
                    <h5 className="font-bold text-sm text-stone-900 dark:text-stone-50 leading-snug">
                      {cert.title}
                    </h5>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                      {cert.issuer} • <strong className="font-semibold text-brandGreen-700 dark:text-[#0df58b]">{cert.year}</strong>
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
