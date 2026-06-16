import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const portfolioDataLocal = {
  vi: {
    title: "Dự án tiêu biểu",
    subtitle: "KẾT QUẢ HỖ TRỢ THỰC TẾ",
    categories: {
      all: "Tất cả",
      muanha: "Vay mua nhà",
      kinhdoanh: "Vay kinh doanh",
      tinchap: "Vay tiêu dùng",
      muaoto: "Vay mua ô tô"
    },
    items: [
      {
        id: 1,
        title: "Duyệt hồ sơ vay mua biệt thự Khang Điền Quận 9 (Hạn mức 15 tỷ)",
        category: "muanha",
        categoryLabel: "Vay mua nhà",
        image: "/images/finace.jpg",
        desc: "Hỗ trợ khách hàng cá nhân chứng minh nguồn thu nhập từ hoạt động kinh doanh tự do để giải ngân đúng tiến độ."
      },
      {
        id: 2,
        title: "Cấp hạn mức vốn lưu động 5 tỷ đồng cho hộ kinh doanh thời trang Quận 3",
        category: "kinhdoanh",
        categoryLabel: "Vay kinh doanh",
        image: "/images/finace1.jpg",
        desc: "Tối ưu hóa hồ sơ năng lực dòng tiền và hỗ trợ định giá tài sản thế chấp đạt giá trị cao nhất."
      },
      {
        id: 3,
        title: "Giải ngân nhanh gói tiêu dùng tín chấp 350 triệu trong 24 giờ",
        category: "tinchap",
        categoryLabel: "Vay tiêu dùng",
        image: "/images/finace2.jpg",
        desc: "Tư vấn hồ sơ sao kê lương và xếp hạng điểm tín dụng CIC tốt nhất để hưởng lãi suất ưu đãi tối đa."
      },
      {
        id: 4,
        title: "Tài trợ gói vay mua xe Mercedes C200 trả góp cá nhân (Hạn mức 1.2 tỷ)",
        category: "muaoto",
        categoryLabel: "Vay mua ô tô",
        image: "/images/portrait.jpg",
        desc: "Thủ tục xét duyệt siêu tốc, hỗ trợ ký giấy tờ giải ngân trực tiếp tại showroom trong ngày."
      },
      {
        id: 5,
        title: "Hỗ trợ tái cơ cấu gói vay mua căn hộ Vinhomes Grand Park 4.5 tỷ đồng",
        category: "muanha",
        categoryLabel: "Vay mua nhà",
        image: "/images/about_avatar.jpg",
        desc: "Chuyển đổi gói vay từ ngân hàng cũ sang ngân hàng liên kết mới với mức lãi suất thả nổi giảm 2.5%/năm."
      },
      {
        id: 6,
        title: "Cấp hạn mức vay đầu tư thiết bị xưởng cơ khí sản xuất Bình Dương (8 tỷ)",
        category: "kinhdoanh",
        categoryLabel: "Vay kinh doanh",
        image: "/images/finace.jpg",
        desc: "Thiết kế phương án kinh doanh và cơ chế ân hạn nợ gốc phù hợp với chu kỳ thu hồi vốn của doanh nghiệp."
      }
    ]
  },
  en: {
    title: "Portfolio",
    subtitle: "RECENT CASE STUDIES",
    categories: {
      all: "All",
      muanha: "Home Loans",
      kinhdoanh: "Business Loans",
      tinchap: "Consumer Loans",
      muaoto: "Car Loans"
    },
    items: [
      {
        id: 1,
        title: "Approved 15B VND Villa Purchase Loan in Khang Dien, District 9",
        category: "muanha",
        categoryLabel: "Home Loans",
        image: "/images/finace.jpg",
        desc: "Assisted client with self-employed income proof to secure disbursement on target schedule."
      },
      {
        id: 2,
        title: "Granted 5B VND Working Capital Limit for Fashion Store in District 3",
        category: "kinhdoanh",
        categoryLabel: "Business Loans",
        image: "/images/finace1.jpg",
        desc: "Optimized cash flow proofing and achieved maximum valuation for collateral property."
      },
      {
        id: 3,
        title: "Disbursed 350M VND Unsecured Personal Loan in 24 Hours",
        category: "tinchap",
        categoryLabel: "Consumer Loans",
        image: "/images/finace2.jpg",
        desc: "Provided CIC score consultation to achieve the absolute lowest interest rate tier."
      },
      {
        id: 4,
        title: "Funded Mercedes C200 Personal Purchase Loan (1.2B VND Limit)",
        category: "muaoto",
        categoryLabel: "Car Loans",
        image: "/images/portrait.jpg",
        desc: "Ultra-fast approval process with documents signed directly at the dealership showroom."
      },
      {
        id: 5,
        title: "Refinanced 4.5B VND Vinhomes Apartment Loan with Better Rates",
        category: "muanha",
        categoryLabel: "Home Loans",
        image: "/images/about_avatar.jpg",
        desc: "Transferred existing loan to a partner bank, slashing floating interest rate by 2.5% p.a."
      },
      {
        id: 6,
        title: "Secured 8B VND Equipment Loan for Machinery Workshop in Binh Duong",
        category: "kinhdoanh",
        categoryLabel: "Business Loans",
        image: "/images/finace.jpg",
        desc: "Designed customized financial plans matching business recovery and seasonal cash flow."
      }
    ]
  }
};

export default function Portfolio({ language }) {
  const data = portfolioDataLocal[language];
  const [activeFilter, setActiveFilter] = useState('all');
  const scrollContainerRef = useRef(null);

  const filteredItems = activeFilter === 'all'
    ? data.items
    : data.items.filter(item => item.category === activeFilter);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-white dark:bg-[#090d16] relative overflow-hidden transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-[#0df58b]/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block with Title on left, Filters in middle, and Arrows on right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 reveal">
          <div className="text-left">
            <span className="block font-title text-brandGreen-700 dark:text-[#0df58b] text-xs font-bold uppercase tracking-[0.25em] mb-3">
              {data.subtitle}
            </span>
            <h2 className="text-3xl md:text-5xl font-title font-bold text-stone-950 dark:text-stone-50">
              {data.title}
            </h2>
          </div>

          {/* Categories / Filters */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3 bg-stone-50 dark:bg-[#111827]/40 border border-stone-200 dark:border-stone-850/60 p-1.5 rounded-full">
            {Object.entries(data.categories).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-4 py-2 rounded-full text-xs font-bold font-title transition-all duration-300 ${
                  activeFilter === key
                    ? 'bg-brandGreen-600 dark:bg-[#0df58b] text-white dark:text-stone-950 shadow-[0_4px_12px_rgba(13,245,139,0.15)]'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white bg-transparent'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Slider Arrow Controls */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              className="w-10 h-10 rounded-full border border-stone-200 dark:border-stone-800 hover:border-brandGreen-600 dark:hover:border-[#0df58b] text-stone-600 dark:text-stone-400 hover:text-brandGreen-700 dark:hover:text-[#0df58b] flex items-center justify-center transition-all duration-300 cursor-pointer bg-transparent"
              aria-label="Previous cases"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-10 h-10 rounded-full border border-stone-200 dark:border-stone-800 hover:border-brandGreen-600 dark:hover:border-[#0df58b] text-stone-600 dark:text-stone-400 hover:text-brandGreen-700 dark:hover:text-[#0df58b] flex items-center justify-center transition-all duration-300 cursor-pointer bg-transparent"
              aria-label="Next cases"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Horizontal Layout / Grid Container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-8 pb-8 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredItems.map((item, idx) => (
            <div 
              key={item.id} 
              className="min-w-[280px] sm:min-w-[360px] md:min-w-[400px] max-w-[420px] snap-start bg-stone-50 dark:bg-[#111827]/40 border border-stone-200 dark:border-stone-850 rounded-3xl overflow-hidden shadow-sm flex flex-col group reveal reveal-scale premium-card-hover"
              style={{ transitionDelay: `${(idx % 3) * 100}ms` }}
            >
              {/* Project Card Image Frame */}
              <div className="relative aspect-[16/10] w-full bg-stone-900 overflow-hidden">
                <span className="absolute top-4 left-4 bg-white/95 dark:bg-[#111827]/90 backdrop-blur-md border border-brandGreen-600/20 dark:border-[#0df58b]/20 text-brandGreen-700 dark:text-[#0df58b] text-[10px] font-title font-bold px-3 py-1 rounded-md z-10 uppercase tracking-wider">
                  {item.categoryLabel}
                </span>
                
                {/* Image overlay element */}
                <div className="absolute inset-0 bg-brandGreen-600/0 group-hover:bg-brandGreen-600/10 dark:group-hover:bg-[#0df58b]/5 transition-colors duration-500 z-10" />

                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600";
                  }}
                />
              </div>

              {/* Card Contents */}
              <div className="p-6 sm:p-8 flex flex-col gap-3.5 flex-grow text-left">
                <h3 className="text-base sm:text-lg font-title font-bold text-stone-950 dark:text-stone-50 leading-snug group-hover:text-brandGreen-700 dark:group-hover:text-[#0df58b] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  {item.desc}
                </p>

                {/* Consultation link */}
                <a 
                  href="#contact" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brandGreen-700 dark:text-[#0df58b] hover:underline mt-auto self-start group/link"
                >
                  {language === 'vi' ? 'Nhận giải pháp tương tự' : 'Get a similar solution'}
                  <ExternalLink size={12} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
