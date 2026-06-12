import React, { useState } from 'react';
import { Calendar, Play, ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Blog({ language }) {
  const data = portfolioData[language].blog;
  const [activeTab, setActiveTab] = useState('news');

  return (
    <section id="blog" className="py-20 lg:py-28 bg-stone-100/40 dark:bg-stone-900/20">
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

        {/* Category Tab Buttons */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap reveal reveal-scale delay-100">
          <button 
            className={`px-5 py-2.5 rounded-full border text-xs font-bold font-title transition-all duration-300 ${
              activeTab === 'news' 
                ? 'bg-brandBlue-600 dark:bg-brandBlue-500 text-white border-brandBlue-600' 
                : 'bg-brandBeige-50 dark:bg-stone-900/40 border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:bg-brandBlue-50 dark:hover:bg-brandBlue-900/20 hover:text-brandBlue-600 dark:hover:text-brandBlue-400'
            }`}
            onClick={() => setActiveTab('news')}
          >
            {data.tabs.news}
          </button>
          <button 
            className={`px-5 py-2.5 rounded-full border text-xs font-bold font-title transition-all duration-300 ${
              activeTab === 'guide' 
                ? 'bg-brandBlue-600 dark:bg-brandBlue-500 text-white border-brandBlue-600' 
                : 'bg-brandBeige-50 dark:bg-stone-900/40 border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:bg-brandBlue-50 dark:hover:bg-brandBlue-900/20 hover:text-brandBlue-600 dark:hover:text-brandBlue-400'
            }`}
            onClick={() => setActiveTab('guide')}
          >
            {data.tabs.guide}
          </button>
          <button 
            className={`px-5 py-2.5 rounded-full border text-xs font-bold font-title transition-all duration-300 ${
              activeTab === 'videos' 
                ? 'bg-brandBlue-600 dark:bg-brandBlue-500 text-white border-brandBlue-600' 
                : 'bg-brandBeige-50 dark:bg-stone-900/40 border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:bg-brandBlue-50 dark:hover:bg-brandBlue-900/20 hover:text-brandBlue-600 dark:hover:text-brandBlue-400'
            }`}
            onClick={() => setActiveTab('videos')}
          >
            {data.tabs.videos}
          </button>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeTab === 'news' && data.news.map((item, index) => (
            <div className={`bg-brandBeige-50 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800/85 rounded-2xl overflow-hidden shadow-sm flex flex-col group reveal reveal-scale premium-card-hover ${index % 3 === 0 ? 'delay-100' : index % 3 === 1 ? 'delay-200' : 'delay-300'}`} key={item.id}>
              <div className="relative aspect-[16/9] w-full bg-stone-100 dark:bg-stone-900 overflow-hidden">
                <span className="absolute top-3 left-3 bg-brandBlue-100 dark:bg-brandBlue-900/60 text-brandBlue-700 dark:text-brandBlue-300 text-[10px] font-title font-bold px-2.5 py-1 rounded-md z-10">
                  {item.readTime}
                </span>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=600";
                  }}
                />
              </div>
              <div className="p-6 flex flex-col gap-3 flex-grow">
                <div className="flex items-center gap-1.5 text-xs text-stone-400 dark:text-stone-500 font-medium">
                  <Calendar size={12} />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-base font-title font-bold text-stone-900 dark:text-stone-50 leading-snug group-hover:text-brandBlue-600 dark:group-hover:text-brandBlue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
                <a href="#contact" className="inline-flex items-center gap-1 text-xs font-bold text-brandBlue-600 dark:text-brandBlue-400 hover:underline mt-auto self-start" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                }}>
                  {language === 'vi' ? 'Đăng ký tư vấn chủ đề này' : 'Consult about this topic'} <ArrowRight size={12} />
                </a>
              </div>
            </div>
          ))}

          {activeTab === 'guide' && data.guide.map((item, index) => (
            <div className={`bg-brandBeige-50 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800/85 rounded-2xl overflow-hidden shadow-sm flex flex-col group reveal reveal-scale premium-card-hover ${index % 3 === 0 ? 'delay-100' : index % 3 === 1 ? 'delay-200' : 'delay-300'}`} key={item.id}>
              <div className="relative aspect-[16/9] w-full bg-stone-100 dark:bg-stone-900 overflow-hidden">
                <span className="absolute top-3 left-3 bg-brandBlue-100 dark:bg-brandBlue-900/60 text-brandBlue-700 dark:text-brandBlue-300 text-[10px] font-title font-bold px-2.5 py-1 rounded-md z-10">
                  {item.readTime}
                </span>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600";
                  }}
                />
              </div>
              <div className="p-6 flex flex-col gap-3 flex-grow">
                <div className="flex items-center gap-1.5 text-xs text-stone-400 dark:text-stone-500 font-medium">
                  <Calendar size={12} />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-base font-title font-bold text-stone-900 dark:text-stone-50 leading-snug group-hover:text-brandBlue-600 dark:group-hover:text-brandBlue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
                <a href="#contact" className="inline-flex items-center gap-1 text-xs font-bold text-brandBlue-600 dark:text-brandBlue-400 hover:underline mt-auto self-start" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                }}>
                  {language === 'vi' ? 'Nhận tài liệu chi tiết' : 'Get detailed guide'} <ArrowRight size={12} />
                </a>
              </div>
            </div>
          ))}

          {activeTab === 'videos' && data.videos.map((item, index) => (
            <div className={`bg-brandBeige-50 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800/85 rounded-2xl overflow-hidden shadow-sm flex flex-col group reveal reveal-scale premium-card-hover ${index % 3 === 0 ? 'delay-100' : index % 3 === 1 ? 'delay-200' : 'delay-300'}`} key={item.id}>
              <div className="relative aspect-[16/9] w-full bg-stone-100 dark:bg-stone-900 overflow-hidden">
                {/* Play button overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-brandGreen-600 text-white flex items-center justify-center shadow-lg transition-all duration-300 z-10 group-hover:scale-110 group-hover:bg-brandBlue-600">
                  <Play size={16} fill="currentColor" className="ml-0.5" />
                </div>
                {/* Dark image filter overlay */}
                <div className="absolute inset-0 bg-black/20 z-0" />
                <span className="absolute bottom-2.5 right-2.5 bg-black/70 text-white px-2 py-0.5 rounded text-[10px] font-title font-bold z-10">
                  {item.duration}
                </span>
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600";
                  }}
                />
              </div>
              <div className="p-6 flex flex-col gap-3 flex-grow">
                <h3 className="text-base font-title font-bold text-stone-900 dark:text-stone-50 leading-snug group-hover:text-brandBlue-600 dark:group-hover:text-brandBlue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-3">
                  {item.desc}
                </p>
                <a href="#contact" className="inline-flex items-center gap-1 text-xs font-bold text-brandBlue-600 dark:text-brandBlue-400 hover:underline mt-auto self-start" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                }}>
                  {language === 'vi' ? 'Xem tư vấn 1-1 trực tiếp' : 'Book 1-on-1 discussion'} <ArrowRight size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
