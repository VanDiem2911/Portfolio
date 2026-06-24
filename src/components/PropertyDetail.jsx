import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Ruler, Phone, User, Home, Trees, Calendar, ShieldCheck, Mail, Send } from 'lucide-react';
import { API_BASE } from '../config';

// Fallback seed data to resolve if backend is offline
const FALLBACK_PROPERTIES = [
  {
    id: 'fb-1',
    title: 'Nhà phố hiện đại 3 tầng mặt tiền đường rộng rãi',
    description: 'Nhà phố xây dựng kiên cố thiết kế hiện đại 1 trệt 2 lầu sân thượng. Vị trí đắc địa, gần chợ, trường học các cấp, khu dân cư an ninh, sầm uất. Thích hợp vừa ở vừa mở văn phòng hoặc kinh doanh đa ngành nghề. Mặt tiền đường nhựa 12m thông thoáng, giao thông thuận lợi kết nối các quận trung tâm nhanh chóng. Nhà có thiết kế giếng trời thông thoáng đón gió tự nhiên, nội thất cao cấp hoàn thiện chìa khóa trao tay.',
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
    description: 'Bán đất nền biệt thự vuông vức đẹp không tì vết. Đường trước đất rộng 12m thông thoáng, trải nhựa. Sổ hồng riêng, thổ cư 100%, xây dựng tự do. Khu vực yên tĩnh trong lành thích hợp định cư lâu dài. Đất cao ráo không ngập nước, hạ tầng hoàn thiện điện nước máy cáp quang âm đất đầy đủ. Xung quanh có nhiều biệt thự vườn hiện hữu, dân trí cao, an ninh tốt.',
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
    description: 'Biệt thự thiết kế phong cách Châu Âu sang trọng, nội thất cao cấp nhập khẩu. Sân vườn rộng rãi trồng nhiều cây xanh, không khí trong lành mát mẻ quanh năm. An ninh 24/7 có bảo vệ chốt cổng. Bố cục 1 trệt 1 lầu gồm phòng khách rộng, bếp mở hiện đại, 3 phòng ngủ khép kín có toilet riêng biệt. Phù hợp cho gia đình 4-6 người sinh sống nghỉ dưỡng yên bình tránh xa ồn ào đô thị.',
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
    description: 'Cần bán đất thổ cư giá tốt nhất khu vực. Ngay sát cụm công nghiệp lớn, nhu cầu phòng trọ cực kỳ cao. Cơ hội đầu tư sinh lời nhanh chóng, đất đã sang lấp bằng phẳng sạch sẽ chỉ việc xây dựng. Hỗ trợ xin giấy phép xây dựng và bản vẽ thiết kế dãy trọ tối ưu hóa diện tích. Sổ hồng chính chủ sang tên công chứng trong ngày.',
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

export default function PropertyDetail({ language, propertyId }) {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [submitStatus, setSubmitStatus] = useState(null); // null, success, error

  useEffect(() => {
    fetchPropertyDetails();
  }, [propertyId]);

  const fetchPropertyDetails = async () => {
    setLoading(true);
    try {
      if (propertyId.startsWith('fb-')) {
        const mockItem = FALLBACK_PROPERTIES.find(item => item.id === propertyId);
        setProperty(mockItem || null);
      } else {
        const response = await fetch(`${API_BASE}/properties/${propertyId}`);
        if (response.ok) {
          const data = await response.json();
          setProperty(data);
        } else {
          // fallback search
          const mockItem = FALLBACK_PROPERTIES.find(item => item.id === propertyId);
          setProperty(mockItem || null);
        }
      }
    } catch (err) {
      console.warn('Backend API connection failed, checking fallback details:', err);
      const mockItem = FALLBACK_PROPERTIES.find(item => item.id === propertyId);
      setProperty(mockItem || null);
    } finally {
      setLoading(false);
    }
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) {
      setSubmitStatus('error');
      return;
    }

    const payload = {
      name: inquiryName,
      phone: inquiryPhone,
      email: '',
      loanType: 'property_inquiry',
      message: `Yêu cầu tư vấn dự án: "${property.title}". Lời nhắn: ${inquiryMsg || 'Không có'}`
    };

    try {
      const response = await fetch(`${API_BASE}/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setInquiryName('');
        setInquiryPhone('');
        setInquiryMsg('');
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error('Failed to submit property inquiry:', err);
      setSubmitStatus('error');
    }

    setTimeout(() => setSubmitStatus(null), 5000);
  };

  const goBack = () => {
    window.location.hash = '#/blog';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brandBeige-50 dark:bg-[#0b0f19] pt-20">
        <div className="w-12 h-12 border-4 border-brandGreen-600 border-t-transparent dark:border-[#0df58b] dark:border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brandBeige-50 dark:bg-[#0b0f19] pt-20 px-6">
        <h2 className="font-title text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          {language === 'vi' ? 'Không tìm thấy thông tin bất động sản' : 'Property not found'}
        </h2>
        <button 
          onClick={goBack}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brandGreen-600 hover:bg-brandGreen-700 text-white dark:bg-[#0df58b] dark:text-stone-950 dark:hover:bg-[#0df58b]/80 font-title font-bold text-sm transition-all"
        >
          <ArrowLeft size={16} />
          {language === 'vi' ? 'Quay lại danh sách' : 'Back to listings'}
        </button>
      </div>
    );
  }

  return (
    <section className="min-h-screen pt-28 pb-20 px-6 bg-brandBeige-50 dark:bg-[#0b0f19] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Back navigation */}
        <button 
          onClick={goBack}
          className="inline-flex items-center gap-2 mb-8 text-stone-600 dark:text-stone-400 hover:text-brandGreen-700 dark:hover:text-[#0df58b] text-sm font-title font-bold uppercase tracking-wider transition-colors"
        >
          <ArrowLeft size={16} />
          {language === 'vi' ? 'Quay lại danh sách' : 'Back to listings'}
        </button>

        {/* Title and Badge */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-bold font-title tracking-wider uppercase ${
              property.type === 'house'
                ? 'bg-brandBlue-600 text-white dark:bg-brandBlue-800'
                : 'bg-amber-600 text-white'
            }`}>
              {property.type === 'house' ? <Home size={10} /> : <Trees size={10} />}
              {property.type === 'house' 
                ? (language === 'vi' ? 'Bán Nhà' : 'House for Sale') 
                : (language === 'vi' ? 'Bán Đất' : 'Land for Sale')}
            </span>

            {property.status === 'sold' && (
              <span className="bg-stone-500 text-white text-[10px] font-bold font-title uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                {language === 'vi' ? 'Đã Bán' : 'Sold'}
              </span>
            )}
          </div>

          <h1 className="font-title text-3xl md:text-4xl lg:text-5xl leading-tight text-stone-950 dark:text-stone-50 mb-4 max-w-4xl">
            {property.title}
          </h1>

          <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-sm">
            <MapPin size={16} className="text-brandGreen-600 dark:text-[#0df58b]" />
            <span>{property.location}</span>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content (Left, cols: 2) */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Property Image Cover */}
            <div className="relative h-[300px] sm:h-[450px] rounded-3xl overflow-hidden shadow-lg border border-stone-200 dark:border-stone-850">
              <img
                src={property.imageUrl || 'https://picsum.photos/seed/realestate/800/600'}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-stone-950/95 dark:bg-[#0b0f19]/95 backdrop-blur-sm text-[#0df58b] text-xl font-title font-bold px-4 py-2.5 rounded-xl border border-stone-800">
                {property.price}
              </div>
            </div>

            {/* Spec Card Grid (Not a spec list table, per taste-guidelines 4.9 alternative 1) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              
              {/* Box 1: Price */}
              <div className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-stone-850 p-5 rounded-2xl">
                <span className="text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-widest block mb-1">
                  {language === 'vi' ? 'Giá bán' : 'Price'}
                </span>
                <span className="font-title text-xl font-extrabold text-brandGreen-700 dark:text-[#0df58b]">
                  {property.price}
                </span>
                <span className="text-stone-400 dark:text-stone-500 text-[10px] block mt-1">
                  {language === 'vi' ? 'Giá trọn gói, thương lượng' : 'Full price, negotiable'}
                </span>
              </div>

              {/* Box 2: Area */}
              <div className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-stone-850 p-5 rounded-2xl">
                <span className="text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-widest block mb-1">
                  {language === 'vi' ? 'Diện tích' : 'Area'}
                </span>
                <span className="font-title text-xl font-extrabold text-stone-900 dark:text-stone-50 flex items-baseline gap-1">
                  {property.area} <span className="text-xs font-body font-normal text-stone-500">m²</span>
                </span>
                <span className="text-stone-400 dark:text-stone-500 text-[10px] block mt-1">
                  {language === 'vi' ? 'Đất sử dụng riêng' : 'Private ownership'}
                </span>
              </div>

              {/* Box 3: Legal/Type */}
              <div className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-stone-850 p-5 rounded-2xl col-span-2 sm:col-span-1">
                <span className="text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-widest block mb-1">
                  {language === 'vi' ? 'Pháp lý' : 'Legal status'}
                </span>
                <span className="font-title text-base font-extrabold text-stone-900 dark:text-stone-50 flex items-center gap-1.5">
                  <ShieldCheck size={18} className="text-brandGreen-600 dark:text-[#0df58b]" />
                  {language === 'vi' ? 'Sổ hồng riêng' : 'Pink book issued'}
                </span>
                <span className="text-stone-400 dark:text-stone-500 text-[10px] block mt-1.5">
                  {language === 'vi' ? 'Xây tự do, công chứng ngay' : 'Free build, instant transfer'}
                </span>
              </div>

            </div>

            {/* Description */}
            <div className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-stone-850 p-8 rounded-3xl space-y-4">
              <h2 className="font-title text-xl font-bold border-b border-stone-100 dark:border-stone-800 pb-3 text-stone-900 dark:text-stone-100">
                {language === 'vi' ? 'Thông tin mô tả' : 'Property Description'}
              </h2>
              <div className="text-stone-600 dark:text-stone-300 font-body text-sm leading-relaxed space-y-4 whitespace-pre-line">
                {property.description}
              </div>
            </div>

            {/* Mock Map / Location Details */}
            <div className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-stone-850 p-8 rounded-3xl space-y-4">
              <h2 className="font-title text-xl font-bold border-b border-stone-100 dark:border-stone-800 pb-3 text-stone-900 dark:text-stone-100">
                {language === 'vi' ? 'Vị trí bất động sản' : 'Location details'}
              </h2>
              <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300 text-xs font-semibold">
                <MapPin size={14} className="text-brandGreen-600 dark:text-[#0df58b]" />
                <span>{property.location}</span>
              </div>
              
              {/* Mock map visual box */}
              <div className="h-64 rounded-2xl border border-stone-200 dark:border-stone-800/80 bg-stone-100 dark:bg-[#192135] overflow-hidden flex flex-col items-center justify-center text-center p-6 relative">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0df58b_1.5px,transparent_1.5px)] bg-[size:16px_16px]" />
                <div className="relative z-10 space-y-3">
                  <div className="w-12 h-12 bg-white dark:bg-[#111726] border border-stone-200 dark:border-stone-700/80 rounded-full flex items-center justify-center shadow-md mx-auto animate-bounce text-brandGreen-600 dark:text-[#0df58b]">
                    <MapPin size={24} />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    {language === 'vi' ? 'Xem bản đồ vị trí thực tế' : 'Satellite View Available'}
                  </p>
                  <p className="text-[11px] text-stone-400 max-w-xs mx-auto">
                    {language === 'vi'
                      ? 'Vì lý do bảo mật, địa chỉ chính xác sẽ được cung cấp khi làm việc trực tiếp.'
                      : 'For safety, exact coordinate details will be shared during direct consultation.'}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar Contact Card (Right, cols: 1) */}
          <div className="space-y-6">
            
            {/* Agent Info card */}
            <div className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-stone-850 p-6 rounded-3xl shadow-md lg:sticky lg:top-24 space-y-6">
              
              <div className="text-center pb-4 border-b border-stone-100 dark:border-stone-800">
                <div className="w-20 h-20 bg-stone-100 dark:bg-stone-800 rounded-full mx-auto mb-4 border-2 border-brandGreen-600 dark:border-[#0df58b] flex items-center justify-center text-stone-400">
                  <User size={40} />
                </div>
                <h3 className="font-title text-base font-bold text-stone-900 dark:text-stone-50">
                  {property.contactName}
                </h3>
                <p className="text-stone-400 text-[10px] font-bold uppercase tracking-wider mt-1">
                  {language === 'vi' ? 'Nhân viên tư vấn bds' : 'Real estate advisor'}
                </p>
              </div>

              {/* Instant Call Button */}
              <a
                href={`tel:${property.contactPhone}`}
                className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl bg-brandGreen-600 hover:bg-brandGreen-700 dark:bg-[#0df58b] dark:text-stone-950 dark:hover:bg-[#0df58b]/90 text-white font-title font-bold text-sm tracking-wider uppercase shadow-md transition-all active:scale-[0.98]"
              >
                <Phone size={16} />
                {property.contactPhone}
              </a>

              {/* Inquiry Form */}
              <form onSubmit={handleInquirySubmit} className="space-y-4 pt-2">
                <h4 className="font-title text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  {language === 'vi' ? 'Yêu cầu tư vấn chi tiết' : 'Send inquiry'}
                </h4>
                
                <div>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder={language === 'vi' ? 'Họ và tên của bạn' : 'Your full name'}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-[#192135] border border-stone-200 dark:border-stone-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen-600 dark:focus:ring-[#0df58b] text-stone-900 dark:text-white"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    placeholder={language === 'vi' ? 'Số điện thoại liên lạc' : 'Phone number'}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-[#192135] border border-stone-200 dark:border-stone-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen-600 dark:focus:ring-[#0df58b] text-stone-900 dark:text-white"
                  />
                </div>

                <div>
                  <textarea
                    rows={3}
                    value={inquiryMsg}
                    onChange={(e) => setInquiryMsg(e.target.value)}
                    placeholder={language === 'vi' ? 'Lời nhắn (Ví dụ: Tôi muốn xem đất vào cuối tuần này...)' : 'Inquiry details...'}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-[#192135] border border-stone-200 dark:border-stone-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen-600 dark:focus:ring-[#0df58b] text-stone-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:border-brandGreen-600 dark:hover:border-[#0df58b] text-stone-700 dark:text-stone-300 hover:text-brandGreen-700 dark:hover:text-[#0df58b] font-title font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <Send size={12} />
                  {language === 'vi' ? 'Gửi yêu cầu' : 'Send'}
                </button>

                {submitStatus === 'success' && (
                  <p className="text-[#0df58b] text-[11px] font-semibold text-center mt-2">
                    {language === 'vi' ? 'Gửi thành công! Chúng tôi sẽ gọi lại ngay.' : 'Submitted! We will call you back shortly.'}
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-500 text-[11px] font-semibold text-center mt-2">
                    {language === 'vi' ? 'Vui lòng nhập tên và số điện thoại!' : 'Please enter name and phone number!'}
                  </p>
                )}
              </form>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
