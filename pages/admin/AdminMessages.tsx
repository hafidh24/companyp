
import React, { useState, useEffect } from 'react';
import { getMessages, markAsRead, deleteMessage } from '../../services/messageService';
import { Message } from '../../types';

const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    setMessages(getMessages());
  }, []);

  const handleSelect = (msg: Message) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      markAsRead(msg.id);
      setMessages(getMessages());
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus pesan ini secara permanen?')) {
      deleteMessage(id);
      setMessages(getMessages());
      if (selectedMessage?.id === id) setSelectedMessage(null);
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden">
      {/* List Sidebar */}
      <div className="w-1/3 bg-white border-r border-slate-100 overflow-y-auto">
        <div className="p-8 border-b border-slate-50">
          <h2 className="text-2xl font-black text-slate-950 tracking-tighter">Kotak Masuk</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
            Total: {messages.length} Pesan
          </p>
        </div>
        <div className="divide-y divide-slate-50">
          {messages.length === 0 ? (
            <div className="p-10 text-center text-slate-400 text-sm font-medium italic">
              Belum ada pesan masuk.
            </div>
          ) : (
            messages.map((msg) => (
              <div 
                key={msg.id}
                onClick={() => handleSelect(msg)}
                className={`p-6 cursor-pointer transition-all border-l-4 ${
                  selectedMessage?.id === msg.id ? 'bg-brand-50 border-brand-600' : 'hover:bg-slate-50 border-transparent'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[9px] font-black uppercase tracking-widest ${msg.isRead ? 'text-slate-400' : 'text-brand-600'}`}>
                    {msg.isRead ? 'Sudah Dibaca' : 'Baru'}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400">
                    {new Date(msg.date).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 truncate mb-1">{msg.senderName}</h4>
                <p className="text-xs text-slate-500 line-clamp-1">{msg.content}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Message View */}
      <div className="flex-grow bg-[#f8fafc] overflow-y-auto p-12">
        {selectedMessage ? (
          <div className="max-w-3xl mx-auto animate-fade-up">
            <div className="flex justify-between items-center mb-12">
              <button 
                onClick={() => setSelectedMessage(null)}
                className="md:hidden text-brand-600 font-bold"
              >
                ← Kembali
              </button>
              <div className="flex gap-4">
                <button 
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="px-6 py-2 bg-white border border-red-100 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-50 transition-all"
                >
                  Hapus Pesan
                </button>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex items-center gap-6 mb-12 pb-8 border-b border-slate-50">
                <div className="w-16 h-16 rounded-2xl bg-brand-600 flex items-center justify-center text-white text-2xl font-black">
                  {selectedMessage.senderName[0]}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-950 leading-tight">{selectedMessage.senderName}</h3>
                  <p className="text-slate-400 font-medium">{selectedMessage.senderEmail}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Subjek</span>
                  <p className="text-lg font-bold text-slate-900">{selectedMessage.subject || 'Tanpa Subjek'}</p>
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Pesan</span>
                  <p className="text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                    {selectedMessage.content}
                  </p>
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-slate-50">
                <a 
                  href={`mailto:${selectedMessage.senderEmail}`}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-600 transition-all"
                >
                  Balas via Email
                  <span className="opacity-40">→</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-300">
            <div className="text-6xl mb-6">✉️</div>
            <p className="text-xl font-medium">Pilih pesan untuk membacanya</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
