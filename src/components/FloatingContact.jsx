import { Phone, MessageCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function FloatingContact({ language }) {
  const data = portfolioData[language].contact;
  const phoneClean = data.phone.replace(/\s+/g, '');

  return (
    <div className="fixed bottom-6 right-6 z-[2000] flex flex-col gap-3">
      {/* Zalo Button */}
      <a 
        href={data.socials.zalo} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#0068ff] text-white flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 relative group"
        aria-label="Chat Zalo"
      >
        {/* Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-stone-900/90 dark:bg-stone-800/90 text-white text-xs font-bold font-title px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md">
          {language === 'vi' ? 'Chat Zalo ngay' : 'Chat on Zalo'}
        </span>
        
        <div className="flex flex-col items-center justify-center">
          <MessageCircle size={20} className="stroke-[2.5]" />
          <span className="text-[9px] font-bold tracking-tighter leading-none mt-0.5">ZALO</span>
        </div>
      </a>

      {/* Phone Button */}
      <a 
        href={`tel:${phoneClean}`}
        className="w-14 h-14 rounded-full bg-brandGreen-600 dark:bg-[#0df58b] text-white dark:text-stone-950 flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-[0_0_20px_rgba(13,245,139,0.4)] transition-all duration-300 relative group"
        aria-label="Call Phone"
      >
        {/* Pulse animations */}
        <span className="absolute inset-0 rounded-full bg-brandGreen-600/30 dark:bg-[#0df58b]/30 animate-ping opacity-75 -z-10" />
        
        {/* Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-white dark:bg-[#111827] border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 text-xs font-bold font-title px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md">
          {language === 'vi' ? `Gọi ngay: ${data.phone}` : `Call: ${data.phone}`}
        </span>
        
        <div className="flex flex-col items-center justify-center">
          <Phone size={20} className="stroke-[2.5] animate-wiggle" />
          <span className="text-[9px] font-bold tracking-tighter leading-none mt-0.5">CALL</span>
        </div>
      </a>
    </div>
  );
}
