import { ShieldAlert, Home, Car, TrendingUp, CreditCard } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const iconMap = {
  ShieldAlert: ShieldAlert,
  Home: Home,
  Car: Car,
  TrendingUp: TrendingUp,
  CreditCard: CreditCard
};

const caseCounters = {
  vi: {
    tinchap: "120+ HỒ SƠ THÀNH CÔNG",
    muanha: "85+ DỰ ÁN NHÀ Ở",
    muaoto: "95+ XE BÀN GIAO",
    kinhdoanh: "110+ DOANH NGHIỆP",
    thetindung: "150+ THẺ PHÁT HÀNH"
  },
  en: {
    tinchap: "120+ SUCCESSFUL CASES",
    muanha: "85+ HOUSING PROJECTS",
    muaoto: "95+ DELIVERED VEHICLES",
    kinhdoanh: "110+ BUSINESSES FUNDED",
    thetindung: "150+ CARDS ISSUED"
  }
};

export default function Services({ language }) {
  const data = portfolioData[language].services;

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#fdfbf7] dark:bg-[#0b0f19] relative overflow-hidden transition-colors duration-300">
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
      </div>

      {/* Infinite Scrolling Marquee Container */}
      <div className="relative overflow-hidden w-full flex py-4">
        <div className="animate-marquee hover:[animation-play-state:paused] flex gap-0">
          {/* List 1 */}
          <div className="flex gap-8 pr-8 shrink-0">
            {data.items.map((service) => {
              const IconComponent = iconMap[service.icon] || ShieldAlert;
              const counterText = caseCounters[language][service.id] || "100+ CASES";
              
              return (
                <div 
                  className="relative border border-stone-200 dark:border-stone-850 p-8 rounded-2xl flex flex-col gap-6 overflow-hidden transition-all duration-500 cursor-pointer w-[280px] sm:w-[360px] md:w-[400px] shrink-0 bg-white dark:bg-[#111827]/40 text-stone-900 dark:text-stone-50 hover:bg-brandGreen-600 dark:hover:bg-[#0df58b] hover:border-brandGreen-600 dark:hover:border-[#0df58b] hover:text-white hover:text-stone-955 dark:hover:text-stone-955 hover:shadow-[0_15px_30px_rgba(13,245,139,0.15)] hover:scale-[1.02] group/card"
                  key={`${service.id}-1`}
                >
                  {/* Service Icon Box */}
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 bg-brandGreen-600/10 dark:bg-[#0df58b]/10 text-brandGreen-700 dark:text-[#0df58b] group-hover/card:bg-stone-950 group-hover/card:text-[#0df58b]">
                    <IconComponent size={24} />
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex flex-col gap-3">
                    {/* Case Counter */}
                    <span className="text-[10px] font-bold font-title tracking-wider block transition-colors duration-500 text-brandGreen-700 dark:text-[#0df58b] group-hover/card:text-stone-200 dark:group-hover/card:text-stone-800">
                      {counterText}
                    </span>
                    
                    <h3 className="text-xl font-title font-bold leading-snug transition-colors duration-500 text-stone-900 dark:text-stone-50 group-hover/card:text-white hover:text-stone-955 dark:group-hover/card:text-stone-955">
                      {service.name}
                    </h3>
                    <p className="text-sm leading-relaxed transition-colors duration-500 text-stone-600 dark:text-stone-400 group-hover/card:text-stone-100 hover:text-stone-900 dark:group-hover/card:text-stone-900">
                      {service.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* List 2 (Duplicate for infinite seamless scroll) */}
          <div className="flex gap-8 pr-8 shrink-0" aria-hidden="true">
            {data.items.map((service) => {
              const IconComponent = iconMap[service.icon] || ShieldAlert;
              const counterText = caseCounters[language][service.id] || "100+ CASES";
              
              return (
                <div 
                  className="relative border border-stone-200 dark:border-stone-850 p-8 rounded-2xl flex flex-col gap-6 overflow-hidden transition-all duration-500 cursor-pointer w-[280px] sm:w-[360px] md:w-[400px] shrink-0 bg-white dark:bg-[#111827]/40 text-stone-900 dark:text-stone-50 hover:bg-brandGreen-600 dark:hover:bg-[#0df58b] hover:border-brandGreen-600 dark:hover:border-[#0df58b] hover:text-white hover:text-stone-955 dark:hover:text-stone-955 hover:shadow-[0_15px_30px_rgba(13,245,139,0.15)] hover:scale-[1.02] group/card"
                  key={`${service.id}-2`}
                >
                  {/* Service Icon Box */}
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 bg-brandGreen-600/10 dark:bg-[#0df58b]/10 text-brandGreen-700 dark:text-[#0df58b] group-hover/card:bg-stone-950 group-hover/card:text-[#0df58b]">
                    <IconComponent size={24} />
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex flex-col gap-3">
                    {/* Case Counter */}
                    <span className="text-[10px] font-bold font-title tracking-wider block transition-colors duration-500 text-brandGreen-700 dark:text-[#0df58b] group-hover/card:text-stone-200 dark:group-hover/card:text-stone-800">
                      {counterText}
                    </span>
                    
                    <h3 className="text-xl font-title font-bold leading-snug transition-colors duration-500 text-stone-900 dark:text-stone-50 group-hover/card:text-white hover:text-stone-955 dark:group-hover/card:text-stone-955">
                      {service.name}
                    </h3>
                    <p className="text-sm leading-relaxed transition-colors duration-500 text-stone-600 dark:text-stone-400 group-hover/card:text-stone-100 hover:text-stone-900 dark:group-hover/card:text-stone-900">
                      {service.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
