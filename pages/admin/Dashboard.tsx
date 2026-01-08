
import React, { useMemo } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { getVisitorStats, getTotalVisitors } from '../../services/analyticsService';
import { getActivities } from '../../services/activityService';

const Dashboard: React.FC = () => {
  const visitorStats = useMemo(() => getVisitorStats(), []);
  const totalVisitors = useMemo(() => getTotalVisitors(), []);
  const activities = useMemo(() => getActivities(), []);
  
  const todayCount = visitorStats.length > 0 ? visitorStats[visitorStats.length - 1].count : 0;

  const stats = [
    { title: 'Total Pengunjung', value: totalVisitors, icon: '👥', color: 'bg-blue-500' },
    { title: 'Pengunjung Hari Ini', value: todayCount, icon: '📅', color: 'bg-emerald-500' },
    { title: 'Total Kegiatan', value: activities.length, icon: '📰', color: 'bg-orange-500' },
    { title: 'Pesan Baru', value: '12', icon: '✉️', color: 'bg-purple-500' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Analisis Ringkasan</h1>
        <p className="text-slate-500">Pantau performa profil perusahaan Anda secara real-time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.color} text-white rounded-xl flex items-center justify-center text-xl shadow-inner`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900">Tren Pengunjung (7 Hari Terakhir)</h3>
            <select className="bg-slate-50 text-xs border-none rounded-lg px-2 py-1">
              <option>Minggu Ini</option>
              <option>Bulan Ini</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitorStats}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    fontSize: '12px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorCount)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">Aktivitas Terkini</h3>
          <div className="space-y-6">
            {activities.slice(0, 4).map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                  <img src={activity.imageUrl} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-slate-900 truncate">{activity.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{new Date(activity.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-slate-50 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-100 transition-colors">
            Lihat Semua Kegiatan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
