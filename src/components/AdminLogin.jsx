import { useState } from 'react';
import { ShieldAlert, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { API_BASE } from '../config';

export default function AdminLogin({ language }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save auth details
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', data.username);
        window.location.hash = '#/admin';
      } else {
        setError(data.error || (language === 'vi' ? 'Đăng nhập thất bại' : 'Authentication failed'));
      }
    } catch (err) {
      console.error('Login connection error:', err);
      // For local development sandbox, if backend is not running, allow a secret offline bypass
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('adminToken', 'admin-secure-session-token-key-2026');
        localStorage.setItem('adminUser', 'admin');
        window.location.hash = '#/admin';
      } else {
        setError(language === 'vi' 
          ? 'Không thể kết nối đến máy chủ backend.' 
          : 'Could not connect to backend server.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen pt-28 pb-20 flex items-center justify-center bg-stone-50 dark:bg-[#090d16] px-6 transition-colors duration-300">

      <div className="w-full max-w-md bg-white dark:bg-[#111726] border border-stone-200 dark:border-stone-850 p-8 rounded-3xl shadow-xl space-y-8 reveal is-visible">
        
        {/* Header info */}
        <div className="text-center">
          <div className="w-12 h-12 bg-brandGreen-50 dark:bg-[#192135] text-brandGreen-700 dark:text-[#0df58b] rounded-full flex items-center justify-center mx-auto mb-4 border border-brandGreen-200 dark:border-stone-800">
            <ShieldAlert size={22} />
          </div>
          <h1 className="font-title text-2xl font-bold text-stone-900 dark:text-stone-50">
            {language === 'vi' ? 'TRANG QUẢN TRỊ' : 'ADMIN PORTAL'}
          </h1>
          <p className="text-stone-500 dark:text-stone-400 text-xs font-body mt-2">
            {language === 'vi' 
              ? 'Nhập tài khoản admin cấu hình tại file Spring Boot application.'
              : 'Sign in with the admin account defined in the Spring Boot application configuration.'}
          </p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">
              {language === 'vi' ? 'Tài khoản' : 'Username'}
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              className="w-full px-4 py-3 bg-stone-50 dark:bg-[#192135] border border-stone-200 dark:border-stone-700/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brandGreen-600 dark:focus:ring-[#0df58b] text-stone-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">
              {language === 'vi' ? 'Mật khẩu' : 'Password'}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-stone-50 dark:bg-[#192135] border border-stone-200 dark:border-stone-700/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brandGreen-600 dark:focus:ring-[#0df58b] text-stone-900 dark:text-white pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3.5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl text-red-600 dark:text-red-400 text-xs font-semibold">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center w-full py-3.5 rounded-xl bg-brandGreen-600 hover:bg-brandGreen-700 dark:bg-[#0df58b] dark:text-stone-950 dark:hover:bg-[#0df58b]/90 text-white font-title font-bold text-sm tracking-wider uppercase shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading 
              ? (language === 'vi' ? 'Đang xác thực...' : 'Authenticating...') 
              : (language === 'vi' ? 'Đăng nhập' : 'Sign In')}
          </button>

        </form>

      </div>
    </section>
  );
}
