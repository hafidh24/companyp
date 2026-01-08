
import React, { useState, useEffect, useRef } from 'react';
import { getActivities, addActivity, updateActivity, deleteActivity } from '../../services/activityService';
import { Activity } from '../../types';
import { GoogleGenAI } from "@google/genai";

const AdminActivities: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    imageUrl: '', // Base64 Main Image
    date: new Date().toISOString().split('T')[0],
    images: [] as string[] // Base64 Gallery Images
  });

  useEffect(() => {
    setActivities(getActivities());
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      imageUrl: '',
      date: new Date().toISOString().split('T')[0],
      images: []
    });
    setEditingActivity(null);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // Limit 1MB for demo localstorage
        alert("Gambar terlalu besar. Maksimal 1MB untuk penyimpanan lokal.");
        return;
      }
      const base64 = await fileToBase64(file);
      setFormData(prev => ({ ...prev, imageUrl: base64 }));
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 800 * 1024) continue; // Skip files > 800kb
        const base64 = await fileToBase64(files[i]);
        newImages.push(base64);
      }
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 6) // Max 6 images for gallery
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) return alert('Gambar utama wajib diunggah');
    
    if (editingActivity) {
      updateActivity({ ...formData, id: editingActivity.id });
    } else {
      addActivity(formData);
    }
    setActivities(getActivities());
    setIsModalOpen(false);
    resetForm();
  };

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setFormData({
      title: activity.title,
      description: activity.description,
      category: activity.category,
      imageUrl: activity.imageUrl,
      date: activity.date,
      images: activity.images || []
    });
    setIsModalOpen(true);
  };

  const removeFromGallery = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const generateAIdescription = async () => {
    if (!formData.title) return alert('Masukkan judul terlebih dahulu');
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Buatkan deskripsi profesional dan menarik untuk kegiatan perusahaan berjudul: "${formData.title}". Gunakan bahasa Indonesia yang formal namun modern. Maksimal 3 kalimat.`,
      });
      if (response.text) {
        setFormData(prev => ({ ...prev, description: response.text.trim() }));
      }
    } catch (error) {
      console.error(error);
      alert('Gagal generate dengan AI');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Kelola Kegiatan</h1>
          <p className="text-slate-500 font-medium">Unggah foto dan dokumentasi kegiatan terbaru.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
        >
          + Tambah Kegiatan
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100 sticky top-0 z-10">
              <tr>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Info Kegiatan</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Kategori</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tanggal</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {activities.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-slate-400 font-medium">Belum ada kegiatan yang diunggah.</td>
                </tr>
              ) : (
                activities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-6">
                        <img src={activity.imageUrl} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 shadow-sm border border-slate-100" alt="Thumb" />
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 truncate max-w-[240px]">{activity.title}</div>
                          <div className="text-xs text-slate-400 mt-1 line-clamp-1">{activity.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg">
                        {activity.category}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-slate-500">
                      {new Date(activity.date).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => handleEdit(activity)} className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">📝</button>
                        <button onClick={() => { if(confirm('Hapus?')) { deleteActivity(activity.id); setActivities(getActivities()); } }} className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden animate-fade-in-up max-h-[95vh] flex flex-col">
            <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/50 flex-shrink-0">
              <h2 className="text-xl font-black text-slate-950 tracking-tight">
                {editingActivity ? 'Edit Detail Kegiatan' : 'Unggah Kegiatan Baru'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-950 text-xl">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-10 overflow-y-auto space-y-10 scrollbar-hide">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Side: General Info */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Judul Kegiatan</label>
                      <input 
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold"
                        placeholder="Contoh: Launching Produk Baru"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Kategori</label>
                        <input 
                          required
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 font-bold"
                          placeholder="Teknologi"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Tanggal</label>
                        <input 
                          required
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                          className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 font-bold"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Deskripsi Detail</label>
                        <button type="button" onClick={generateAIdescription} className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1">✨ AI Auto-fill</button>
                      </div>
                      <textarea 
                        required
                        rows={6}
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 font-medium resize-none leading-relaxed"
                        placeholder="Ceritakan detail kegiatannya..."
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Right Side: Image Uploads */}
                <div className="space-y-8">
                  {/* Main Image Upload */}
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Gambar Utama (Device)</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="group relative w-full aspect-video rounded-[2rem] bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-all overflow-hidden"
                    >
                      {formData.imageUrl ? (
                        <>
                          <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Main Preview" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-black uppercase tracking-widest transition-opacity">Ganti Gambar</div>
                        </>
                      ) : (
                        <div className="text-center p-6">
                          <span className="text-4xl mb-2 block">📸</span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pilih Gambar Utama</span>
                        </div>
                      )}
                    </div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleMainImageUpload} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </div>

                  {/* Gallery Upload */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Galeri Foto (Maks 6)</label>
                      <button 
                        type="button"
                        onClick={() => galleryInputRef.current?.click()}
                        className="text-[10px] font-black text-blue-600 uppercase tracking-widest"
                      >
                        + Tambah Foto
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      {formData.images.map((img, i) => (
                        <div key={i} className="relative group aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                          <img src={img} className="w-full h-full object-cover" alt="Gallery" />
                          <button 
                            type="button"
                            onClick={() => removeFromGallery(i)}
                            className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-lg flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      {formData.images.length < 6 && (
                        <div 
                          onClick={() => galleryInputRef.current?.click()}
                          className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 hover:text-blue-500 hover:border-blue-500 cursor-pointer transition-all"
                        >
                          <span className="text-xl">+</span>
                        </div>
                      )}
                    </div>
                    <input 
                      type="file" 
                      ref={galleryInputRef} 
                      onChange={handleGalleryUpload} 
                      accept="image/*" 
                      multiple 
                      className="hidden" 
                    />
                    <p className="mt-4 text-[9px] text-slate-400 italic">Format: JPG, PNG, WEBP. Maks 800KB per file gallery.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-10 flex-shrink-0 sticky bottom-0 bg-white">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-grow py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Batal</button>
                <button 
                  type="submit" 
                  className="flex-[2] py-6 bg-slate-950 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-2xl shadow-blue-100"
                >
                  {editingActivity ? 'Update Kegiatan' : 'Terbitkan Kegiatan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminActivities;
