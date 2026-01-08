
import React, { useEffect, useState } from 'react';
import { getServices } from '../services/serviceService';
import { Service } from '../types';

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    setServices(getServices());
  }, []);

  return (
    <div className="bg-white min-h-screen pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <header className="max-w-3xl mb-24 animate-fade-in-up">
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px w-12 bg-blue-600"></span>
            <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px]">Layanan Kami</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tighter leading-none mb-10">
            SOLUSI <span className="italic font-serif font-light text-slate-400">CERDAS</span> UNTUK ANDA.
          </h2>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            Kami menghadirkan keahlian mendalam di berbagai bidang teknologi untuk membantu bisnis Anda tumbuh lebih cepat dan efisien.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="group p-12 bg-slate-50 rounded-[3rem] border border-slate-100 hover:border-blue-600 hover:bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-blue-100 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-4xl shadow-sm mb-10 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-blue-200">
                {service.icon}
              </div>
              <h3 className="text-3xl font-black text-slate-950 mb-6 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-lg text-slate-500 font-medium leading-relaxed mb-8">
                {service.description}
              </p>
              <div className="flex items-center gap-4 text-blue-600 font-black text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                <span>Pelajari Selengkapnya</span>
                <span className="w-8 h-px bg-blue-600"></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
