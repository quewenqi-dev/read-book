
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PHOTOS, MOCK_MEMORIES } from '../constants';

const Library: React.FC = () => {
  const navigate = useNavigate();

  // Group photos by date
  const groupedPhotos = MOCK_PHOTOS.reduce((groups: Record<string, typeof MOCK_PHOTOS>, photo) => {
    const date = photo.date;
    if (!groups[date]) groups[date] = [];
    groups[date].push(photo);
    return groups;
  }, {});

  return (
    <div className="flex flex-col animate-in fade-in duration-500">
      <header className="sticky top-0 z-30 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700">
             <img src="https://picsum.photos/id/64/100/100" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Library</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800">
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>
      </header>

      <section className="py-4">
        <div className="px-4 flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold">For You</h3>
          <button className="text-primary text-sm font-semibold">See All</button>
        </div>
        <div className="flex overflow-x-auto hide-scrollbar gap-4 px-4 py-2">
          {MOCK_MEMORIES.map((memory) => (
            <div key={memory.id} className="flex-none w-64 group cursor-pointer" onClick={() => navigate(`/photo/1`)}>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-2 shadow-lg">
                <div 
                  className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url("${memory.coverUrl}")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <p className="text-white text-xs font-medium opacity-80 uppercase tracking-widest">{memory.category}</p>
                  <p className="text-white text-lg font-bold">{memory.title}</p>
                </div>
                {memory.isAiCurated && (
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md rounded-full px-2 py-1 text-[10px] text-white font-bold flex items-center gap-1 uppercase">
                    <span className="material-symbols-outlined text-xs">auto_awesome</span> AI Curated
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {Object.entries(groupedPhotos).map(([date, photos]) => (
        <section key={date} className="mt-4">
          <div className="px-4 py-3 sticky top-[56px] bg-background-light dark:bg-background-dark z-20 flex flex-col">
            <h3 className="text-lg font-bold">{date}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">location_on</span>
              {photos[0].location}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-0.5 px-0.5">
            {photos.map((photo) => (
              <div 
                key={photo.id} 
                className="aspect-square relative group cursor-pointer overflow-hidden"
                onClick={() => navigate(`/photo/${photo.id}`)}
              >
                <img 
                  src={photo.url} 
                  alt={photo.alt} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                />
                {photo.id === '1' && (
                   <div className="absolute top-1 right-1">
                      <span className="material-symbols-outlined text-white text-sm drop-shadow-md">auto_awesome</span>
                   </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      <button className="fixed bottom-24 right-6 size-14 bg-primary text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-40">
        <span className="material-symbols-outlined text-3xl">photo_camera</span>
      </button>
    </div>
  );
};

export default Library;
