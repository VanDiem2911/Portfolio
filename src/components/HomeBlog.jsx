import { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, X, BookOpen } from 'lucide-react';
import { API_BASE } from '../config';

const BLOG_POSTS = [
  {
    id: 'post-1',
    title: '5 Lưu ý quan trọng khi mua đất nền Phú Mỹ năm 2026',
    excerpt: 'Tìm hiểu kỹ về quy hoạch đô thị Phú Mỹ, kiểm tra kỹ pháp lý sổ hồng riêng và thẩm định giá ngân hàng trước khi đặt cọc đầu tư.',
    content: `Thị trường bất động sản Phú Mỹ (Bà Rịa - Vũng Tàu) đang thu hút lượng lớn dòng tiền đầu tư nhờ vị trí chiến lược cạnh cảng biển nước sâu Cái Mép - Thị Vải và hệ thống cao tốc kết nối đồng bộ. Tuy nhiên, để đảm bảo an toàn vốn và tối ưu lợi nhuận trong năm 2026, các nhà đầu tư cần đặc biệt lưu ý 5 yếu tố cốt lõi sau:

1. **Kiểm tra kỹ quy hoạch chi tiết 1/2000 và 1/500**: Tránh mua phải đất thuộc hành lang an toàn giao thông, đất công trình công cộng hoặc dính quy hoạch treo. Hãy liên hệ Phòng Tài nguyên & Môi trường Phú Mỹ để kiểm tra trước khi thực hiện giao dịch.
2. **Ưu tiên đất đã có sổ hồng riêng**: Tuyệt đối không giao dịch đất mua chung sổ hoặc chỉ có giấy tay hẹn ngày ra sổ. Pháp lý vững vàng là tấm khiên bảo vệ tài sản tốt nhất.
3. **Thẩm định giá thông qua ngân hàng**: Một mẹo nhỏ cho nhà đầu tư là yêu cầu ngân hàng thẩm định cho vay thử. Nếu ngân hàng phê duyệt định giá tốt và sẵn sàng giải ngân hạn mức cao, điều đó chứng tỏ tài sản có giá trị thực tế tốt và pháp lý hoàn toàn minh bạch.
4. **Đánh giá hạ tầng giao thông kết nối thực tế**: Đừng chỉ nghe lời quảng cáo trên giấy. Hãy trực tiếp khảo sát thực địa lộ giới đường trước đất, đường có trải nhựa chưa, có cột điện nước sẵn sàng chưa.
5. **Cân đối đòn bẩy tài chính hợp lý**: Tỷ lệ vay vốn mua đất nền lý tưởng là từ 30% - 50% giá trị tài sản. Hạn chế sử dụng đòn bẩy quá cao để giảm áp lực trả nợ lãi suất định kỳ khi thị trường dao động.`,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
    date: '24/06/2026',
    readTime: '4 phút đọc'
  },
  {
    id: 'post-2',
    title: 'Kinh nghiệm vay ngân hàng mua nhà trả góp an toàn nhất',
    excerpt: 'Làm thế nào để tính toán bài toán dòng tiền trả nợ ngân hàng hàng tháng mà không ảnh hưởng tới chất lượng cuộc sống gia đình.',
    content: `Sở hữu một ngôi nhà riêng là mong ước của hầu hết mọi gia đình. Với sự hỗ trợ của các sản phẩm tín dụng vay mua nhà dài hạn từ ngân hàng, giấc mơ này ngày càng dễ dàng hiện thực hóa hơn. Dưới đây là những kinh nghiệm xương máu giúp bạn vay mua nhà trả góp an toàn:

1. **Xác định tỷ lệ vay an toàn**: Dù nhiều ngân hàng hỗ trợ hạn mức lên tới 70% - 80% giá trị căn nhà, tỷ lệ vay tối ưu nhất để tránh áp lực trả nợ nặng nề là từ 40% - 50%. Bạn nên có tích lũy sẵn tối thiểu 50% giá trị nhà.
2. **Quy tắc 30% thu nhập hàng tháng**: Số tiền trả gốc và lãi ngân hàng hàng tháng không nên vượt quá 30% - 40% tổng thu nhập khả dụng của gia đình. Khoản tiền còn lại phải đủ để trang trải các chi phí sinh hoạt thiết yếu, bảo hiểm và một phần dự phòng y tế.
3. **Tìm hiểu kỹ cơ chế thả nổi lãi suất**: Các ngân hàng thường quảng cáo lãi suất siêu ưu đãi trong 6 - 12 tháng đầu (ví dụ 6-7%/năm). Tuy nhiên, bạn cần hỏi rõ công thức tính lãi suất sau thời gian ưu đãi (thường bằng Lãi suất cơ sở/Lãi suất tiền gửi + Biên độ 3.5% - 4.5%). Hãy chuẩn bị sẵn kịch bản lãi suất thả nổi tăng thêm 2-3% để tính toán dòng tiền.
4. **Ưu tiên thời hạn vay dài nhất có thể**: Lựa chọn gói vay 20 - 30 năm sẽ giúp giảm số tiền gốc phải trả hàng tháng xuống mức thấp nhất, tạo sự linh hoạt trong quản lý tài chính. Khi tích lũy đủ tiền, bạn có thể tất toán trước hạn (chú ý phí phạt trước hạn thường chỉ dao động từ 1% - 3% trong 3 năm đầu và miễn phí từ năm thứ 5).`,
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80',
    date: '18/06/2026',
    readTime: '5 phút đọc'
  },
  {
    id: 'post-3',
    title: 'Xu hướng thị trường bất động sản Bà Rịa cuối năm 2026',
    excerpt: 'Phân tích các tác động từ hạ tầng giao thông và làn sóng đầu tư dịch chuyển dịch về các đô thị vệ tinh xung quanh TP.HCM.',
    content: `Thị trường bất động sản Bà Rịa - Vũng Tàu đang bước vào giai đoạn tăng trưởng bền vững nhờ sự thúc đẩy mạnh mẽ từ đầu tư công và làn sóng dịch chuyển khu công nghiệp. Dự báo xu hướng cuối năm 2026 sẽ có những chuyển biến quan trọng:

1. **Sức nóng tập trung quanh trục cao tốc Biên Hòa - Vũng Tàu**: Các khu vực có đường dẫn cao tốc đi qua ghi nhận thanh khoản giao dịch đất nền thổ cư tăng trưởng rõ rệt. Quỹ đất sạch quanh các nút giao đang được săn đón ráo riết.
2. **Bất động sản công nghiệp dẫn dắt dòng tiền**: Phú Mỹ và Châu Đức tiếp tục là điểm sáng nhờ sự mở rộng quy mô của các khu công nghiệp công nghệ cao. Kéo theo đó là nhu cầu thuê đất xây nhà trọ, căn hộ dịch vụ cho chuyên gia và lao động tay nghề cao tăng trưởng bền vững.
3. **Pháp lý siết chặt mang lại tính ổn định**: Các chính sách mới liên quan đến siết chặt phân lô bán nền giúp thanh lọc thị trường, loại bỏ các dự án ảo kém chất lượng. Người mua chuyển sang hướng tìm kiếm các dự án có sổ sẵn đầy đủ, quy hoạch bài bản sạch sẽ.
4. **Xu hướng sở hữu căn hộ ven biển tăng nhiệt**: Vũng Tàu và Hồ Tràm ghi nhận lượng quan tâm lớn ở phân khúc nghỉ dưỡng phục vụ nhu cầu nghỉ ngơi cuối tuần của cư dân đô thị TP.HCM khi các tuyến giao thông rút ngắn thời gian di chuyển chỉ còn hơn 1.5 giờ.`,
    imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=600&q=80',
    date: '12/06/2026',
    readTime: '6 phút đọc'
  }
];

export default function HomeBlog({ language }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_BASE}/posts`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data.length > 0 ? data : BLOG_POSTS);
      } else {
        setPosts(BLOG_POSTS);
      }
    } catch (err) {
      console.warn('Backend API connection failed for blog news, using mock data:', err);
      setPosts(BLOG_POSTS);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPost = (post) => {
    setSelectedPost(post);
  };

  const handleClosePost = () => {
    setSelectedPost(null);
  };

  return (
    <section id="homeBlog" className="py-20 lg:py-28 bg-white dark:bg-[#090d16] transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16 reveal is-visible">
          <span className="block font-title text-brandGreen-700 dark:text-[#0df58b] text-xs font-bold uppercase tracking-[0.25em] mb-3">
            {language === 'vi' ? 'TIN TỨC & CHIA SẺ' : 'INSIGHTS & ARTICLE'}
          </span>
          <h2 className="text-3xl md:text-5xl font-title font-bold text-stone-950 dark:text-stone-50">
            {language === 'vi' ? 'Góc Chia Sẻ Kinh Nghiệm' : 'Financial & Real Estate Blog'}
          </h2>
          <div className="w-12 h-[2.5px] bg-brandGreen-600 dark:bg-[#0df58b] mx-auto mt-5 rounded-full" />
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article 
              key={post.id}
              onClick={() => handleOpenPost(post)}
              className="group bg-[#faf7f1] dark:bg-[#111726] border border-stone-200/60 dark:border-stone-850/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col hover:-translate-y-1"
            >
              {/* Image box */}
              <div className="relative h-48 overflow-hidden bg-stone-200">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Content box */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-4 text-[10px] text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="font-title text-base font-bold text-stone-900 dark:text-stone-50 group-hover:text-brandGreen-700 dark:group-hover:text-[#0df58b] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-stone-600 dark:text-stone-400 font-body text-xs line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-title font-bold uppercase tracking-wider text-brandGreen-750 dark:text-[#0df58b] group-hover:underline pt-2">
                  <span>{language === 'vi' ? 'Đọc bài viết' : 'Read Article'}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Article Reading Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-stone-950/70 dark:bg-black/80 backdrop-blur-[2px] flex items-center justify-center p-6 z-50 overflow-y-auto">
          <div className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-stone-850 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative max-h-[85vh] flex flex-col">
            
            {/* Modal Close Button */}
            <button
              onClick={handleClosePost}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors z-20"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            {/* Modal Body (Scrollable) */}
            <div className="overflow-y-auto flex-1 text-left">
              {/* Image banner */}
              <div className="h-64 w-full relative">
                <img
                  src={selectedPost.imageUrl}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
                <div className="absolute bottom-6 px-8 text-white space-y-2">
                  <div className="flex items-center gap-4 text-[10px] text-stone-300 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {selectedPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {selectedPost.readTime}
                    </span>
                  </div>
                  <h3 className="font-title text-xl md:text-2xl font-bold leading-tight">
                    {selectedPost.title}
                  </h3>
                </div>
              </div>

              {/* Text Area */}
              <div className="p-8">
                <div className="text-stone-600 dark:text-stone-300 font-body text-sm leading-relaxed whitespace-pre-line space-y-4">
                  {selectedPost.content}
                </div>
                
                {/* Footer close */}
                <div className="mt-8 pt-6 border-t border-stone-100 dark:border-stone-850 flex justify-end">
                  <button
                    onClick={handleClosePost}
                    className="px-5 py-2 rounded-full bg-stone-100 dark:bg-[#192135] text-stone-700 dark:text-stone-300 hover:bg-stone-200 font-title font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    {language === 'vi' ? 'Đóng lại' : 'Close'}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
