import { ShieldAlert, Home, Car, TrendingUp, CreditCard, Check } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const iconMap = {
  ShieldAlert: ShieldAlert,
  Home: Home,
  Car: Car,
  TrendingUp: TrendingUp,
  CreditCard: CreditCard
};

export default function Services({ language }) {
  const data = portfolioData[language].services;

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#fdfbf7] dark:bg-[#0b0f19] relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#0df58b]/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="block font-title text-brandGreen-700 dark:text-[#0df58b] text-xs font-bold uppercase tracking-[0.25em] mb-3">
            {language === 'vi' ? 'DỊCH VỤ CỦA TÔI' : 'WHAT I WILL DO FOR YOU'}
          </span>
          <h2 className="text-3xl md:text-5xl font-title font-bold text-stone-950 dark:text-stone-50">
            {language === 'vi' ? 'Dịch vụ cung cấp' : 'Services'}
          </h2>
        </div>

        {/* Card Grid with group/list parent check */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center group/list">
          {data.items.map((service, index) => {
            const IconComponent = iconMap[service.icon] || ShieldAlert;
            const isFirst = index === 0;
            
            // Layout alignment for the last two cards to center-align them if they are on a new row
            const cardColSpan = index >= 3 ? 'lg:col-span-1 lg:first:col-start-2' : '';
            
            return (
              <div 
                className={`relative border p-8 rounded-2xl flex flex-col gap-6 overflow-hidden transition-all duration-500 cursor-pointer reveal reveal-scale group/card ${cardColSpan} ${
                  isFirst
                    ? 'bg-brandGreen-600 dark:bg-[#0df58b] border-brandGreen-600 dark:border-[#0df58b] text-white dark:text-stone-950 shadow-[0_15px_30px_rgba(13,245,139,0.15)] scale-[1.02] group-hover/list:bg-white dark:group-hover/list:bg-[#111827]/40 group-hover/list:border-stone-200 dark:group-hover/list:border-stone-850 group-hover/list:text-stone-900 dark:group-hover/list:text-stone-50 group-hover/list:shadow-none group-hover/list:scale-100 hover:!bg-brandGreen-600 dark:hover:!bg-[#0df58b] hover:!border-brandGreen-600 dark:hover:!border-[#0df58b] hover:!text-white dark:hover:!text-stone-950 hover:!shadow-[0_15px_30px_rgba(13,245,139,0.15)] hover:!scale-[1.02]' 
                    : 'bg-white dark:bg-[#111827]/40 border-stone-200 dark:border-stone-850 text-stone-900 dark:text-stone-50 hover:bg-brandGreen-600 dark:hover:bg-[#0df58b] hover:border-brandGreen-600 dark:hover:border-[#0df58b] hover:text-white dark:hover:text-stone-950 hover:shadow-[0_15px_30px_rgba(13,245,139,0.15)] hover:scale-[1.02]'
                }`}
                key={service.id}
              >
                {/* Service Icon Box */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
                  isFirst
                    ? 'bg-stone-950 text-brandGreen-600 dark:text-[#0df58b] group-hover/list:bg-brandGreen-600/10 dark:group-hover/list:bg-[#0df58b]/10 group-hover/list:text-brandGreen-700 dark:group-hover/list:text-[#0df58b] group-hover/card:!bg-stone-950 group-hover/card:!text-[#0df58b]'
                    : 'bg-brandGreen-600/10 dark:bg-[#0df58b]/10 text-brandGreen-700 dark:text-[#0df58b] group-hover/card:bg-stone-950 group-hover/card:text-[#0df58b]'
                }`}>
                  <IconComponent size={24} />
                </div>
                
                {/* Text Content */}
                <div className="flex flex-col gap-3">
                  <h3 className={`text-xl font-title font-bold leading-snug transition-colors duration-500 ${
                    isFirst
                      ? 'text-white dark:text-stone-950 group-hover/list:text-stone-900 dark:group-hover/list:text-stone-50 group-hover/card:!text-white dark:group-hover/card:!text-stone-950'
                      : 'text-stone-900 dark:text-stone-50 group-hover/card:text-white dark:group-hover/card:text-stone-950'
                  }`}>
                    {service.name}
                  </h3>
                  <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                    isFirst
                      ? 'text-stone-100 dark:text-stone-900 group-hover/list:text-stone-600 dark:group-hover/list:text-stone-450 group-hover/card:!text-stone-100 dark:group-hover/card:!text-stone-900'
                      : 'text-stone-600 dark:text-stone-400 group-hover/card:text-stone-100 dark:group-hover/card:text-stone-900'
                  }`}>
                    {service.desc}
                  </p>
                </div>
                
                {/* Detail Checklists */}
                <div className={`border-t pt-5 mt-auto flex flex-col gap-3 transition-colors duration-500 ${
                  isFirst
                    ? 'border-white/10 dark:border-stone-900/10 group-hover/list:border-stone-200 dark:group-hover/list:border-stone-850 group-hover/card:!border-white/10 dark:group-hover/card:!border-stone-900/10'
                    : 'border-stone-200 dark:border-stone-850 group-hover/card:border-white/10 dark:group-hover/card:border-stone-900/10'
                }`}>
                  {service.details.map((detail, idx) => (
                    <div className="flex items-start gap-3 text-xs font-semibold" key={idx}>
                      <Check size={14} className={`flex-shrink-0 mt-0.5 transition-colors duration-500 ${
                        isFirst
                          ? 'text-white dark:text-stone-950 group-hover/list:text-brandGreen-700 dark:group-hover/list:text-[#0df58b] group-hover/card:!text-white group-hover/card:!text-stone-950'
                          : 'text-brandGreen-700 dark:text-[#0df58b] group-hover/card:text-white dark:group-hover/card:text-stone-950'
                      }`} />
                      <span className={`leading-normal transition-colors duration-500 ${
                        isFirst
                          ? 'text-stone-100 dark:text-stone-900 group-hover/list:text-stone-600 dark:group-hover/list:text-stone-300 group-hover/card:!text-stone-100 dark:group-hover/card:!text-stone-900'
                          : 'text-stone-600 dark:text-stone-300 group-hover/card:text-stone-100 dark:group-hover/card:text-stone-900'
                      }`}>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
