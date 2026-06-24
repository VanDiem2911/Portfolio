import { useState, useEffect } from 'react';
import { LogOut, Plus, Edit2, Trash2, Home, Trees, ShieldCheck, X, FileText, CheckCircle, HelpCircle, BookOpen, MessageSquare, Calendar, Clock, Eye, User, Mail, MailOpen, UploadCloud } from 'lucide-react';
import { API_BASE } from '../config';

export default function AdminDashboard({ language }) {
  const [activeTab, setActiveTab] = useState('properties'); // 'properties' | 'blogs' | 'leads'
  const [error, setError] = useState('');
  
  // Real Estate properties states
  const [properties, setProperties] = useState([]);
  const [loadingProps, setLoadingProps] = useState(true);
  const [showPropModal, setShowPropModal] = useState(false);
  const [editingPropId, setEditingPropId] = useState(null);

  // Property Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [area, setArea] = useState('');
  const [type, setType] = useState('house');
  const [imageUrl, setImageUrl] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [status, setStatus] = useState('available');

  // Blog posts states
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);

  // Blog Form State
  const [blogTitle, setBlogTitle] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogImageUrl, setBlogImageUrl] = useState('');
  const [blogDate, setBlogDate] = useState('');
  const [blogReadTime, setBlogReadTime] = useState('');

  // Leads states
  const [leads, setLeads] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [uploadingTarget, setUploadingTarget] = useState(null);

  const unreadCount = leads.filter(l => l.status !== 'read' && l.status !== 'replied').length;

  const getLoanTypeLabel = (loanType) => {
    const labels = {
      tinchap: language === 'vi' ? 'Vay tiêu dùng tín chấp' : 'Unsecured Loan',
      muanha: language === 'vi' ? 'Vay mua bất động sản' : 'Real Estate Loan',
      muaoto: language === 'vi' ? 'Vay mua ô tô trả góp' : 'Car Purchase Loan',
      kinhdoanh: language === 'vi' ? 'Vay sản xuất kinh doanh' : 'Business Loan',
      thetindung: language === 'vi' ? 'Mở thẻ tín dụng quốc tế' : 'Credit Card',
      khac: language === 'vi' ? 'Nhu cầu tư vấn tài chính khác' : 'Other Financial Needs',
      property_inquiry: language === 'vi' ? 'Hỏi Dự Án' : 'Project Inquiry'
    };

    return labels[loanType] || loanType || (language === 'vi' ? 'Vay vốn' : 'Service Lead');
  };

  const uploadImageToCloudinary = async (file, setImageValue, target) => {
    if (!file) return;

    const token = localStorage.getItem('adminToken');
    const formData = new FormData();
    formData.append('file', file);
    setUploadingTarget(target);

    try {
      const response = await fetch(`${API_BASE}/uploads/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setImageValue(data.url);
    } catch (err) {
      console.error(err);
      alert(language === 'vi'
        ? 'Không thể upload ảnh lên Cloudinary. Vui lòng kiểm tra cấu hình backend.'
        : 'Unable to upload image to Cloudinary. Please check backend configuration.');
    } finally {
      setUploadingTarget(null);
    }
  };

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.hash = '#/admin/login';
      return;
    }

    if (activeTab === 'properties') {
      fetchProperties();
    } else if (activeTab === 'blogs') {
      fetchBlogs();
    } else if (activeTab === 'leads') {
      fetchLeads();
    }
  }, [activeTab]);

  // ==================== PROPERTY CRUD ====================
  const fetchProperties = async () => {
    setLoadingProps(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE}/properties`);
      if (response.ok) {
        const data = await response.json();
        setProperties(data);
      } else {
        setError(language === 'vi' ? 'Lỗi khi tải danh sách bất động sản.' : 'Failed to fetch properties.');
      }
    } catch (err) {
      console.error(err);
      setError(language === 'vi' 
        ? 'Lỗi kết nối API backend. Vui lòng kiểm tra Java Spring Boot và MongoDB.' 
        : 'Backend API connection error. Check if Java Spring Boot and MongoDB are running.');
    } finally {
      setLoadingProps(false);
    }
  };

  const openAddPropModal = () => {
    setEditingPropId(null);
    setTitle('');
    setDescription('');
    setPrice('');
    setLocation('');
    setArea('');
    setType('house');
    setImageUrl('');
    setContactName('Thu Phạm'); // default agent name
    setContactPhone('0398989892');
    setStatus('available');
    setShowPropModal(true);
  };

  const openEditPropModal = (item) => {
    setEditingPropId(item.id);
    setTitle(item.title);
    setDescription(item.description || '');
    setPrice(item.price);
    setLocation(item.location);
    setArea(item.area.toString());
    setType(item.type);
    setImageUrl(item.imageUrl || '');
    setContactName(item.contactName);
    setContactPhone(item.contactPhone);
    setStatus(item.status);
    setShowPropModal(true);
  };

  const handlePropFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    const payload = {
      title,
      description,
      price,
      location,
      area: parseFloat(area),
      type,
      imageUrl,
      contactName,
      contactPhone,
      status
    };

    try {
      let url = `${API_BASE}/properties`;
      let method = 'POST';

      if (editingPropId) {
        url = `${API_BASE}/properties/${editingPropId}`;
        method = 'PUT';
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setShowPropModal(false);
        fetchProperties();
      } else {
        const errorData = await response.json();
        alert(errorData.error || (language === 'vi' ? 'Đã xảy ra lỗi khi lưu thông tin.' : 'Error saving property.'));
      }
    } catch (err) {
      console.error(err);
      // For local development mockup sandbox: if API fails, update local state directly
      if (editingPropId) {
        setProperties(prev => prev.map(p => p.id === editingPropId ? { ...p, ...payload, id: editingPropId } : p));
      } else {
        const fakeId = 'mock-prop-' + Math.random().toString(36).substr(2, 9);
        setProperties(prev => [...prev, { ...payload, id: fakeId, createdAt: new Date().toISOString() }]);
      }
      setShowPropModal(false);
      alert(language === 'vi' 
        ? 'Backend offline: Đã cập nhật tạm thời trên giao diện (Mock Mode).' 
        : 'Backend offline: Updated temporarily in memory (Mock Mode).');
    }
  };

  const handlePropDelete = async (id) => {
    const confirmDelete = window.confirm(
      language === 'vi' 
        ? 'Bạn có chắc chắn muốn xóa bất động sản này?' 
        : 'Are you sure you want to delete this listing?'
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch(`${API_BASE}/properties/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchProperties();
      } else {
        alert(language === 'vi' ? 'Lỗi khi xóa sản phẩm.' : 'Error deleting listing.');
      }
    } catch (err) {
      console.error(err);
      // Mock delete
      setProperties(prev => prev.filter(p => p.id !== id));
      alert(language === 'vi' 
        ? 'Backend offline: Đã xóa tạm thời trên giao diện (Mock Mode).' 
        : 'Backend offline: Deleted temporarily in memory (Mock Mode).');
    }
  };

  // ==================== BLOG CRUD ====================
  const fetchBlogs = async () => {
    setLoadingBlogs(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE}/posts`);
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
        setError(language === 'vi' ? 'Lỗi khi tải danh sách bài viết.' : 'Failed to fetch blog posts.');
      }
    } catch (err) {
      console.error(err);
      setError(language === 'vi' 
        ? 'Lỗi kết nối API bài viết. Vui lòng kiểm tra Java Spring Boot.' 
        : 'Failed to connect to blog API. Check Java Spring Boot.');
    } finally {
      setLoadingBlogs(false);
    }
  };

  const openAddBlogModal = () => {
    setEditingBlogId(null);
    setBlogTitle('');
    setBlogExcerpt('');
    setBlogContent('');
    setBlogImageUrl('');
    setBlogDate(new Date().toLocaleDateString('vi-VN'));
    setBlogReadTime('5 phút đọc');
    setShowBlogModal(true);
  };

  const openEditBlogModal = (item) => {
    setEditingBlogId(item.id);
    setBlogTitle(item.title);
    setBlogExcerpt(item.excerpt || '');
    setBlogContent(item.content || '');
    setBlogImageUrl(item.imageUrl || '');
    setBlogDate(item.date || '');
    setBlogReadTime(item.readTime || '');
    setShowBlogModal(true);
  };

  const handleBlogFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    const payload = {
      title: blogTitle,
      excerpt: blogExcerpt,
      content: blogContent,
      imageUrl: blogImageUrl,
      date: blogDate,
      readTime: blogReadTime
    };

    try {
      let url = `${API_BASE}/posts`;
      let method = 'POST';

      if (editingBlogId) {
        url = `${API_BASE}/posts/${editingBlogId}`;
        method = 'PUT';
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setShowBlogModal(false);
        fetchBlogs();
      } else {
        const errorData = await response.json();
        alert(errorData.error || (language === 'vi' ? 'Đã xảy ra lỗi khi lưu bài viết.' : 'Error saving article.'));
      }
    } catch (err) {
      console.error(err);
      // Fallback update
      if (editingBlogId) {
        setBlogs(prev => prev.map(b => b.id === editingBlogId ? { ...b, ...payload, id: editingBlogId } : b));
      } else {
        const fakeId = 'mock-blog-' + Math.random().toString(36).substr(2, 9);
        setBlogs(prev => [...prev, { ...payload, id: fakeId, createdAt: new Date().toISOString() }]);
      }
      setShowBlogModal(false);
      alert(language === 'vi' 
        ? 'Backend offline: Đã cập nhật tạm thời bài viết (Mock Mode).' 
        : 'Backend offline: Updated temporarily in memory (Mock Mode).');
    }
  };

  const handleBlogDelete = async (id) => {
    const confirmDelete = window.confirm(
      language === 'vi' 
        ? 'Bạn có chắc chắn muốn xóa bài viết này?' 
        : 'Are you sure you want to delete this article?'
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch(`${API_BASE}/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchBlogs();
      } else {
        alert(language === 'vi' ? 'Lỗi khi xóa bài viết.' : 'Error deleting article.');
      }
    } catch (err) {
      console.error(err);
      setBlogs(prev => prev.filter(b => b.id !== id));
      alert(language === 'vi' 
        ? 'Backend offline: Đã xóa tạm thời bài viết (Mock Mode).' 
        : 'Backend offline: Deleted temporarily in memory (Mock Mode).');
    }
  };

  // ==================== LEADS MANAGEMENT ====================
  const fetchLeads = async () => {
    setLoadingLeads(true);
    setError('');
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_BASE}/leads`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
      } else {
        setError(language === 'vi' ? 'Lỗi khi tải danh sách tư vấn.' : 'Failed to fetch inquiries.');
      }
    } catch (err) {
      console.error('Failed to load leads from DB:', err);
      setError(language === 'vi' ? 'Không thể kết nối đến máy chủ để tải yêu cầu tư vấn.' : 'Could not connect to server to fetch inquiries.');
    } finally {
      setLoadingLeads(false);
    }
  };

  const updateLeadStatus = async (id, newStatus) => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_BASE}/leads/${id}/status?status=${newStatus}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const updatedLead = await response.json();
        setLeads(prev => prev.map(lead => lead.id === id ? updatedLead : lead));
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead(updatedLead);
        }
      } else {
        console.error('Failed to update status on server');
      }
    } catch (err) {
      console.error('Failed to update lead status in DB:', err);
    }
  };

  const handleViewLeadDetail = (item) => {
    setSelectedLead(item);
    if (!item.status || item.status === 'unread') {
      updateLeadStatus(item.id, 'read');
    }
  };

  const handleDeleteLead = async (id) => {
    const confirmDelete = window.confirm(
      language === 'vi' 
        ? 'Bạn có chắc chắn muốn xóa yêu cầu tư vấn này?' 
        : 'Are you sure you want to delete this inquiry?'
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_BASE}/leads/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setLeads(prev => prev.filter(lead => lead.id !== id));
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead(null);
        }
      } else {
        alert(language === 'vi' ? 'Không thể xóa yêu cầu.' : 'Failed to delete inquiry.');
      }
    } catch (err) {
      console.error('Failed to delete lead in DB:', err);
      setLeads(prev => prev.filter(lead => lead.id !== id));
    }
  };

  const handleClearAllLeads = async () => {
    const confirmClear = window.confirm(
      language === 'vi' 
        ? 'Bạn có chắc chắn muốn xóa TẤT CẢ các yêu cầu tư vấn?' 
        : 'Are you sure you want to delete ALL inquiries?'
    );
    if (!confirmClear) return;

    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_BASE}/leads/clear-all`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setLeads([]);
        setSelectedLead(null);
      } else {
        alert(language === 'vi' ? 'Không thể xóa danh sách.' : 'Failed to clear inquiries.');
      }
    } catch (err) {
      console.error('Failed to clear leads in DB:', err);
      setLeads([]);
      setSelectedLead(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.hash = '#/admin/login';
  };

  return (
    <section className="min-h-screen pt-28 pb-20 px-6 bg-stone-50 dark:bg-[#090d16] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-stone-200 dark:border-stone-850 pb-6 mb-8">
          <div>
            <h1 className="font-title text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-stone-50 flex items-center gap-2">
              <ShieldCheck className="text-brandGreen-600 dark:text-[#0df58b]" />
              {language === 'vi' ? 'HỆ THỐNG QUẢN TRỊ' : 'ADMINISTRATION PORTAL'}
            </h1>
            <p className="text-stone-500 dark:text-stone-400 text-xs font-semibold uppercase tracking-wider mt-1.5">
              {language === 'vi' ? 'Quản lý toàn bộ nội dung website & dự án' : 'Console for dynamic real estate, news, and inquiries'}
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {activeTab === 'properties' && (
              <button
                onClick={openAddPropModal}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-brandGreen-600 hover:bg-brandGreen-700 dark:bg-[#0df58b] dark:text-stone-950 dark:hover:bg-[#0df58b]/80 text-white font-title font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-[0.98]"
              >
                <Plus size={15} />
                {language === 'vi' ? 'Thêm mới' : 'Add Property'}
              </button>
            )}
            {activeTab === 'blogs' && (
              <button
                onClick={openAddBlogModal}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-brandGreen-600 hover:bg-brandGreen-700 dark:bg-[#0df58b] dark:text-stone-950 dark:hover:bg-[#0df58b]/80 text-white font-title font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-[0.98]"
              >
                <Plus size={15} />
                {language === 'vi' ? 'Thêm bài viết' : 'Add Post'}
              </button>
            )}
            {activeTab === 'leads' && leads.length > 0 && (
              <button
                onClick={handleClearAllLeads}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-red-200 dark:border-red-950/40 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400 font-title font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <Trash2 size={14} />
                {language === 'vi' ? 'Xóa tất cả' : 'Clear All'}
              </button>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-stone-300 dark:border-stone-850 text-stone-600 dark:text-stone-400 hover:text-red-550 dark:hover:text-red-400 font-title font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <LogOut size={14} />
              {language === 'vi' ? 'Thoát' : 'Logout'}
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex border-b border-stone-200 dark:border-stone-850 gap-2 mb-8">
          <button
            onClick={() => setActiveTab('properties')}
            className={`pb-3.5 px-4 text-xs font-title font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'properties'
                ? 'border-brandGreen-600 text-brandGreen-700 dark:border-[#0df58b] dark:text-[#0df58b]'
                : 'border-transparent text-stone-400 hover:text-stone-600 dark:hover:text-stone-200'
            }`}
          >
            <Home size={14} />
            {language === 'vi' ? 'Quản lý Bất Động Sản' : 'Properties'}
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`pb-3.5 px-4 text-xs font-title font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'blogs'
                ? 'border-brandGreen-600 text-brandGreen-700 dark:border-[#0df58b] dark:text-[#0df58b]'
                : 'border-transparent text-stone-400 hover:text-stone-600 dark:hover:text-stone-200'
            }`}
          >
            <BookOpen size={14} />
            {language === 'vi' ? 'Quản lý Tin Tức / Blog' : 'Blog Posts'}
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`pb-3.5 px-4 text-xs font-title font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 relative ${
              activeTab === 'leads'
                ? 'border-brandGreen-600 text-brandGreen-700 dark:border-[#0df58b] dark:text-[#0df58b]'
                : 'border-transparent text-stone-400 hover:text-stone-600 dark:hover:text-stone-200'
            }`}
          >
            <MessageSquare size={14} />
            {language === 'vi' ? 'Yêu Cầu Tư Vấn' : 'Consultations'}
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-white rounded-full text-[10px] w-[22px] h-[22px] flex items-center justify-center font-bold font-title shadow-md animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-2xl text-amber-800 dark:text-amber-300 text-xs font-semibold flex items-center gap-2 animate-pulse">
            <HelpCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* ==================== TAB 1: PROPERTIES ==================== */}
        {activeTab === 'properties' && (
          loadingProps ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-brandGreen-600 border-t-transparent dark:border-[#0df58b] dark:border-t-transparent rounded-full animate-spin" />
            </div>
          ) : properties.length === 0 ? (
            <div className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-stone-850 p-16 rounded-3xl text-center space-y-4">
              <FileText size={48} className="text-stone-300 dark:text-stone-750 mx-auto" />
              <h3 className="font-title text-base font-bold text-stone-700 dark:text-stone-300">
                {language === 'vi' ? 'Chưa có bất động sản nào' : 'No properties in database'}
              </h3>
              <p className="text-stone-400 text-xs max-w-xs mx-auto">
                {language === 'vi' ? 'Hãy click nút Thêm Mới ở góc phải để tạo bất động sản.' : 'Click the Add Property button to register a listing.'}
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-stone-850 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-stone-100 dark:border-stone-800 text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-widest bg-stone-50/50 dark:bg-[#0d121f]/50">
                      <th className="py-4 px-6">{language === 'vi' ? 'Hình ảnh / Dự án' : 'Asset / Project'}</th>
                      <th className="py-4 px-6">{language === 'vi' ? 'Loại' : 'Type'}</th>
                      <th className="py-4 px-6">{language === 'vi' ? 'Giá' : 'Price'}</th>
                      <th className="py-4 px-6">{language === 'vi' ? 'Địa điểm' : 'Location'}</th>
                      <th className="py-4 px-6">{language === 'vi' ? 'Diện tích' : 'Area'}</th>
                      <th className="py-4 px-6">{language === 'vi' ? 'Trạng thái' : 'Status'}</th>
                      <th className="py-4 px-6 text-right">{language === 'vi' ? 'Hành động' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80 text-stone-700 dark:text-stone-300 text-xs">
                    {properties.map((item) => (
                      <tr key={item.id} className="hover:bg-stone-50/30 dark:hover:bg-[#161d2d]/30 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <img
                              src={item.imageUrl || 'https://picsum.photos/seed/realestate/200/150'}
                              alt={item.title}
                              className="w-16 h-12 object-cover rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900"
                            />
                            <span className="font-bold text-stone-900 dark:text-stone-100 line-clamp-1 max-w-[200px] sm:max-w-xs">
                              {item.title}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold font-title tracking-wider uppercase ${
                            item.type === 'house'
                              ? 'bg-brandBlue-50 text-brandBlue-600 dark:bg-brandBlue-950/40 dark:text-brandBlue-100'
                              : 'bg-amber-50 text-amber-700 dark:bg-amber-950/35 dark:text-amber-200'
                          }`}>
                            {item.type === 'house' ? <Home size={9} /> : <Trees size={9} />}
                            {item.type === 'house' ? (language === 'vi' ? 'Nhà' : 'House') : (language === 'vi' ? 'Đất' : 'Land')}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-title font-bold text-brandGreen-700 dark:text-[#0df58b]">
                          {item.price}
                        </td>
                        <td className="py-4 px-6 max-w-[150px] truncate">{item.location}</td>
                        <td className="py-4 px-6 font-semibold">{item.area} m²</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold font-title tracking-wider uppercase ${
                            item.status === 'available'
                              ? 'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400'
                              : 'bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400'
                          }`}>
                            {item.status === 'available' ? (language === 'vi' ? 'Mở bán' : 'Active') : (language === 'vi' ? 'Đã bán' : 'Sold')}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditPropModal(item)}
                              title={language === 'vi' ? 'Sửa' : 'Edit'}
                              className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400 hover:text-brandGreen-600 dark:hover:text-[#0df58b] transition-colors"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handlePropDelete(item.id)}
                              title={language === 'vi' ? 'Xóa' : 'Delete'}
                              className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        )}

        {/* ==================== TAB 2: BLOG POSTS ==================== */}
        {activeTab === 'blogs' && (
          loadingBlogs ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-brandGreen-600 border-t-transparent dark:border-[#0df58b] dark:border-t-transparent rounded-full animate-spin" />
            </div>
          ) : blogs.length === 0 ? (
            <div className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-stone-850 p-16 rounded-3xl text-center space-y-4">
              <BookOpen size={48} className="text-stone-300 dark:text-stone-750 mx-auto" />
              <h3 className="font-title text-base font-bold text-stone-700 dark:text-stone-300">
                {language === 'vi' ? 'Chưa có bài viết nào' : 'No articles in database'}
              </h3>
              <p className="text-stone-400 text-xs max-w-xs mx-auto">
                {language === 'vi' ? 'Hãy click nút Thêm Bài Viết để tạo bài chia sẻ đầu tiên.' : 'Click the Add Post button to write your first article.'}
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-stone-850 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-stone-100 dark:border-stone-800 text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-widest bg-stone-50/50 dark:bg-[#0d121f]/50">
                      <th className="py-4 px-6">{language === 'vi' ? 'Hình ảnh / Tiêu đề' : 'Cover / Title'}</th>
                      <th className="py-4 px-6">{language === 'vi' ? 'Ngày viết' : 'Date'}</th>
                      <th className="py-4 px-6">{language === 'vi' ? 'Thời gian đọc' : 'Read Time'}</th>
                      <th className="py-4 px-6">{language === 'vi' ? 'Mô tả ngắn' : 'Excerpt'}</th>
                      <th className="py-4 px-6 text-right">{language === 'vi' ? 'Hành động' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80 text-stone-700 dark:text-stone-300 text-xs">
                    {blogs.map((item) => (
                      <tr key={item.id} className="hover:bg-stone-50/30 dark:hover:bg-[#161d2d]/30 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <img
                              src={item.imageUrl || 'https://picsum.photos/seed/blog/200/150'}
                              alt={item.title}
                              className="w-16 h-12 object-cover rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900"
                            />
                            <span className="font-bold text-stone-900 dark:text-stone-100 line-clamp-1 max-w-[200px] sm:max-w-xs">
                              {item.title}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-stone-500 dark:text-stone-400 font-medium">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={11} />
                            {item.date}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-semibold text-brandGreen-700 dark:text-[#0df58b]">
                          <span className="flex items-center gap-1.5">
                            <Clock size={11} />
                            {item.readTime}
                          </span>
                        </td>
                        <td className="py-4 px-6 max-w-[200px] truncate text-stone-400">{item.excerpt}</td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditBlogModal(item)}
                              title={language === 'vi' ? 'Sửa' : 'Edit'}
                              className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400 hover:text-brandGreen-600 dark:hover:text-[#0df58b] transition-colors"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleBlogDelete(item.id)}
                              title={language === 'vi' ? 'Xóa' : 'Delete'}
                              className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        )}

        {/* ==================== TAB 3: LEADS ==================== */}
        {activeTab === 'leads' && (
          loadingLeads ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-brandGreen-600 border-t-transparent dark:border-[#0df58b] dark:border-t-transparent rounded-full animate-spin" />
            </div>
          ) : leads.length === 0 ? (
            <div className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-stone-850 p-16 rounded-3xl text-center space-y-4">
              <MessageSquare size={48} className="text-stone-300 dark:text-stone-750 mx-auto" />
              <h3 className="font-title text-base font-bold text-stone-700 dark:text-stone-300">
                {language === 'vi' ? 'Chưa có yêu cầu tư vấn nào' : 'No inquiries yet'}
              </h3>
              <p className="text-stone-400 text-xs max-w-xs mx-auto">
                {language === 'vi' ? 'Yêu cầu tư vấn từ khách hàng gửi qua form sẽ được hiển thị tại đây.' : 'Inquiries submitted by visitors will list here.'}
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-stone-850 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-stone-100 dark:border-stone-800 text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-widest bg-stone-50/50 dark:bg-[#0d121f]/50">
                      <th className="py-4 px-6">{language === 'vi' ? 'Khách hàng / SĐT' : 'Client / Phone'}</th>
                      <th className="py-4 px-6">{language === 'vi' ? 'Nhu cầu / Dự án' : 'Category / Project'}</th>
                      <th className="py-4 px-6">{language === 'vi' ? 'Email' : 'Email'}</th>
                      <th className="py-4 px-6">{language === 'vi' ? 'Ngày gửi' : 'Submitted At'}</th>
                      <th className="py-4 px-6">{language === 'vi' ? 'Trạng thái' : 'Status'}</th>
                      <th className="py-4 px-6">{language === 'vi' ? 'Tin nhắn' : 'Message'}</th>
                      <th className="py-4 px-6 text-right">{language === 'vi' ? 'Hành động' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80 text-stone-700 dark:text-stone-300 text-xs">
                    {leads.map((item) => (
                      <tr key={item.id} className="hover:bg-stone-50/30 dark:hover:bg-[#161d2d]/30 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-stone-900 dark:text-stone-50">{item.name}</span>
                            <span className="text-stone-400 font-mono text-[10px]">{item.phone}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          {item.loanType === 'property_inquiry' ? (
                            <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold font-title tracking-wider bg-brandBlue-50 text-brandBlue-600 dark:bg-brandBlue-950/40 dark:text-brandBlue-100 uppercase">
                              {getLoanTypeLabel(item.loanType)}
                            </span>
                          ) : (
                            <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold font-title tracking-wider bg-brandGreen-50 text-brandGreen-700 dark:bg-brandGreen-950/30 dark:text-[#0df58b] uppercase">
                              {getLoanTypeLabel(item.loanType)}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-stone-500 dark:text-stone-400">{item.email || '—'}</td>
                        <td className="py-4 px-6 text-stone-400 font-mono text-[10px]">
                          {item.submittedAt ? new Date(item.submittedAt).toLocaleString('vi-VN') : '—'}
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold font-title tracking-wider uppercase ${
                            item.status === 'replied'
                              ? 'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400'
                              : item.status === 'read'
                              ? 'bg-blue-50 text-blue-750 dark:bg-blue-950/30 dark:text-blue-300'
                              : 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 animate-pulse'
                          }`}>
                            {item.status === 'replied'
                              ? (language === 'vi' ? 'Đã trả lời' : 'Replied')
                              : item.status === 'read'
                              ? (language === 'vi' ? 'Đã xem' : 'Seen')
                              : (language === 'vi' ? 'Mới' : 'New')}
                          </span>
                        </td>
                        <td className="py-4 px-6 max-w-[200px] truncate text-stone-500 dark:text-stone-400">{item.message}</td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleViewLeadDetail(item)}
                              title={language === 'vi' ? 'Xem chi tiết' : 'View Message'}
                              className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400 hover:text-brandGreen-600 dark:hover:text-[#0df58b] transition-colors"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              onClick={() => {
                                const newStatus = (item.status === 'unread' || !item.status) ? 'read' : 'unread';
                                updateLeadStatus(item.id, newStatus);
                              }}
                              title={(item.status === 'unread' || !item.status)
                                ? (language === 'vi' ? 'Đánh dấu đã xem' : 'Mark as read')
                                : (language === 'vi' ? 'Đánh dấu chưa xem' : 'Mark as unread')}
                              className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              {(item.status === 'unread' || !item.status) ? <Mail size={14} /> : <MailOpen size={14} />}
                            </button>
                            <button
                              onClick={() => {
                                const newStatus = item.status === 'replied' ? 'read' : 'replied';
                                updateLeadStatus(item.id, newStatus);
                              }}
                              title={item.status === 'replied'
                                ? (language === 'vi' ? 'Chưa trả lời' : 'Mark as unreplied')
                                : (language === 'vi' ? 'Đánh dấu đã trả lời' : 'Mark as replied')}
                              className={`p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors ${
                                item.status === 'replied'
                                  ? 'text-green-600 dark:text-green-400 hover:text-green-700'
                                  : 'text-stone-500 dark:text-stone-400 hover:text-green-600'
                              }`}
                            >
                              <CheckCircle size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteLead(item.id)}
                              title={language === 'vi' ? 'Xóa' : 'Delete'}
                              className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        )}

        {/* ==================== CREATE/EDIT PROP FORM MODAL ==================== */}
        {showPropModal && (
          <div className="fixed inset-0 bg-stone-950/70 dark:bg-black/80 backdrop-blur-[2px] flex items-center justify-center p-6 z-50 overflow-y-auto">
            <div className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-stone-850 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
              
              {/* Modal header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-stone-100 dark:border-stone-800">
                <h3 className="font-title text-base font-bold text-stone-900 dark:text-stone-50 flex items-center gap-1.5">
                  {editingPropId ? <Edit2 size={16} /> : <Plus size={16} />}
                  {editingPropId 
                    ? (language === 'vi' ? 'Chỉnh Sửa Bất Động Sản' : 'Edit Listing') 
                    : (language === 'vi' ? 'Thêm Mới Bất Động Sản' : 'New Listing')}
                </h3>
                <button
                  onClick={() => setShowPropModal(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form container scroll */}
              <form onSubmit={handlePropFormSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
                
                {/* Row 1: Title */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                    {language === 'vi' ? 'Tiêu đề dự án' : 'Project Title'}
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={language === 'vi' ? 'Nhà phố mặt tiền đường rộng rãi...' : 'Luxury villa near lake...'}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-[#192135] border border-stone-200 dark:border-stone-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen-600 dark:focus:ring-[#0df58b] text-stone-900 dark:text-white"
                  />
                </div>

                {/* Row 2: Type, Price, Area */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                      {language === 'vi' ? 'Phân loại đất / nhà' : 'Property Type'}
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-[#192135] border border-stone-200 dark:border-stone-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen-600 dark:focus:ring-[#0df58b] text-stone-900 dark:text-white font-semibold"
                    >
                      <option value="house">{language === 'vi' ? 'Bán Nhà' : 'House'}</option>
                      <option value="land">{language === 'vi' ? 'Bán Đất' : 'Land'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                      {language === 'vi' ? 'Giá bán niêm yết' : 'Listed Price'}
                    </label>
                    <input
                      type="text"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g. 3.2 tỷ, 850 triệu"
                      className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-[#192135] border border-stone-200 dark:border-stone-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen-600 dark:focus:ring-[#0df58b] text-stone-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                      {language === 'vi' ? 'Diện tích (m²)' : 'Area (m²)'}
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      step="any"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="e.g. 100"
                      className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-[#192135] border border-stone-200 dark:border-stone-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen-600 dark:focus:ring-[#0df58b] text-stone-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Row 3: Location */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                    {language === 'vi' ? 'Địa chỉ chi tiết / Khu vực' : 'Detailed Address / Location'}
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={language === 'vi' ? 'VD: 123 Quốc lộ 13, Bến Cát, Bình Dương' : 'e.g. 123 Highway 13, Ben Cat, Binh Duong'}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-[#192135] border border-stone-200 dark:border-stone-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen-600 dark:focus:ring-[#0df58b] text-stone-900 dark:text-white"
                  />
                  <p className="mt-1.5 text-[10px] font-medium text-stone-400 dark:text-stone-500">
                    {language === 'vi' ? 'Địa chỉ này sẽ được dùng để hiển thị vị trí trên Google Maps.' : 'This address will be used to display the listing on Google Maps.'}
                  </p>
                </div>

                {/* Row 4: Image Upload */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                    {language === 'vi' ? 'Hình ảnh dự án' : 'Project Image'}
                  </label>
                  <label className="mb-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-stone-300 bg-stone-50 px-3.5 py-4 text-xs font-bold uppercase tracking-wider text-stone-600 transition-colors hover:border-brandGreen-600 hover:text-brandGreen-700 dark:border-stone-700/80 dark:bg-[#192135] dark:text-stone-300 dark:hover:border-[#0df58b] dark:hover:text-[#0df58b]">
                    <UploadCloud size={16} />
                    {uploadingTarget === 'property'
                      ? (language === 'vi' ? 'Đang upload...' : 'Uploading...')
                      : (language === 'vi' ? 'Chọn ảnh từ máy' : 'Choose image from device')}
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      disabled={uploadingTarget === 'property'}
                      onChange={(e) => uploadImageToCloudinary(e.target.files?.[0], setImageUrl, 'property')}
                    />
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder={language === 'vi' ? 'URL Cloudinary sẽ tự điền sau khi upload' : 'Cloudinary URL will appear after upload'}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-[#192135] border border-stone-200 dark:border-stone-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen-600 dark:focus:ring-[#0df58b] text-stone-900 dark:text-white"
                  />
                </div>

                {/* Row 5: Contact Name, Contact Phone, Status */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                      {language === 'vi' ? 'Tên chuyên viên phụ trách' : 'Responsible Agent'}
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Thu Phạm"
                      className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-[#192135] border border-stone-200 dark:border-stone-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen-600 dark:focus:ring-[#0df58b] text-stone-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                      {language === 'vi' ? 'SĐT chuyên viên' : 'Agent Phone'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="e.g. 0398989892"
                      className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-[#192135] border border-stone-200 dark:border-stone-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen-600 dark:focus:ring-[#0df58b] text-stone-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                      {language === 'vi' ? 'Trạng thái giao dịch' : 'Transaction Status'}
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-[#192135] border border-stone-200 dark:border-stone-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen-600 dark:focus:ring-[#0df58b] text-stone-900 dark:text-white font-semibold"
                    >
                      <option value="available">{language === 'vi' ? 'Mở bán (Available)' : 'Active (Available)'}</option>
                      <option value="sold">{language === 'vi' ? 'Đã bán (Sold)' : 'Archived (Sold)'}</option>
                    </select>
                  </div>
                </div>

                {/* Row 6: Description */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                    {language === 'vi' ? 'Mô tả chi tiết dự án' : 'Detailed Description'}
                  </label>
                  <textarea
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={language === 'vi' ? 'Nhập thông tin mô tả chi tiết bất động sản...' : 'Enter details description...'}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-[#192135] border border-stone-200 dark:border-stone-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen-600 dark:focus:ring-[#0df58b] text-stone-900 dark:text-white"
                  />
                </div>

                {/* Footer buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
                  <button
                    type="button"
                    onClick={() => setShowPropModal(false)}
                    className="px-5 py-2.5 rounded-full border border-stone-200 dark:border-stone-850 hover:bg-stone-50 dark:hover:bg-[#192135] text-stone-600 dark:text-stone-300 font-title font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    {language === 'vi' ? 'Hủy' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    disabled={uploadingTarget === 'property'}
                    className="px-5 py-2.5 rounded-full bg-brandGreen-600 hover:bg-brandGreen-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#0df58b] dark:text-stone-950 dark:hover:bg-[#0df58b]/80 text-white font-title font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                  >
                    {uploadingTarget === 'property'
                      ? (language === 'vi' ? 'Đang upload...' : 'Uploading...')
                      : (language === 'vi' ? 'Lưu lại' : 'Save')}
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* ==================== CREATE/EDIT BLOG FORM MODAL ==================== */}
        {showBlogModal && (
          <div className="fixed inset-0 bg-stone-950/70 dark:bg-black/80 backdrop-blur-[2px] flex items-center justify-center p-6 z-50 overflow-y-auto">
            <div className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-stone-850 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
              
              {/* Modal header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-stone-100 dark:border-stone-800">
                <h3 className="font-title text-base font-bold text-stone-900 dark:text-stone-50 flex items-center gap-1.5">
                  {editingBlogId ? <Edit2 size={16} /> : <Plus size={16} />}
                  {editingBlogId 
                    ? (language === 'vi' ? 'Chỉnh Sửa Bài Viết' : 'Edit Post') 
                    : (language === 'vi' ? 'Thêm Bài Viết Mới' : 'New Blog Post')}
                </h3>
                <button
                  onClick={() => setShowBlogModal(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form container scroll */}
              <form onSubmit={handleBlogFormSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
                
                {/* Row 1: Title */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                    {language === 'vi' ? 'Tiêu đề bài viết' : 'Article Title'}
                  </label>
                  <input
                    type="text"
                    required
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    placeholder={language === 'vi' ? 'e.g. 5 Lưu ý quan trọng khi mua đất nền...' : 'e.g. 5 rules to borrow safety...'}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-[#192135] border border-stone-200 dark:border-stone-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen-600 dark:focus:ring-[#0df58b] text-stone-900 dark:text-white"
                  />
                </div>

                {/* Row 2: Date & Read Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                      {language === 'vi' ? 'Ngày đăng' : 'Publish Date'}
                    </label>
                    <input
                      type="text"
                      required
                      value={blogDate}
                      onChange={(e) => setBlogDate(e.target.value)}
                      placeholder="e.g. 24/06/2026"
                      className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-[#192135] border border-stone-200 dark:border-stone-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen-600 dark:focus:ring-[#0df58b] text-stone-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                      {language === 'vi' ? 'Thời gian đọc' : 'Read Time'}
                    </label>
                    <input
                      type="text"
                      required
                      value={blogReadTime}
                      onChange={(e) => setBlogReadTime(e.target.value)}
                      placeholder="e.g. 5 phút đọc"
                      className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-[#192135] border border-stone-200 dark:border-stone-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen-600 dark:focus:ring-[#0df58b] text-stone-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Row 3: Image Upload */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                    {language === 'vi' ? 'Ảnh đại diện bài viết' : 'Cover Image'}
                  </label>
                  <label className="mb-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-stone-300 bg-stone-50 px-3.5 py-4 text-xs font-bold uppercase tracking-wider text-stone-600 transition-colors hover:border-brandGreen-600 hover:text-brandGreen-700 dark:border-stone-700/80 dark:bg-[#192135] dark:text-stone-300 dark:hover:border-[#0df58b] dark:hover:text-[#0df58b]">
                    <UploadCloud size={16} />
                    {uploadingTarget === 'blog'
                      ? (language === 'vi' ? 'Đang upload...' : 'Uploading...')
                      : (language === 'vi' ? 'Chọn ảnh từ máy' : 'Choose image from device')}
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      disabled={uploadingTarget === 'blog'}
                      onChange={(e) => uploadImageToCloudinary(e.target.files?.[0], setBlogImageUrl, 'blog')}
                    />
                  </label>
                  <input
                    type="url"
                    value={blogImageUrl}
                    onChange={(e) => setBlogImageUrl(e.target.value)}
                    placeholder={language === 'vi' ? 'URL Cloudinary sẽ tự điền sau khi upload' : 'Cloudinary URL will appear after upload'}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-[#192135] border border-stone-200 dark:border-stone-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen-600 dark:focus:ring-[#0df58b] text-stone-900 dark:text-white"
                  />
                </div>

                {/* Row 4: Excerpt */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                    {language === 'vi' ? 'Tóm tắt / Mô tả ngắn' : 'Short Excerpt'}
                  </label>
                  <input
                    type="text"
                    required
                    value={blogExcerpt}
                    onChange={(e) => setBlogExcerpt(e.target.value)}
                    placeholder={language === 'vi' ? 'Nhập tóm tắt ngắn hiển thị ở trang chủ...' : 'Enter a brief excerpt...'}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-[#192135] border border-stone-200 dark:border-stone-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen-600 dark:focus:ring-[#0df58b] text-stone-900 dark:text-white"
                  />
                </div>

                {/* Row 5: Content */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                    {language === 'vi' ? 'Nội dung bài viết' : 'Full Content'}
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    placeholder={language === 'vi' ? 'Nhập toàn bộ nội dung bài viết chia sẻ...' : 'Enter full blog post content...'}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 dark:bg-[#192135] border border-stone-200 dark:border-stone-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen-600 dark:focus:ring-[#0df58b] text-stone-900 dark:text-white"
                  />
                </div>

                {/* Footer buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
                  <button
                    type="button"
                    onClick={() => setShowBlogModal(false)}
                    className="px-5 py-2.5 rounded-full border border-stone-200 dark:border-stone-850 hover:bg-stone-50 dark:hover:bg-[#192135] text-stone-600 dark:text-stone-300 font-title font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    {language === 'vi' ? 'Hủy' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    disabled={uploadingTarget === 'blog'}
                    className="px-5 py-2.5 rounded-full bg-brandGreen-600 hover:bg-brandGreen-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#0df58b] dark:text-stone-950 dark:hover:bg-[#0df58b]/80 text-white font-title font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                  >
                    {uploadingTarget === 'blog'
                      ? (language === 'vi' ? 'Đang upload...' : 'Uploading...')
                      : (language === 'vi' ? 'Lưu lại' : 'Save')}
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* ==================== VIEW LEAD MESSAGE DETAIL MODAL ==================== */}
        {selectedLead && (
          <div className="fixed inset-0 bg-stone-950/70 dark:bg-black/80 backdrop-blur-[2px] flex items-center justify-center p-6 z-50">
            <div className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-stone-850 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative flex flex-col max-h-[85vh]">
              
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-stone-100 dark:border-stone-800">
                <h3 className="font-title text-sm font-bold text-stone-900 dark:text-stone-50 flex items-center gap-1.5">
                  <User size={16} className="text-brandGreen-600 dark:text-[#0df58b]" />
                  {language === 'vi' ? 'Yêu Cầu Từ Khách Hàng' : 'Inquiry Details'}
                </h3>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto space-y-4 text-xs text-stone-700 dark:text-stone-300">
                
                <div className="grid grid-cols-2 gap-4 bg-stone-50 dark:bg-[#192135]/60 p-4 rounded-xl border border-stone-250/20">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider block mb-0.5">
                      {language === 'vi' ? 'Họ và tên' : 'Client Name'}
                    </span>
                    <span className="font-bold text-stone-950 dark:text-stone-50 text-sm">{selectedLead.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider block mb-0.5">
                      {language === 'vi' ? 'Số điện thoại' : 'Phone'}
                    </span>
                    <a href={`tel:${selectedLead.phone}`} className="font-bold text-brandGreen-700 dark:text-[#0df58b] text-sm underline block">
                      {selectedLead.phone}
                    </a>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider block mb-1">
                    Email
                  </span>
                  <span className="font-semibold">{selectedLead.email || '—'}</span>
                </div>

                <div>
                  <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider block mb-1">
                    {language === 'vi' ? 'Nhu cầu vay vốn' : 'Preferred Service'}
                  </span>
                  <span className="inline-flex px-2.5 py-1 rounded-full bg-brandGreen-50 text-brandGreen-700 dark:bg-brandGreen-950/30 dark:text-[#0df58b] font-title font-bold text-[10px] uppercase tracking-wider">
                    {getLoanTypeLabel(selectedLead.loanType)}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider block mb-1">
                    {language === 'vi' ? 'Ngày gửi yêu cầu' : 'Submitted Date'}
                  </span>
                  <span className="font-medium text-stone-550 dark:text-stone-400">
                    {selectedLead.submittedAt ? new Date(selectedLead.submittedAt).toLocaleString('vi-VN') : '—'}
                  </span>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider block mb-2">
                    {language === 'vi' ? 'Nội dung tin nhắn / Yêu cầu' : 'Message details'}
                  </span>
                  <div className="bg-stone-50 dark:bg-[#192135]/40 border border-stone-200 dark:border-stone-800 p-4 rounded-xl leading-relaxed whitespace-pre-wrap font-body text-[13px] text-stone-800 dark:text-stone-200">
                    {selectedLead.message}
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-stone-50 dark:bg-[#0d121f]/50 border-t border-stone-100 dark:border-stone-800 flex justify-end gap-2">
                <button
                  onClick={() => {
                    handleDeleteLead(selectedLead.id);
                  }}
                  className="flex items-center gap-1 px-4 py-2 rounded-full border border-red-200 dark:border-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 font-title font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  <Trash2 size={12} />
                  {language === 'vi' ? 'Xóa yêu cầu' : 'Delete Lead'}
                </button>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-700 font-title font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  {language === 'vi' ? 'Đóng lại' : 'Close'}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
