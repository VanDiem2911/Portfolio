import { portfolioData } from '../data/portfolioData';

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
  const nameParts = name.split(' ');
  const monogram = nameParts[0] ? nameParts[0].charAt(0) : 'A';
  const restOfName = nameParts.slice(1).join(' ') || 'Van A';

  return (
    <footer className="bg-[#fdfbf7] dark:bg-[#090d16] border-t border-stone-200 dark:border-stone-850 py-16 pb-8 text-left">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <a 
              href="#home" 
              className="flex items-center gap-2.5 font-title font-bold text-lg text-stone-900 dark:text-white group self-start"
              onClick={(e) => handleScrollToSection(e, 'home')}
            >
              <span className="w-8 h-8 rounded-lg bg-brandGreen-600 dark:bg-[#0df58b] text-white dark:text-stone-950 flex items-center justify-center font-extrabold text-base transition-transform duration-300 group-hover:scale-105">
                {monogram}
              </span>
              <span className="tracking-tight text-stone-800 dark:text-white">
                {monogram}.<span className="text-brandGreen-700 dark:text-[#0df58b]">{restOfName}</span>
              </span>
            </a>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-sm">
              {language === 'vi' 
                ? 'Đồng hành cùng bạn trên hành trình hoạch định tài chính và tiếp cận nguồn vốn ngân hàng an toàn, hiệu quả.'
                : 'Accompanying you on the journey of financial planning and accessing safe, efficient bank capital.'
              }
            </p>
          </div>

          {/* Disclaimer Col */}
          <div className="md:col-span-6 md:col-start-7">
            <div className="bg-white dark:bg-[#111827]/40 border border-stone-200 dark:border-stone-850 p-5 rounded-xl shadow-sm">
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
          <p>© {currentYear} {name}. All rights reserved.</p>
          <p>Hotline: {portfolioData[language].contact.phone} - Email: {portfolioData[language].contact.email}</p>
        </div>
      </div>
    </footer>
  );
}
