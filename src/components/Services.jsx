import React from 'react';
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
    <section id="services" className="py-20 lg:py-28 bg-white dark:bg-brandBeige-950">
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

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((service, index) => {
            const IconComponent = iconMap[service.icon] || ShieldAlert;
            const delayClass = index % 3 === 0 ? 'delay-100' : index % 3 === 1 ? 'delay-200' : 'delay-300';
            return (
              <div 
                className={`relative bg-brandBeige-50 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800/80 p-8 rounded-2xl shadow-sm flex flex-col gap-5 overflow-hidden group reveal reveal-scale premium-card-hover ${delayClass}`}
                key={service.id}
              >
                {/* Top slide hover line */}
                <span className="absolute top-0 left-0 w-full h-[4px] bg-brandBlue-600 dark:bg-brandBlue-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                
                {/* Service Icon */}
                <div className="w-14 h-14 rounded-xl bg-brandBlue-50 dark:bg-brandBlue-950/30 text-brandBlue-600 dark:text-brandBlue-400 flex items-center justify-center group-hover:bg-brandBlue-600 group-hover:text-white transition-all duration-300">
                  <IconComponent size={24} />
                </div>
                
                {/* Text Content */}
                <h3 className="text-lg font-title font-bold text-stone-900 dark:text-stone-50">
                  {service.name}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                  {service.desc}
                </p>
                
                {/* Detail Points */}
                <div className="border-t border-stone-200 dark:border-stone-800/60 pt-4 mt-auto flex flex-col gap-2.5">
                  {service.details.map((detail, idx) => (
                    <div className="flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-300 font-medium" key={idx}>
                      <Check size={14} className="text-brandGreen-600 flex-shrink-0 mt-0.5" />
                      <span className="leading-normal">{detail}</span>
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
