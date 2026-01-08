
import React, { useEffect, useState, useMemo } from 'react';
import { getActivities } from '../services/activityService';
import { getCompanyProfile } from '../services/companyService';
import { Activity, CompanyProfile } from '../types';

const Activities: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  useEffect(() => {
    setActivities(getActivities());
    setProfile(getCompanyProfile());
    
    // Prevent scroll when any modal is open
    if (selectedActivity || enlargedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedActivity, enlargedImage]);

  const categories = useMemo(() => {
    const cats = ['Semua', ...new Set(activities.map(a => a.category))];
    return cats;
  }, [activities]);

  const filteredActivities = useMemo(() => {
    return activeCategory === 'Semua' 
      ? activities 
      : activities.filter(a => a.category === activeCategory);
  }, [activities, activeCategory]);

  const displayedActivities = filteredActivities.slice(0, visibleCount);

  return (
    <div className="bg-[#FAFBFF] min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-16 animate-fade-in-up">
          <span className="text-blue-600 font-extrabold text-xs uppercase tracking-[0.3em] mb-4 block">Eksplorasi Dunia Kami</span>
          <h2 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Berita & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Kegiatan Terbaru</span>
          </h2>
          <p className="mt-8 text-lg text-slate-500 leading-relaxed">
            Menyajikan dokumentasi setiap langkah inovasi dan kontribusi kami bagi kemajuan ekosistem digital.
          </p>
        </div>

        {/* Filter Kategori */}
        <div className="flex flex-wrap gap-3 mb-16 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(6);
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105' 
                : 'bg-white text-slate-400 hover:text-slate-900 border border-slate-100 hover:shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Kegiatan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayedActivities.map((activity, index) => (
            <article 
              key={activity.id} 
              className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-500 animate-fade-in-up"
              style={{animationDelay: `${(index % 6) * 0.1}s`}}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={activity.imageUrl} 
                  alt={activity.title}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-black px-4 py-2 rounded-full shadow-lg uppercase tracking-widest">
                    {activity.category}
                  </span>
                </div>
              </div>
              <div className="p-10">
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-8 h-[1px] bg-blue-600"></span>
                  <time className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                    {new Date(activity.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </time>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors">
                  {activity.title}
                </h3>
                <p className="text-slate-500 line-clamp-2 text-sm leading-relaxed mb-8">
                  {activity.description}
                </p>
                <button 
                  onClick={() => setSelectedActivity(activity)}
                  className="flex items-center gap-2 text-xs font-black text-slate-900 uppercase tracking-widest group/btn transition-all"
                >
                  Baca Selengkapnya
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover/btn:bg-blue-600 group-hover/btn:text-white transition-all shadow-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Status Kosong */}
        {displayedActivities.length === 0 && (
          <div className="text-center py-40 bg-white rounded-[3rem] border-2 border-dashed border-slate-100 animate-fade-in-up">
            <div className="text-5xl mb-6">🏜️</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Belum ada kegiatan</h3>
            <p className="text-slate-400">Kembali lagi nanti untuk melihat update terbaru kami.</p>
          </div>
        )}

        {/* Load More */}
        {visibleCount < filteredActivities.length && (
          <div className="mt-20 text-center animate-fade-in-up">
            <button 
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-200 transition-all active:scale-95"
            >
              Muat Lebih Banyak
            </button>
          </div>
        )}

        {/* Modal Detail Modern */}
        {selectedActivity && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-950/80 backdrop-blur-xl animate-fade-in"
            onClick={() => setSelectedActivity(null)}
          >
            <div 
              className="bg-white w-full max-w-7xl rounded-[3rem] shadow-2xl relative overflow-hidden animate-fade-in-up max-h-[90vh] flex flex-col md:flex-row"
              onClick={e => e.stopPropagation()}
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 bg-slate-50 overflow-y-auto scrollbar-hide p-4 md:p-12 space-y-6">
                <img 
                  src={selectedActivity.imageUrl} 
                  className="w-full rounded-[2rem] shadow-xl hover:scale-[1.01] transition-transform duration-500 border border-white cursor-zoom-in" 
                  alt="Feature"
                  onClick={() => setEnlargedImage(selectedActivity.imageUrl)}
                />
                {selectedActivity.images && selectedActivity.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {selectedActivity.images.map((img, i) => (
                      <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md group/img cursor-zoom-in">
                        <img 
                          src={img} 
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                          alt={`Galeri ${i}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setEnlargedImage(img);
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                          <span className="text-white text-xs font-black uppercase tracking-widest">Perbesar</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-10 md:p-20 overflow-y-auto flex flex-col">
                <div className="mb-10 flex justify-between items-start">
                  <div>
                    <span className="px-4 py-2 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
                      {selectedActivity.category}
                    </span>
                    <time className="block mt-6 text-sm text-slate-400 font-bold uppercase tracking-widest">
                      {new Date(selectedActivity.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </time>
                  </div>
                  <button 
                    onClick={() => setSelectedActivity(null)}
                    className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all shadow-sm"
                  >
                    ✕
                  </button>
                </div>

                <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-8 tracking-tighter">
                  {selectedActivity.title}
                </h2>
                
                <div className="flex-grow">
                  <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-wrap mb-12">
                    {selectedActivity.description}
                  </p>
                </div>

                <div className="pt-10 border-t border-slate-100 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                     <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl shadow-lg shadow-blue-100">✨</div>
                     <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Dibuat Oleh</p>
                       <p className="text-sm font-extrabold text-slate-900">Communication Team</p>
                     </div>
                   </div>
                   {profile?.instagram && (
                     <a 
                      href={profile.instagram} 
                      target="_blank" 
                      className="text-xs font-black uppercase tracking-widest text-pink-600 hover:text-pink-700 transition-colors"
                    >
                      Share Instagram
                    </a>
                   )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lightbox Modal (Enlarged Image View) */}
        {enlargedImage && (
          <div 
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl animate-fade-in"
            onClick={() => setEnlargedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white text-xl hover:bg-white/20 transition-all"
              onClick={() => setEnlargedImage(null)}
            >
              ✕
            </button>
            <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
              <img 
                src={enlargedImage} 
                className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl animate-fade-in-up" 
                alt="Enlarged"
                onClick={e => e.stopPropagation()}
              />
            </div>
          </div>
        )}

        {/* Instagram CTA */}
        {profile?.instagram && (
          <div className="mt-32 p-12 lg:p-20 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl animate-fade-in-up">
            <div className="max-w-xl">
              <h3 className="text-3xl lg:text-5xl font-black tracking-tighter mb-6">Momen Lainnya?</h3>
              <p className="text-lg opacity-90 leading-relaxed font-medium">Ikuti perjalanan harian kami dan update terbaru melalui Instagram resmi kami di <span className="underline cursor-pointer">{profile.instagram.split('/').pop()}</span>.</p>
            </div>
            <a 
              href={profile.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-12 py-6 bg-white text-slate-900 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:scale-105 hover:shadow-2xl transition-all shadow-xl active:scale-95"
            >
              Follow Instagram
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activities;
