import { Briefcase, Calendar, CheckCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function StatsStrip({ language }) {
  const data = portfolioData[language].hero.stats;
  
  // Clean custom icons for each stat
  const icons = [
    <Briefcase size={18} className="text-brandGreen-700 dark:text-brandGreen-600" />,
    <Calendar size={18} className="text-brandGreen-700 dark:text-brandGreen-600" />,
    <CheckCircle size={18} className="text-brandGreen-700 dark:text-brandGreen-600" />
  ];

  return (
    <section className="py-6 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white dark:bg-stone-900/30 backdrop-blur-md border border-stone-200 dark:border-stone-800/80 rounded-3xl shadow-sm p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-stone-200/60 dark:divide-stone-800/60">
          {data.map((stat, i) => (
            <div 
              className="flex items-center gap-4 px-2 md:px-6 py-4 md:py-0 transition-all duration-300 hover:translate-y-[-2px]" 
              key={i}
            >
              <div className="w-10 h-10 rounded-xl bg-brandGreen-50 dark:bg-brandGreen-950/20 flex items-center justify-center flex-shrink-0">
                {icons[i]}
              </div>
              <div className="flex flex-col text-left">
                <span className="font-mono font-bold text-2xl md:text-3xl text-stone-900 dark:text-stone-50 tracking-tight leading-none">
                  {stat.value}
                </span>
                <span className="text-xs text-stone-500 dark:text-stone-400 mt-2 font-medium tracking-wide">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
