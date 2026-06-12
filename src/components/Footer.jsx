import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Footer({ language }) {
  const t = portfolioData[language].nav;
  const currentYear = new Date().getFullYear();

  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-stone-100/60 dark:bg-[#070605] border-t border-stone-200 dark:border-stone-900 py-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <a 
              href="#home" 
              className="font-title font-bold text-xl text-brandBlue-600 dark:text-brandBlue-50"
              onClick={(e) => handleScrollToSection(e, 'home')}
            >
              Port<span className="text-brandGreen-600">folio</span>
            </a>
            <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed max-w-sm">
              {language === 'vi' 
                ? 'Đồng hành cùng bạn trên hành trình hoạch định tài chính và tiếp cận nguồn vốn ngân hàng an toàn, hiệu quả.'
                : 'Accompanying you on the journey of financial planning and accessing safe, efficient bank capital.'
              }
            </p>
          </div>

          {/* Disclaimer Col */}
          <div className="md:col-span-6 md:col-start-7">
            <div className="bg-brandBeige-50 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 p-5 rounded-xl">
              <h5 className="text-[10px] font-bold font-title text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2 leading-none">
                {language === 'vi' ? 'Tuyên bố miễn trừ trách nhiệm' : 'Disclaimer'}
              </h5>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
                {language === 'vi'
                  ? 'Mọi thông tin tư vấn, hạn mức vay và lãi suất ước tính trên website này chỉ mang tính chất tham khảo. Quyết định phê duyệt khoản vay, lãi suất áp dụng và các điều kiện tín dụng cuối cùng hoàn toàn thuộc thẩm quyền của Ngân hàng cung cấp dịch vụ.'
                  : 'All consulting details, credit limits, and estimated rates on this website are for reference. Final credit approval decisions, interest rates, and loan terms are strictly determined by the providing Bank.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-stone-200 dark:border-stone-900 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-400 dark:text-stone-500 gap-4 ">
          <p>© {currentYear} Nguyen Van A. All rights reserved.</p>
          <p>Hotline: 0909 123456 - Email: nguyenvana@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}
