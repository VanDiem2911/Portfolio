import { portfolioData } from '../data/portfolioData';
import BrandLogo from './BrandLogo';

export default function Footer({ language }) {
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

  const name = portfolioData[language].hero.name;

  return (
    <footer className="bg-[#fdfbf7] dark:bg-[#090d16] border-t border-stone-200 dark:border-stone-850 text-left items-center">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <a 
              href="#home" 
              className="group self-start"
              onClick={(e) => handleScrollToSection(e, 'home')}
              aria-label={language === 'vi' ? 'Phạm Thị Thu — Trang chủ' : 'Pham Thi Thu — Home'}
            >
              <BrandLogo imageClassName="h-[75px] md:h-[200px]" />
            </a>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-sm">
              {language === 'vi' 
                ? 'Đồng hành cùng bạn trên hành trình hoạch định tài chính và tiếp cận nguồn vốn ngân hàng an toàn, hiệu quả.'
                : 'Accompanying you on the journey of financial planning and accessing safe, efficient bank capital.'
              }
            </p>
          </div>

          {/* Disclaimer Col */}
          <div className="md:col-span-6 md:col-start-7 pt-24 pb-8">
            <div className="bg-white dark:bg-[#111827]/40 border border-stone-200 dark:border-stone-850 p-5 rounded-xl shadow-sm text-center">
              <h5 className="text-[10px] font-bold font-title text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2 leading-none">
                {language === 'vi' ? 'Tuyên bố miễn trừ trách nhiệm' : 'Disclaimer'}
              </h5>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                {language === 'vi'
                  ? 'Mọi thông tin tư vấn, hạn mức vay và lãi suất ước tính trên website này chỉ mang tính chất tham khảo. Quyết định phê duyệt khoản vay, lãi suất áp dụng và các điều kiện tín dụng cuối cùng hoàn toàn thuộc thẩm quyền của Ngân hàng cung cấp dịch vụ.'
                  : 'All consulting details, credit limits, and estimated rates on this website are for reference. Final credit approval decisions, interest rates, and loan terms are strictly determined by the providing Bank.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-stone-200 dark:border-stone-850 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500 dark:text-stone-500 gap-4 ">
          <div className="flex items-center gap-3.5">
            <p>© {currentYear} {name}. All rights reserved.</p>
            <span className="hidden sm:inline text-stone-300 dark:text-stone-800">•</span>
            <a 
              href="#/admin/login" 
              className="hover:text-brandGreen-700 dark:hover:text-[#0df58b] transition-colors font-title font-bold uppercase tracking-wider text-[9px] bg-stone-100 dark:bg-[#161d2d] px-2.5 py-1 rounded-md border border-stone-200 dark:border-stone-800/80"
            >
              {language === 'vi' ? 'Quản trị' : 'Admin Portal'}
            </a>
          </div>
          <p>Hotline: {portfolioData[language].contact.phone} - Email: {portfolioData[language].contact.email}</p>
        </div>
      </div>
    </footer>
  );
}
