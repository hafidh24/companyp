
import React, { useState } from 'react';
import { addMessage } from '../services/messageService';
import { getCompanyProfile } from '../services/companyService';

const Contact: React.FC = () => {
  const profile = getCompanyProfile();
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    subject: '',
    content: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMessage(formData);
    setIsSent(true);
    setFormData({ senderName: '', senderEmail: '', subject: '', content: '' });
    setTimeout(() => setIsSent(false), 5000);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Halo Company Test, saya tertarik untuk bekerja sama.");
    window.open(`https://wa.me/${profile.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-white min-h-screen pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="animate-fade-up">
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-12 bg-brand-600"></span>
              <span className="text-brand-600 font-black uppercase tracking-[0.3em] text-[10px]">Hubungi Kami</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tighter leading-none mb-10">
              MARI <span className="italic font-serif font-light text-slate-400">BERKOLABORASI.</span>
            </h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12">
              Punya ide luar biasa? Mari diskusikan bagaimana kami bisa membantu mewujudkannya menjadi solusi digital yang berdampak.
            </p>

            <div className="space-y-10">
              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                  📧
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Email</h4>
                  <p className="text-lg font-bold text-slate-900">{profile.email}</p>
                </div>
              </div>
              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  📱
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">WhatsApp</h4>
                  <p className="text-lg font-bold text-slate-900">+{profile.whatsapp}</p>
                </div>
              </div>
              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-slate-950 group-hover:text-white transition-all duration-300">
                  📍
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Lokasi</h4>
                  <p className="text-lg font-bold text-slate-900 max-w-xs">{profile.address}</p>
                </div>
              </div>
            </div>

            <button 
              onClick={openWhatsApp}
              className="mt-16 px-10 py-6 bg-emerald-500 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-emerald-100 hover:bg-emerald-600 transition-all flex items-center gap-4 group"
            >
              <span>Hubungi via WhatsApp</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                →
              </div>
            </button>
          </div>

          <div className="bg-slate-50 p-12 lg:p-16 rounded-[3rem] animate-fade-up shadow-sm border border-slate-100" style={{animationDelay: '0.2s'}}>
            {isSent ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white text-3xl mb-8 animate-bounce">✓</div>
                <h3 className="text-2xl font-black text-slate-950 mb-4">Pesan Terkirim!</h3>
                <p className="text-slate-500 font-medium">Terima kasih atas pesan Anda. Tim kami akan segera menghubungi Anda kembali.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Nama Lengkap</label>
                  <input 
                    required
                    type="text"
                    value={formData.senderName}
                    onChange={(e) => setFormData({...formData, senderName: e.target.value})}
                    placeholder="John Doe"
                    className="w-full px-8 py-5 rounded-2xl bg-white border border-slate-100 focus:ring-4 focus:ring-brand-100 focus:border-brand-600 outline-none transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Email Bisnis</label>
                  <input 
                    required
                    type="email"
                    value={formData.senderEmail}
                    onChange={(e) => setFormData({...formData, senderEmail: e.target.value})}
                    placeholder="john@company.com"
                    className="w-full px-8 py-5 rounded-2xl bg-white border border-slate-100 focus:ring-4 focus:ring-brand-100 focus:border-brand-600 outline-none transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Pesan Anda</label>
                  <textarea 
                    required
                    rows={5}
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    placeholder="Bagaimana kami bisa membantu?"
                    className="w-full px-8 py-5 rounded-2xl bg-white border border-slate-100 focus:ring-4 focus:ring-brand-100 focus:border-brand-600 outline-none transition-all font-medium resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full py-6 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-600 transition-all duration-500"
                >
                  Kirim Pesan Sekarang
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
