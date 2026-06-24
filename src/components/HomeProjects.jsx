import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronRight, Home, Trees, Ruler, MapPin } from 'lucide-react';
import { API_BASE } from '../config';

const FALLBACK_PROPERTIES = [
  {
    id: 'fb-1',
    title: 'Nhà biệt thự phố vườn hiện đại khu dân cư cao cấp',
    description: 'Biệt thự thiết kế phong cách Châu Âu hiện đại rộng rãi, bố cục 1 trệt 2 lầu có sân thượng trồng rau sạch. Đường trước nhà 12m xe hơi tránh nhau thoải mái.',
    price: '7.5 tỷ',
    location: 'Thủ Đức, TP. Hồ Chí Minh',
    area: 180.0,
    type: 'house',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    contactName: 'Nguyễn Văn Nam',
    contactPhone: '0901234567',
    status: 'available'
  },
  {
    id: 'fb-2',
    title: 'Nhà phố hiện đại 3 tầng mặt tiền kinh doanh tốt',
    description: 'Nhà phố 1 trệt 2 lầu đúc BTCT kiên cố. Trục đường giao thông sầm uất thích hợp mở spa, văn phòng đại diện hoặc kinh doanh đa ngành nghề.',
    price: '4.8 tỷ',
    location: 'Quận 9, TP. Hồ Chí Minh',
    area: 95.0,
    type: 'house',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    contactName: 'Thu Phạm',
    contactPhone: '0977123456',
    status: 'available'
  },
  {
    id: 'fb-3',
    title: 'Mảnh đất vuông vức phù hợp xây biệt thự sân vườn',
    description: 'Cần bán lô đất biệt thự diện tích rộng cực đẹp. Đất vuông vức, nở hậu nhẹ tài lộc. Đường trước đất rộng 12m trải nhựa thông thoáng sạch sẽ.',
    price: '3.2 tỷ',
    location: 'Củ Chi, TP. Hồ Chí Minh',
    area: 240.0,
    type: 'land',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    contactName: 'Trần Thị Mai',
    contactPhone: '0987654321',
    status: 'available'
  },
  {
    id: 'fb-4',
    title: 'Đất thổ cư mặt tiền đường nhựa sầm uất phù hợp xây trọ',
    description: 'Lô đất thổ cư 100% sổ hồng riêng xây dựng tự do. Vị trí đắc địa ngay sát cổng KCN lớn với hơn 50.000 công nhân đang làm việc.',
    price: '1.8 tỷ',
    location: 'Bến Cát, Bình Dương',
    area: 120.0,
    type: 'land',
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    contactName: 'Phạm Minh Tuấn',
    contactPhone: '0933445566',
    status: 'available'
  }
];

export default function HomeProjects({ language }) {
  const [properties, setProperties] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch(`${API_BASE}/properties`);
      if (response.ok) {
        const data = await response.json();
        setProperties(data.length > 0 ? data : FALLBACK_PROPERTIES);
      } else {
        setProperties(FALLBACK_PROPERTIES);
      }
    } catch (err) {
      console.warn('Backend API connection failed for HomeProjects slider, using mock seeder:', err);
      setProperties(FALLBACK_PROPERTIES);
    }
  };

  // Auto rotate timer
  useEffect(() => {
    if (properties.length <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % properties.length);
    }, 3000); // 3 seconds interval

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [properties, isPaused]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const handleCardClick = () => {
    const activeProperty = properties[activeIndex];
    if (activeProperty) {
      window.location.hash = `#/blog/${activeProperty.id}`;
    }
  };

  const handleViewAllClick = (e) => {
    e.preventDefault();
    window.location.hash = '#/blog';
  };

  if (properties.length === 0) return null;

  const currentProperty = properties[activeIndex];

  return (
    <section className="py-20 lg:py-28 bg-[#faf7f1] dark:bg-[#0b0f19] transition-colors duration-300 relative overflow-hidden border-t border-b border-stone-200/50 dark:border-stone-850/50">
      
      {/* Decorative Blur Background Blob */}
      <div className="absolute top-1/2 left-[-150px] w-96 h-96 bg-brandGreen-600/5 dark:bg-[#0df58b]/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading and Description */}
          <div className="lg:col-span-5 text-left space-y-6 reveal is-visible">
            <span className="block font-title text-brandGreen-700 dark:text-[#0df58b] text-xs font-bold uppercase tracking-[0.25em]">
              {language === 'vi' ? 'SẢN PHẨM PHÂN PHỐI' : 'EXCLUSIVE LISTINGS'}
            </span>
            
            <h2 className="text-4xl md:text-5xl font-title font-bold text-stone-950 dark:text-stone-50 leading-tight">
              {language === 'vi' ? (
                <>
                  Dự án <span className="bg-gradient-to-r from-brandBlue-600 to-brandGreen-700 dark:from-[#0df58b] dark:to-brandBlue-500 bg-clip-text text-transparent">Bất Động Sản Nổi bật</span>
                </>
              ) : (
                <>
                  Featured <span className="bg-gradient-to-r from-brandBlue-600 to-brandGreen-700 dark:from-[#0df58b] dark:to-brandBlue-500 bg-clip-text text-transparent">Properties</span>
                </>
              )}
            </h2>

            <p className="text-stone-600 dark:text-stone-400 font-body text-sm leading-relaxed max-w-md">
              {language === 'vi'
                ? 'Đây là danh sách các dự án nhà ở và đất nền tiêu biểu, được tuyển chọn kỹ lưỡng về pháp lý, quy hoạch hạ tầng và khả năng thanh khoản cao nhất dành cho nhà đầu tư.'
                : 'Browse our highly-curated selection of premium townhouses and land plots. Fully validated credentials and high potential yields for investors.'}
            </p>

            <div className="pt-4">
              <a
                href="#/blog"
                onClick={handleViewAllClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-[#111726] border border-stone-200 dark:border-stone-800 text-stone-850 dark:text-white font-title font-bold text-xs uppercase tracking-wider hover:border-brandGreen-600 dark:hover:border-[#0df58b] hover:text-brandGreen-700 dark:hover:text-[#0df58b] shadow-sm transition-all duration-300 group"
              >
                {language === 'vi' ? 'Xem tất cả' : 'View All'}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Rotating Slider Card */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center reveal is-visible">
            
            {/* Wrapper with subtle gradient back-shadow */}
            <div 
              className="w-full max-w-xl bg-white dark:bg-[#111726] border border-stone-200 dark:border-stone-850/80 p-5 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onClick={handleCardClick}
            >
              
              {/* Slider Image Container */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-100 dark:border-stone-800">
                <img
                  src={currentProperty.imageUrl}
                  alt={currentProperty.title}
                  className="w-full h-full object-cover transition-all duration-700"
                />

                {/* Badge Type overlay */}
                <span className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[9px] font-bold font-title tracking-wider uppercase shadow-md ${
                  currentProperty.type === 'house'
                    ? 'bg-brandBlue-600 text-white dark:bg-brandBlue-800'
                    : 'bg-amber-600 text-white'
                }`}>
                  {currentProperty.type === 'house' ? <Home size={9} /> : <Trees size={9} />}
                  {currentProperty.type === 'house' 
                    ? (language === 'vi' ? 'Bán Nhà' : 'House') 
                    : (language === 'vi' ? 'Bán Đất' : 'Land')}
                </span>

                {/* Price tag */}
                <div className="absolute bottom-4 right-4 bg-stone-950/95 dark:bg-[#0b0f19]/95 backdrop-blur-sm text-[#0df58b] font-title font-bold text-sm px-3.5 py-1.5 rounded-lg border border-stone-800">
                  {currentProperty.price}
                </div>
              </div>

              {/* Slider Text details */}
              <div className="mt-5 space-y-3.5 text-left px-1">
                
                <h3 className="font-title text-xl font-bold text-stone-900 dark:text-stone-50 hover:text-brandGreen-700 dark:hover:text-[#0df58b] transition-colors leading-snug line-clamp-1">
                  {currentProperty.title}
                </h3>
                
                <p className="text-stone-500 dark:text-stone-400 font-body text-xs line-clamp-2 leading-relaxed">
                  {currentProperty.description}
                </p>

                {/* Specs Strip */}
                <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-400 pt-3 border-t border-stone-100 dark:border-stone-850">
                  <span className="flex items-center gap-1.5 truncate">
                    <MapPin size={13} className="text-brandGreen-600 dark:text-[#0df58b]" />
                    <span className="truncate">{currentProperty.location}</span>
                  </span>
                  <span className="flex items-center gap-1.5 flex-shrink-0">
                    <Ruler size={13} className="text-brandGreen-600 dark:text-[#0df58b]" />
                    <span>{currentProperty.area} m²</span>
                  </span>
                </div>
              </div>

              {/* Pagination Dots Indicator */}
              <div className="flex items-center justify-center gap-2 mt-6 pb-1">
                {properties.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation(); // prevent card click navigation
                      handleDotClick(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIndex === idx
                        ? 'w-6 bg-brandGreen-600 dark:bg-[#0df58b]'
                        : 'w-2 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
