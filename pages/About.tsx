
import React, { useEffect, useState } from 'react';
import { getCompanyProfile } from '../services/companyService';
import { CompanyProfile } from '../types';

const About: React.FC = () => {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);

  useEffect(() => {
    setProfile(getCompanyProfile());
  }, []);

  if (!profile) return null;

  return (
    <div className="bg-white min-h-screen pt-40 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Hero Section About */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-12 bg-blue-600"></span>
              <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px]">Siapa Kami</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tighter leading-none mb-10">
              MENGENAL <br />
              <span className="italic font-serif font-light text-slate-400">{profile.name}.</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed">
              {profile.description}
            </p>
          </div>
          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                alt="Our Team" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-blue-600 p-10 rounded-[2.5rem] text-white shadow-2xl animate-float">
              <p className="text-5xl font-black mb-1">10+</p>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Tahun Pengalaman</p>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <div className="p-12 bg-slate-950 rounded-[3rem] text-white flex flex-col justify-center animate-fade-in-up">
            <h3 className="text-blue-500 font-black uppercase tracking-widest text-xs mb-8">Visi Kami</h3>
            <p className="text-3xl font-bold leading-tight italic font-serif">
              "{profile.vision}"
            </p>
          </div>
          <div className="p-12 bg-slate-50 rounded-[3rem] border border-slate-100 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-blue-600 font-black uppercase tracking-widest text-xs mb-8">Misi Strategis</h3>
            <ul className="space-y-6">
              {profile.mission.map((m, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-1">
                    {i + 1}
                  </span>
                  <p className="text-slate-700 font-medium leading-relaxed">{m}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Values / Identity */}
        <section className="text-center max-w-4xl mx-auto py-20 border-t border-slate-100 animate-fade-in-up">
          <h2 className="text-3xl font-black text-slate-950 mb-12">Nilai-Nilai Inti Kami</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { t: 'Inovasi', d: 'Selalu terdepan' },
              { t: 'Integritas', d: 'Kejujuran utama' },
              { t: 'Kualitas', d: 'Standar tinggi' },
              { t: 'Kolaborasi', d: 'Tumbuh bersama' }
            ].map((v, i) => (
              <div key={i} className="group">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <span className="text-xl">✨</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{v.t}</h4>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{v.d}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
