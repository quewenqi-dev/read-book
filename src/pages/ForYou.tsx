
import React from 'react';
import { MOCK_MEMORIES } from '../services/constants';

const ForYou: React.FC = () => {
  return (
    <div className="flex flex-col animate-in slide-in-from-bottom-2 duration-300">
      <header className="sticky top-0 z-30 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-xl font-bold tracking-tight">For You</h1>
        <button className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </header>
      
      <div className="p-4 space-y-6">
        {MOCK_MEMORIES.map((memory) => (
          <div key={memory.id} className="group cursor-pointer">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
              <div 
                className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url("${memory.coverUrl}")` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6">
                 <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-md rounded text-[10px] text-white font-bold uppercase tracking-widest mb-2">
                   {memory.category}
                 </span>
                 <h2 className="text-2xl font-bold text-white leading-tight">{memory.title}</h2>
              </div>
              {memory.isAiCurated && (
                 <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-md rounded-full px-3 py-1 text-[10px] text-white font-bold flex items-center gap-1.5 uppercase border border-white/20">
                    <span className="material-symbols-outlined text-xs fill-icon">auto_awesome</span> Smart Memory
                 </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <section className="px-4 py-2">
         <h3 className="text-lg font-bold mb-4">Sharing Activity</h3>
         <div className="bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
               <span className="material-symbols-outlined text-primary text-3xl">group</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">No recent activity from your shared albums. Invite friends to start sharing!</p>
            <button className="bg-primary text-white font-bold py-2 px-6 rounded-full text-sm">Create Shared Album</button>
         </div>
      </section>
    </div>
  );
};

export default ForYou;
