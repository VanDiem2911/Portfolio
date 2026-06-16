import { portfolioData } from '../data/portfolioData';

const strengths = {
  vi: [
    { title: "Minh bạch tuyệt đối", desc: "Mọi thông tin về lãi suất, phí dịch vụ ngân hàng và điều khoản hợp đồng đều được giải thích rõ ràng, trung thực." },
    { title: "Xử lý hồ sơ siêu tốc", desc: "Tối ưu hóa quy trình thu thập và thẩm định giúp rút ngắn thời gian phê duyệt giải ngân chỉ từ 3 ngày làm việc." },
    { title: "Giải pháp may đo riêng", desc: "Thiết kế phương án vay vốn linh hoạt phù hợp nhất với dòng tiền và năng lực tài chính thực tế của từng khách hàng." },
    { title: "Đồng hành trọn đời", desc: "Hỗ trợ khách hàng trước, trong và cả sau khi giải ngân - tư vấn quản lý nợ vay hiệu quả trong suốt thời hạn vay." }
  ],
  en: [
    { title: "Absolute Transparency", desc: "All information about interest rates, banking fees, and contract terms is explained clearly and honestly." },
    { title: "Ultra-Fast Processing", desc: "Optimizing the collection and appraisal process helps shorten approval and disbursement time to just 3 business days." },
    { title: "Tailored Solutions", desc: "Design flexible loan options that best match the cash flow and actual financial capacity of each client." },
    { title: "Lifetime Partnership", desc: "Supporting clients before, during, and after disbursement - advising on effective debt management throughout the loan term." }
  ]
};

export default function About({ language }) {
  const data = portfolioData[language].about;
  const stats = portfolioData[language].hero.stats;

  return (
    <section id="about" className="py-20 lg:py-28 bg-white dark:bg-[#090d16] relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-[#0df58b]/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Image & Orbiting Stats Badges */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none flex justify-center items-center relative py-12 px-6 reveal reveal-left">
            {/* The Neon Green Morphing Blob Background Element */}
            <div className="absolute w-[80%] aspect-square bg-gradient-to-tr from-[#0df58b]/10 to-transparent rounded-full filter blur-xl opacity-60 animate-pulse" />

            {/* Hexagon decoration patterns */}
            <div className="absolute inset-0 opacity-15 pointer-events-none hex-grid-pattern" />

            {/* Main Image Frame (Organic morphing shape with green border) */}
            <div className="relative w-[280px] h-[350px] sm:w-[350px] sm:h-[450px] md:w-[380px] md:h-[490px] morphing-blob border-8 border-[#0df58b] bg-stone-100 dark:bg-[#16222f] overflow-hidden shadow-[0_0_50px_rgba(13,245,139,0.1)]">
              <img
                src={data.avatar}
                alt={data.title}
                className="w-full h-full object-cover object-[center_8%] scale-100"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600";
                }}
              />
            </div>

            {/* Floating Badges */}
            {/* Badge 1: Top Right */}
            {stats[1] && (
              <div className="absolute top-8 right-0 sm:right-4 bg-white/95 dark:bg-[#111827]/90 backdrop-blur-md border border-stone-200 dark:border-[#0df58b]/30 shadow-2xl rounded-2xl p-4 flex flex-col items-center text-center w-28 animate-float z-10">
                <span className="text-xl sm:text-2xl font-mono font-bold text-brandGreen-700 dark:text-[#0df58b]">{stats[1].value}</span>
                <span className="text-[10px] font-semibold text-stone-500 dark:text-stone-400 mt-1 leading-tight">{stats[1].label}</span>
              </div>
            )}

            {/* Badge 2: Bottom Left */}
            {stats[0] && (
              <div className="absolute bottom-12 left-0 sm:left-4 bg-white/95 dark:bg-[#111827]/90 backdrop-blur-md border border-stone-200 dark:border-[#0df58b]/30 shadow-2xl rounded-2xl p-4 flex flex-col items-center text-center w-32 animate-float-delay z-10">
                <span className="text-xl sm:text-2xl font-mono font-bold text-brandGreen-700 dark:text-[#0df58b]">{stats[0].value}</span>
                <span className="text-[10px] font-semibold text-stone-500 dark:text-stone-400 mt-1 leading-tight">{stats[0].label}</span>
              </div>
            )}

            {/* Badge 3: Bottom Right */}
            {stats[2] && (
              <div className="absolute bottom-6 right-0 sm:right-4 bg-white/95 dark:bg-[#111827]/90 backdrop-blur-md border border-stone-200 dark:border-[#0df58b]/30 shadow-2xl rounded-2xl p-4 flex flex-col items-center text-center w-28 animate-float-slow z-10">
                <span className="text-xl sm:text-2xl font-mono font-bold text-brandGreen-700 dark:text-[#0df58b]">{stats[2].value}</span>
                <span className="text-[10px] font-semibold text-stone-500 dark:text-stone-400 mt-1 leading-tight">{stats[2].label}</span>
              </div>
            )}
          </div>

          {/* Right Column: Bio & Strengths */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left reveal reveal-right delay-200">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brandGreen-700 dark:text-[#0df58b]">
              {language === 'vi' ? 'HÃY ĐỂ TÔI GIỚI THIỆU BẢN THÂN' : 'LET ME INTRODUCE MYSELF'}
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-title font-bold text-stone-950 dark:text-stone-50">
              {data.title}
            </h2>

            <h3 className="text-lg sm:text-xl font-bold font-title text-brandGreen-700 dark:text-[#0df58b]">
              {language === 'vi' ? 'Đồng hành cùng bạn trên hành trình tài chính.' : 'A story of dedication and financial partnership.'}
            </h3>

            <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-sm sm:text-base">
              {data.intro}
            </p>

            {/* Mission block */}
            <div className="bg-stone-50 dark:bg-[#111827]/60 border-l-4 border-brandGreen-600 dark:border-[#0df58b] p-5 rounded-r-xl border border-y-stone-100 border-r-stone-100 dark:border-y-transparent dark:border-r-transparent">
              <h4 className="font-title font-bold text-brandGreen-700 dark:text-[#0df58b] mb-1.5 text-sm uppercase tracking-wider">
                {data.missionTitle}
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                {data.missionText}
              </p>
            </div>

            {/* Contact detail box */}
            <div className="border-t border-stone-200 dark:border-stone-800 pt-6 mt-2 flex flex-col gap-2">
              <h4 className="text-sm font-bold font-title uppercase tracking-wider text-stone-500 dark:text-stone-400">
                {language === 'vi' ? 'Liên hệ nhanh' : 'Quick Contact'}
              </h4>
              <p className="text-xs text-stone-550 dark:text-stone-400 max-w-md leading-relaxed">
                {language === 'vi'
                  ? 'Bạn đang tìm kiếm giải pháp tài chính tốt nhất và nhanh chóng? Hãy gửi yêu cầu hoặc liên hệ trực tiếp với tôi.'
                  : 'Are you looking for the best and fastest financial solutions? Drop me a message or contact me directly.'}
              </p>
              <a
                href={`mailto:${portfolioData[language].contact.email}`}
                className="text-base sm:text-lg font-mono font-bold text-brandGreen-700 dark:text-[#0df58b] hover:underline hover:text-brandGreen-600 dark:hover:text-emerald-400 transition-colors self-start mt-1"
              >
                {portfolioData[language].contact.email}
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-lg font-bold font-title text-xs sm:text-sm text-white dark:text-stone-950 bg-brandGreen-600 hover:bg-brandGreen-700 dark:bg-[#0df58b] dark:hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(13,245,139,0.3)] transition-all duration-300 text-center"
              >
                {language === 'vi' ? 'ĐĂNG KÝ TƯ VẤN' : 'HIRE ME'}
              </a>
              <a
                href="#resume"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('resume').scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-lg font-bold font-title text-xs sm:text-sm text-stone-700 dark:text-stone-200 border border-stone-300 dark:border-stone-700 hover:border-brandGreen-600 hover:text-brandGreen-700 dark:hover:border-[#0df58b] dark:hover:text-[#0df58b] transition-all duration-300 text-center bg-transparent"
              >
                {language === 'vi' ? 'XEM HỒ SƠ NĂNG LỰC' : 'DOWNLOAD CV'}
              </a>
            </div>
          </div>
        </div>

        {/* Core Values grid at the bottom */}
        <div className="mt-16 pt-12 border-t border-stone-200 dark:border-stone-850/80 reveal">
          <h4 className="text-center font-title font-bold text-xs tracking-[0.2em] text-stone-500 dark:text-stone-400 uppercase mb-8">
            {language === 'vi' ? 'Giá trị & Triết lý cốt lõi' : 'Core Values & Philosophy'}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {strengths[language].map((item, i) => (
              <div
                key={i}
                className="bg-stone-50 dark:bg-[#111827]/40 border border-stone-200 dark:border-stone-850 p-6 rounded-2xl premium-card-hover group flex flex-col gap-2 relative overflow-hidden"
              >
                <span className="absolute top-0 left-0 w-full h-[3px] bg-brandGreen-600 dark:bg-[#0df58b] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <h4 className="font-title font-bold text-sm text-brandGreen-700 dark:text-[#0df58b] mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
