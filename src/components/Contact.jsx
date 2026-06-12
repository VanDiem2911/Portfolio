import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare, X, CheckCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Contact({ language }) {
  const data = portfolioData[language].contact;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    loanType: 'tinchap',
    message: ''
  });

  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      addToast(language === 'vi' ? 'Vui lòng nhập họ tên của bạn!' : 'Please enter your name!', 'error');
      return;
    }
    if (!formData.phone.trim()) {
      addToast(language === 'vi' ? 'Vui lòng nhập số điện thoại!' : 'Please enter your phone number!', 'error');
      return;
    }

    const phoneRegex = /^[0-9+ ]{9,15}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      addToast(
        language === 'vi' 
          ? 'Số điện thoại không đúng định dạng!' 
          : 'Invalid phone number format!', 
        'error'
      );
      return;
    }

    const newLead = {
      ...formData,
      id: Date.now(),
      submittedAt: new Date().toISOString()
    };

    try {
      const existingLeads = JSON.parse(localStorage.getItem('portfolio_leads') || '[]');
      existingLeads.push(newLead);
      localStorage.setItem('portfolio_leads', JSON.stringify(existingLeads));
      
      addToast(
        language === 'vi' 
          ? 'Gửi đăng ký tư vấn thành công! Tôi sẽ liên hệ lại sớm nhất.' 
          : 'Consultation request submitted! I will contact you shortly.', 
        'success'
      );

      setFormData({
        name: '',
        phone: '',
        email: '',
        loanType: 'tinchap',
        message: ''
      });
    } catch (error) {
      addToast(
        language === 'vi' ? 'Có lỗi xảy ra, vui lòng thử lại.' : 'An error occurred, please try again.',
        'error'
      );
    }
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white dark:bg-brandBeige-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="block font-title text-brandGreen-600 dark:text-brandGreen-600 text-xs font-bold uppercase tracking-widest mb-2">
            {data.subtitle}
          </span>
          <h2 className="inline-block text-3xl md:text-4xl font-title font-bold text-stone-900 dark:text-stone-50 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-brandBlue-600 dark:after:bg-brandBlue-500 after:rounded">
            {data.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Form Side */}
          <div className="lg:col-span-7 bg-brandBeige-50 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800/80 p-8 rounded-3xl shadow-sm reveal reveal-left">
            <h3 className="mb-6 font-bold text-lg text-stone-900 dark:text-stone-50">{data.formTitle}</h3>
            
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-bold font-title text-stone-700 dark:text-stone-300">{data.formFields.name} *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    placeholder={data.formFields.placeholderName}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="h-11 px-4 rounded-xl border border-stone-200 dark:border-stone-850 bg-white dark:bg-stone-950 text-sm focus:outline-none focus:border-brandBlue-600 dark:focus:border-brandBlue-500 transition-colors"
                  />
                </div>
                
                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-xs font-bold font-title text-stone-700 dark:text-stone-300">{data.formFields.phone} *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    required 
                    placeholder={data.formFields.placeholderPhone}
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="h-11 px-4 rounded-xl border border-stone-200 dark:border-stone-850 bg-white dark:bg-stone-950 text-sm focus:outline-none focus:border-brandBlue-600 dark:focus:border-brandBlue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-bold font-title text-stone-700 dark:text-stone-300">{data.formFields.email}</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder={data.formFields.placeholderEmail}
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-11 px-4 rounded-xl border border-stone-200 dark:border-stone-850 bg-white dark:bg-stone-950 text-sm focus:outline-none focus:border-brandBlue-600 dark:focus:border-brandBlue-500 transition-colors"
                />
              </div>

              {/* Loan Type */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="loanType" className="text-xs font-bold font-title text-stone-700 dark:text-stone-300">{data.formFields.loanType}</label>
                <select 
                  id="loanType" 
                  name="loanType"
                  value={formData.loanType}
                  onChange={handleInputChange}
                  className="h-11 px-4 rounded-xl border border-stone-200 dark:border-stone-850 bg-white dark:bg-stone-950 text-sm focus:outline-none focus:border-brandBlue-600 dark:focus:border-brandBlue-500 transition-colors appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2378716c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                    backgroundSize: '16px'
                  }}
                >
                  {data.loanOptions.map((opt) => (
                    <option value={opt.value} key={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-bold font-title text-stone-700 dark:text-stone-300">{data.formFields.message}</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="4" 
                  placeholder={data.formFields.placeholderMessage}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="p-4 rounded-xl border border-stone-200 dark:border-stone-850 bg-white dark:bg-stone-950 text-sm focus:outline-none focus:border-brandBlue-600 dark:focus:border-brandBlue-500 transition-colors resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm text-white bg-brandBlue-600 hover:bg-brandBlue-700 hover:shadow transition-all duration-300 cursor-pointer self-start"
              >
                <Send size={16} />
                {data.formFields.submit}
              </button>
            </form>
          </div>

          {/* Info Side */}
          <div className="lg:col-span-5 flex flex-col gap-8 reveal reveal-right delay-200">
            <div className="flex flex-col gap-4">
              {/* Phone item */}
              <div className="flex gap-4 items-start bg-brandBeige-50 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800/80 p-5 rounded-2xl premium-card-hover">
                <div className="w-11 h-11 rounded-xl bg-brandGreen-50 dark:bg-brandGreen-950/20 text-brandGreen-600 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div className="flex flex-col">
                  <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100 leading-snug">
                    {language === 'vi' ? 'Số điện thoại' : 'Phone number'}
                  </h5>
                  <a href={`tel:${data.phone.replace(/\s+/g, '')}`} className="text-sm text-stone-500 dark:text-stone-400 hover:text-brandBlue-600 transition-colors mt-1">
                    {data.phone}
                  </a>
                </div>
              </div>

              {/* Email item */}
              <div className="flex gap-4 items-start bg-brandBeige-50 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800/80 p-5 rounded-2xl premium-card-hover">
                <div className="w-11 h-11 rounded-xl bg-brandGreen-50 dark:bg-brandGreen-950/20 text-brandGreen-600 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col">
                  <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100 leading-snug">Email</h5>
                  <a href={`mailto:${data.email}`} className="text-sm text-stone-500 dark:text-stone-400 hover:text-brandBlue-600 transition-colors mt-1">
                    {data.email}
                  </a>
                </div>
              </div>

              {/* Address item */}
              <div className="flex gap-4 items-start bg-brandBeige-50 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800/80 p-5 rounded-2xl premium-card-hover">
                <div className="w-11 h-11 rounded-xl bg-brandGreen-50 dark:bg-brandGreen-950/20 text-brandGreen-600 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col">
                  <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100 leading-snug">
                    {language === 'vi' ? 'Địa chỉ làm việc' : 'Office address'}
                  </h5>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                    {data.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Socials buttons */}
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-sm text-stone-800 dark:text-stone-200">
                {language === 'vi' ? 'Kênh liên hệ nhanh' : 'Quick Connect Channels'}
              </h4>
              <div className="flex gap-3">
                <a href={data.socials.zalo} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border font-bold text-xs transition-colors duration-300 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                  <MessageSquare size={14} />
                  <span>Zalo</span>
                </a>
                <a href={data.socials.facebook} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border font-bold text-xs transition-colors duration-300 border-[#1877f2] text-[#1877f2] hover:bg-[#1877f2] hover:text-white">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
                <a href={data.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border font-bold text-xs transition-colors duration-300 border-[#0a66c2] text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 h-60 shadow-sm">
              <iframe
                title="Office Map"
                src={data.mapUrl}
                className="w-full h-full border-none"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Toast container portal */}
      <div className="fixed bottom-6 right-6 z-[3000] flex flex-col gap-2">
        {toasts.map((toast) => (
          <div 
            key={toast.id} 
            className={`bg-brandBeige-50 dark:bg-stone-900 border-l-4 text-stone-900 dark:text-stone-100 shadow-xl p-4 rounded-r-lg flex items-center gap-3 min-w-[280px] max-w-sm border-t border-r border-b border-stone-200 dark:border-stone-800 animate-fade-in ${
              toast.type === 'error' ? 'border-l-red-500' : 'border-l-brandGreen-600'
            }`}
          >
            {toast.type === 'success' && <CheckCircle size={18} className="text-brandGreen-600" />}
            <span className="text-xs font-semibold flex-grow">{toast.message}</span>
            <button className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer" onClick={() => removeToast(toast.id)}>
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
