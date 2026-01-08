
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 lg:pt-32 lg:pb-48 overflow-hidden hero-gradient">
        {/* Floating background elements */}
        <div className="absolute top-20 right-[10%] w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 left-[5%] w-96 h-96 bg-indigo-400/5 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="w-full lg:w-3/5 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-8 border border-blue-100">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                The Future of Digital Excellence
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-10 tracking-tight">
                Membangun Visi <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Digital Anda</span>
              </h1>
              <p className="text-lg lg:text-xl text-slate-500 leading-relaxed max-w-xl mb-12">
                Kami menggabungkan strategi bisnis dengan desain visioner untuk menciptakan pengalaman digital yang tidak terlupakan.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <Link to="/activities" className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 active:scale-95">
                  Eksplorasi Kegiatan
                </Link>
                <Link to="/about" className="group flex items-center gap-3 text-slate-900 font-bold hover:text-blue-600 transition-all">
                  Tentang Kami
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-2/5 relative animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-15px_rgba(0,0,0,0.1)] border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000"
                  alt="Modern Office"
                  className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
              </div>
              {/* Floating Stat Card */}
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-50 hidden md:block animate-float">
                <p className="text-4xl font-extrabold text-slate-900 mb-1">99%</p>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Client Success</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Brands / Logos */}
      <section className="py-20 border-y border-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-12">Terpercaya oleh Pemimpin Industri</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {['MICROSOFT', 'GOOGLE', 'AMAZON', 'ADOBE', 'META'].map(brand => (
              <span key={brand} className="text-2xl font-black text-slate-400 tracking-tighter">{brand}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
