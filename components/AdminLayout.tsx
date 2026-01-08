
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: '📊' },
    { name: 'Kelola Kegiatan', path: '/admin/activities', icon: '📝' },
    { name: 'Kelola Layanan', path: '/admin/services', icon: '🛠️' },
    { name: 'Profil Perusahaan', path: '/admin/profile', icon: '🏢' },
    { name: 'Pesan Masuk', path: '/admin/messages', icon: '✉️' },
    { name: 'Pengaturan', path: '/admin/settings', icon: '⚙️' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed h-full z-40">
        <div className="p-8">
          <Link to="/" className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm">C</div>
            CT Admin
          </Link>
        </div>
        
        <nav className="flex-grow px-4 space-y-2 mt-4">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Menu Utama</p>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white text-sm transition-all">
            <span>🚪</span> Keluar Dashboard
          </Link>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-grow ml-64">
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <div className="bg-slate-100 p-2 rounded-lg cursor-pointer">🔍</div>
            <span className="text-slate-400 text-sm">Cari data...</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              <span className="text-xl cursor-pointer">🔔</span>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 border-2 border-white overflow-hidden">
               <img src="https://picsum.photos/seed/admin/100" alt="Admin" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-slate-900 leading-none">Admin Utama</p>
              <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-tighter">Superadmin Access</p>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
