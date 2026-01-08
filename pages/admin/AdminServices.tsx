
import React, { useState, useEffect } from 'react';
import { getServices, addService, updateService, deleteService } from '../../services/serviceService';
import { Service } from '../../types';

const AdminServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '✨'
  });

  useEffect(() => {
    setServices(getServices());
  }, []);

  const resetForm = () => {
    setFormData({ title: '', description: '', icon: '✨' });
    setEditingService(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      updateService({ ...formData, id: editingService.id });
    } else {
      addService(formData);
    }
    setServices(getServices());
    setIsModalOpen(false);
    resetForm();
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus layanan ini?')) {
      deleteService(id);
      setServices(getServices());
    }
  };

  return (
    <div className="p-10 bg-[#f8fafc] min-h-screen">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-950 tracking-tighter mb-2">Manajemen Layanan</h1>
          <p className="text-slate-500 font-medium italic">Kelola daftar layanan unggulan perusahaan Anda.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="bg-slate-950 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
        >
          + Tambah Layanan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="text-4xl mb-6">{service.icon}</div>
            <h3 className="text-xl font-black text-slate-950 mb-4">{service.title}</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 line-clamp-3">
              {service.description}
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => handleEdit(service)}
                className="flex-grow py-3 bg-slate-50 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition-all"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(service.id)}
                className="px-6 py-3 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden animate-fade-in-up">
            <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-black text-slate-950 tracking-tight">
                {editingService ? 'Edit Layanan' : 'Layanan Baru'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-950 text-xl">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Judul Layanan</label>
                <input 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold text-slate-900" 
                  placeholder="Misal: Mobile Development"
                />
              </div>
              <div className="grid grid-cols-4 gap-6">
                <div className="col-span-1">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Icon (Emoji)</label>
                  <input 
                    required
                    value={formData.icon}
                    onChange={(e) => setFormData({...formData, icon: e.target.value})}
                    className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 text-center text-xl outline-none"
                  />
                </div>
                <div className="col-span-3">
                   <p className="text-[10px] text-slate-400 mt-10 font-medium italic">Gunakan emoji yang merepresentasikan layanan Anda.</p>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Deskripsi Layanan</label>
                <textarea 
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-medium text-slate-600 resize-none" 
                  placeholder="Jelaskan apa yang Anda tawarkan..."
                ></textarea>
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-grow py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-5 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
                >
                  {editingService ? 'Simpan Perubahan' : 'Terbitkan Layanan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
