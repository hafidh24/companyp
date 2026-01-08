
import React, { useState, useEffect } from 'react';
import { getCompanyProfile, updateCompanyProfile } from '../../services/companyService';
import { CompanyProfile } from '../../types';

const AdminProfile: React.FC = () => {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setProfile(getCompanyProfile());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile) {
      updateCompanyProfile(profile);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  if (!profile) return null;

  return (
    <div className="p-10 bg-[#f8fafc] min-h-screen">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-950 tracking-tighter mb-2">Profil Perusahaan</h1>
          <p className="text-slate-500 font-medium italic">Atur identitas digital perusahaan Anda di sini.</p>
        </div>
        {isSaved && (
          <div className="bg-emerald-500 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest animate-fade-up">
            ✓ Perubahan Berhasil Disimpan
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-950 mb-8 border-b border-slate-50 pb-4">Informasi Dasar</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Nama Perusahaan</label>
                <input 
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Tagline / Deskripsi Singkat</label>
                <textarea 
                  rows={3}
                  value={profile.description}
                  onChange={(e) => setProfile({...profile, description: e.target.value})}
                  className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-medium"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-950 mb-8 border-b border-slate-50 pb-4">Visi & Misi</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Visi Perusahaan</label>
                <input 
                  type="text"
                  value={profile.vision}
                  onChange={(e) => setProfile({...profile, vision: e.target.value})}
                  className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Misi (Pisahkan dengan Baris Baru)</label>
                <textarea 
                  rows={4}
                  value={profile.mission.join('\n')}
                  onChange={(e) => setProfile({...profile, mission: e.target.value.split('\n')})}
                  className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-medium"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-950 mb-8 border-b border-slate-50 pb-4">Kontak & Sosial Media</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Alamat Kantor</label>
                <textarea 
                  rows={3}
                  value={profile.address}
                  onChange={(e) => setProfile({...profile, address: e.target.value})}
                  className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-medium text-sm"
                ></textarea>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Email Bisnis</label>
                <input 
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">WhatsApp (Format: 62812...)</label>
                <input 
                  type="text"
                  value={profile.whatsapp}
                  onChange={(e) => setProfile({...profile, whatsapp: e.target.value})}
                  className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Link Instagram (Contoh: https://ig.me/...)</label>
                <input 
                  type="url"
                  value={profile.instagram || ''}
                  onChange={(e) => setProfile({...profile, instagram: e.target.value})}
                  className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-medium"
                  placeholder="https://instagram.com/username"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-6 bg-slate-950 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 hover:bg-blue-600 transition-all duration-500"
          >
            Simpan Seluruh Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;
