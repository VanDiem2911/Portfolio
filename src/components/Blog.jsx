import { useState, useEffect } from 'react';
import { Search, MapPin, Ruler, ArrowUpDown, Phone, User, Home, Trees, ChevronLeft, ChevronRight } from 'lucide-react';
import { API_BASE } from '../config';

const ITEMS_PER_PAGE = 9;

// Fallback seed data in case backend is not running or empty
const FALLBACK_PROPERTIES = [
  {
    id: 'fb-1',
    title: 'Nhà phố hiện đại 3 tầng mặt tiền đường rộng rãi',
    description: 'Nhà phố xây dựng kiên cố thiết kế hiện đại 1 trệt 2 lầu sân thượng. Vị trí đắc địa, gần chợ, trường học các cấp, khu dân cư an ninh, sầm uất. Thích hợp vừa ở vừa mở văn phòng hoặc kinh doanh đa ngành nghề.',
    price: '4.8 tỷ',
    location: 'Quận 9, TP. Hồ Chí Minh',
    area: 95.0,
    type: 'house',
    imageUrl: 'https://picsum.photos/seed/luxury-house-1/800/600',
    contactName: 'Nguyễn Văn Nam',
    contactPhone: '0901234567',
    status: 'available',
    createdAt: new Date().toISOString()
  },
  {
    id: 'fb-2',
    title: 'Mảnh đất vuông vức phù hợp xây biệt thự vườn',
    description: 'Bán đất nền biệt thự vuông vức đẹp không tì vết. Đường trước đất rộng 12m thông thoáng, trải nhựa. Sổ hồng riêng, thổ cư 100%, xây dựng tự do. Khu vực yên tĩnh trong lành thích hợp định cư lâu dài.',
    price: '3.2 tỷ',
    location: 'Củ Chi, TP. Hồ Chí Minh',
    area: 240.0,
    type: 'land',
    imageUrl: 'https://picsum.photos/seed/suburban-land-1/800/600',
    contactName: 'Trần Thị Mai',
    contactPhone: '0987654321',
    status: 'available',
    createdAt: new Date().toISOString()
  },
  {
    id: 'fb-3',
    title: 'Biệt thự mini sân vườn ấm cúng sang trọng',
    description: 'Biệt thự thiết kế phong cách Châu Âu sang trọng, nội thất cao cấp nhập khẩu. Sân vườn rộng rãi trồng nhiều cây xanh, không khí trong lành mát mẻ quanh năm. An ninh 24/7 có bảo vệ chốt cổng.',
    price: '8.5 tỷ',
    location: 'Thủ Đức, TP. Hồ Chí Minh',
    area: 180.0,
    type: 'house',
    imageUrl: 'https://picsum.photos/seed/modern-villa-1/800/600',
    contactName: 'Lê Hoàng Long',
    contactPhone: '0912345678',
    status: 'available',
    createdAt: new Date().toISOString()
  },
  {
    id: 'fb-4',
    title: 'Đất thổ cư giá rẻ sát KCN phù hợp xây trọ',
    description: 'Cần bán đất thổ cư giá tốt nhất khu vực. Ngay sát cụm công nghiệp lớn, nhu cầu phòng trọ cực kỳ cao. Cơ hội đầu tư sinh lời nhanh chóng, đất đã sang lấp bằng phẳng sạch sẽ chỉ việc xây dựng.',
    price: '1.8 tỷ',
    location: 'Bến Cát, Bình Dương',
    area: 120.0,
    type: 'land',
    imageUrl: 'https://picsum.photos/seed/industrial-land/800/600',
    contactName: 'Phạm Minh Tuấn',
    contactPhone: '0933445566',
    status: 'available',
    createdAt: new Date().toISOString()
  }
];

export default function Blog({ language }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // all, house, land
  const [sortBy, setSortBy] = useState('newest'); // newest, price-asc, price-desc, area-desc
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeTab, sortBy]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/properties`);
      if (response.ok) {
        const data = await response.json();
        // If DB is empty, use fallbacks so the site is never blank
        setProperties(data.length > 0 ? data : FALLBACK_PROPERTIES);
      } else {
        setProperties(FALLBACK_PROPERTIES);
      }
    } catch (err) {
      console.warn('Backend API connection failed, using fallback mock data:', err);
      setProperties(FALLBACK_PROPERTIES);
    } finally {
      setLoading(false);
    }
  };

  // Convert raw price string like "4.8 tỷ" or "850 triệu" to a numerical value for sorting
  const parsePriceToNumber = (priceStr) => {
    if (!priceStr) return 0;
    const cleanStr = priceStr.toLowerCase().replace(/,/g, '.').trim();
    if (cleanStr.includes('tỷ')) {
      const val = parseFloat(cleanStr.replace('tỷ', ''));
      return isNaN(val) ? 0 : val * 1000; // represent in millions
    } else if (cleanStr.includes('triệu')) {
      const val = parseFloat(cleanStr.replace('triệu', ''));
      return isNaN(val) ? 0 : val;
    }
    const parsed = parseFloat(cleanStr);
    return isNaN(parsed) ? 0 : parsed;
  };

  // Filter and Sort properties
  const filteredProperties = properties
    .filter(item => {
      // Search term filter
      const matchSearch = 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Type tab filter
      const matchTab = activeTab === 'all' || item.type === activeTab;

      return matchSearch && matchTab;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortBy === 'price-asc') {
        return parsePriceToNumber(a.price) - parsePriceToNumber(b.price);
      }
      if (sortBy === 'price-desc') {
        return parsePriceToNumber(b.price) - parsePriceToNumber(a.price);
      }
      if (sortBy === 'area-desc') {
        return b.area - a.area;
      }
      return 0;
    });

  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / ITEMS_PER_PAGE));
  const currentPageSafe = Math.min(currentPage, totalPages);
  const paginatedProperties = filteredProperties.slice(
    (currentPageSafe - 1) * ITEMS_PER_PAGE,
    currentPageSafe * ITEMS_PER_PAGE
  );

  const paginationItems = (() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPageSafe <= 5) {
      return [1, 2, 3, 4, 5, 'ellipsis-end', totalPages];
    }

    if (currentPageSafe >= totalPages - 4) {
      return [1, 'ellipsis-start', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, 'ellipsis-start', currentPageSafe - 1, currentPageSafe, currentPageSafe + 1, 'ellipsis-end', totalPages];
  })();

  const handlePageChange = (page) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCardClick = (id) => {
    window.location.hash = `#/blog/${id}`;
  };

  return (
    <section className="min-h-screen pt-28 pb-20 px-6 bg-brandBeige-50 dark:bg-[#0b0f19] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-12 reveal is-visible">
          <h1 className="font-title text-4xl md:text-5xl tracking-tight mb-4 text-stone-950 dark:text-stone-50">
            {language === 'vi' ? 'DỰ ÁN BẤT ĐỘNG SẢN' : 'REAL ESTATE BLOG & LISTINGS'}
          </h1>
          <p className="text-stone-600 dark:text-stone-400 font-body text-base max-w-2xl mx-auto">
            {language === 'vi' 
              ? 'Khám phá danh sách các căn nhà phố sang trọng và những mảnh đất nền đắc địa với cơ hội đầu tư sinh lời cao.'
              : 'Explore our catalog of luxurious townhouses and prime land plots with high investment potential.'}
          </p>
          <div className="w-16 h-[3px] bg-brandGreen-600 dark:bg-[#0df58b] mx-auto mt-6 rounded-full" />
        </div>

        {/* Filters and Controls Strip */}
        <div className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-stone-800/80 rounded-2xl p-6 shadow-sm mb-10 reveal is-visible">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-stone-400">
                <Search size={18} />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={language === 'vi' ? 'Tìm theo tên, địa điểm...' : 'Search by name, location...'}
                className="w-full pl-11 pr-4 py-3 bg-stone-50 dark:bg-[#192135] border border-stone-200 dark:border-stone-700/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brandGreen-600 dark:focus:ring-[#0df58b] text-stone-900 dark:text-white transition-all"
              />
            </div>

            {/* Type tabs (Bán Nhà / Bán Đất) */}
            <div className="flex bg-stone-100 dark:bg-[#192135] p-1 rounded-xl w-full sm:w-auto">
              {[
                { id: 'all', label: language === 'vi' ? 'Tất Cả' : 'All' },
                { id: 'house', label: language === 'vi' ? 'Bán Nhà' : 'Houses' },
                { id: 'land', label: language === 'vi' ? 'Bán Đất' : 'Land' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 sm:flex-initial px-5 py-2 rounded-lg text-xs font-title font-bold tracking-wider uppercase transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-[#111726] text-brandGreen-700 dark:text-[#0df58b] shadow-sm'
                      : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-auto flex items-center gap-3">
              <span className="text-stone-400 dark:text-stone-500 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                <ArrowUpDown size={14} className="inline mr-1" />
                {language === 'vi' ? 'Sắp xếp:' : 'Sort:'}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-48 px-3 py-2.5 bg-stone-50 dark:bg-[#192135] border border-stone-200 dark:border-stone-700/80 rounded-xl text-xs font-title font-bold text-stone-700 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-brandGreen-600 dark:focus:ring-[#0df58b]"
              >
                <option value="newest">{language === 'vi' ? 'Mới nhất' : 'Newest'}</option>
                <option value="price-asc">{language === 'vi' ? 'Giá: Thấp -> Cao' : 'Price: Low -> High'}</option>
                <option value="price-desc">{language === 'vi' ? 'Giá: Cao -> Thấp' : 'Price: High -> Low'}</option>
                <option value="area-desc">{language === 'vi' ? 'Diện tích lớn nhất' : 'Largest Area'}</option>
              </select>
            </div>
            
          </div>
        </div>

        {/* Loading skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-stone-850 rounded-2xl overflow-hidden shadow-sm animate-pulse">
                <div className="h-64 bg-stone-200 dark:bg-stone-800 w-full" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-1/4" />
                  <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded w-3/4" />
                  <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-1/2" />
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded" />
                    <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProperties.length === 0 ? (
          /* Empty state */
          <div className="text-center py-20 bg-white dark:bg-[#111726] border border-stone-200 dark:border-stone-800/80 rounded-2xl p-10">
            <p className="text-stone-500 dark:text-stone-400 font-body text-base">
              {language === 'vi' 
                ? 'Không tìm thấy bất động sản nào phù hợp với yêu cầu.' 
                : 'No properties found matching your selection.'}
            </p>
          </div>
        ) : (
          /* Property Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedProperties.map((item) => (
              <article 
                key={item.id}
                onClick={() => handleCardClick(item.id)}
                className="group bg-white dark:bg-[#111726] border border-stone-200 dark:border-stone-850/80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col hover:-translate-y-1.5"
              >
                {/* Visual Asset Container */}
                <div className="relative h-64 overflow-hidden bg-stone-100 dark:bg-stone-900">
                  <img
                    src={item.imageUrl || 'https://picsum.photos/seed/realestate/800/600'}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Type Badge */}
                  <span className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold font-title tracking-wider uppercase shadow-md ${
                    item.type === 'house'
                      ? 'bg-brandBlue-600 text-white dark:bg-brandBlue-800'
                      : 'bg-amber-600 text-white'
                  }`}>
                    {item.type === 'house' ? (
                      <>
                        <Home size={10} />
                        {language === 'vi' ? 'Bán Nhà' : 'House'}
                      </>
                    ) : (
                      <>
                        <Trees size={10} />
                        {language === 'vi' ? 'Bán Đất' : 'Land'}
                      </>
                    )}
                  </span>

                  {/* Status Badge if sold */}
                  {item.status === 'sold' && (
                    <span className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center text-white text-base font-bold uppercase tracking-widest font-title">
                      {language === 'vi' ? 'Đã Bán' : 'Sold Out'}
                    </span>
                  )}

                  {/* Price Tag */}
                  <div className="absolute bottom-4 right-4 bg-stone-950/95 dark:bg-[#0b0f19]/95 backdrop-blur-sm text-[#0df58b] font-title font-bold text-sm px-3.5 py-1.5 rounded-lg border border-stone-800">
                    {item.price}
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="font-title text-lg font-bold line-clamp-2 text-stone-900 dark:text-stone-50 group-hover:text-brandGreen-700 dark:group-hover:text-[#0df58b] transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-stone-500 dark:text-stone-400 font-body text-xs line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Specs & Contact Strip */}
                  <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800/80 space-y-3.5">
                    <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-400">
                      
                      {/* Location */}
                      <span className="flex items-center gap-1 min-w-0">
                        <MapPin size={13} className="text-brandGreen-600 dark:text-[#0df58b] flex-shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </span>

                      {/* Area */}
                      <span className="flex items-center gap-1 flex-shrink-0">
                        <Ruler size={13} className="text-brandGreen-600 dark:text-[#0df58b]" />
                        <span>{item.area} m²</span>
                      </span>

                    </div>

                    {/* Agent contact info */}
                    <div className="flex items-center justify-between text-[11px] font-semibold text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-[#192135] p-2.5 rounded-xl border border-stone-100 dark:border-stone-800/50">
                      <span className="flex items-center gap-1.5">
                        <User size={12} className="text-stone-400" />
                        <span className="truncate">{item.contactName}</span>
                      </span>
                      <a 
                        href={`tel:${item.contactPhone}`}
                        onClick={(e) => e.stopPropagation()} // prevent card navigation on click
                        className="flex items-center gap-1 text-brandGreen-700 dark:text-[#0df58b] hover:underline"
                      >
                        <Phone size={12} />
                        <span>{item.contactPhone}</span>
                      </a>
                    </div>
                  </div>

                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && filteredProperties.length > ITEMS_PER_PAGE && (
          <nav
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
            aria-label={language === 'vi' ? 'Phân trang bất động sản' : 'Property pagination'}
          >
            <button
              type="button"
              onClick={() => handlePageChange(currentPageSafe - 1)}
              disabled={currentPageSafe === 1}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-500 shadow-sm transition-all hover:border-brandGreen-600 hover:text-brandGreen-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-800 dark:bg-[#111726] dark:text-stone-400 dark:hover:border-[#0df58b] dark:hover:text-[#0df58b]"
              aria-label={language === 'vi' ? 'Trang trước' : 'Previous page'}
            >
              <ChevronLeft size={17} />
            </button>

            {paginationItems.map((item) => (
              typeof item === 'number' ? (
                <button
                  key={item}
                  type="button"
                  onClick={() => handlePageChange(item)}
                  aria-current={currentPageSafe === item ? 'page' : undefined}
                  className={`flex h-11 min-w-11 items-center justify-center rounded-2xl border px-4 font-title text-sm font-bold transition-all ${
                    currentPageSafe === item
                      ? 'border-brandGreen-600 bg-gradient-to-br from-brandBlue-500 to-brandGreen-600 text-white shadow-lg shadow-brandGreen-600/20 dark:border-[#0df58b] dark:from-brandBlue-600 dark:to-[#0df58b] dark:text-stone-950'
                      : 'border-stone-200 bg-white text-stone-500 hover:border-brandGreen-600 hover:text-brandGreen-700 dark:border-stone-800 dark:bg-[#111726] dark:text-stone-400 dark:hover:border-[#0df58b] dark:hover:text-[#0df58b]'
                  }`}
                >
                  {item}
                </button>
              ) : (
                <span
                  key={item}
                  className="flex h-11 min-w-11 items-center justify-center rounded-2xl border border-stone-200 bg-white px-4 text-sm font-bold text-stone-400 dark:border-stone-800 dark:bg-[#111726] dark:text-stone-500"
                >
                  ...
                </span>
              )
            ))}

            <button
              type="button"
              onClick={() => handlePageChange(currentPageSafe + 1)}
              disabled={currentPageSafe === totalPages}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-500 shadow-sm transition-all hover:border-brandGreen-600 hover:text-brandGreen-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-800 dark:bg-[#111726] dark:text-stone-400 dark:hover:border-[#0df58b] dark:hover:text-[#0df58b]"
              aria-label={language === 'vi' ? 'Trang sau' : 'Next page'}
            >
              <ChevronRight size={17} />
            </button>
          </nav>
        )}

      </div>
    </section>
  );
}
