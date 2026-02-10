
import React from 'react';
import { MOCK_ALBUMS, MOCK_PEOPLE } from '../services/constants';

const Albums: React.FC = () => {
  const mediaTypes = [
    { name: 'Videos', icon: 'videocam', count: 234 },
    { name: 'Selfies', icon: 'portrait', count: 56 },
    { name: 'Live Photos', icon: 'camera_roll', count: 812 },
    { name: 'Screenshots', icon: 'screenshot', count: 1043 },
  ];

  return (
    <div className="flex flex-col animate-in slide-in-from-right-2 duration-300">
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="flex items-center p-4 pb-2 justify-between">
          <h2 className="text-2xl font-bold leading-tight tracking-tight flex-1">Albums</h2>
          <button className="flex items-center justify-center rounded-full h-10 w-10 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
      </header>

      <div className="px-4 py-3">
        <div className="flex w-full items-stretch rounded-xl h-11 overflow-hidden bg-slate-200 dark:bg-[#283039]">
          <div className="text-[#9dabb9] flex items-center justify-center pl-4">
            <span className="material-symbols-outlined text-xl">search</span>
          </div>
          <input 
            className="flex-1 border-none bg-transparent text-slate-900 dark:text-white focus:ring-0 px-4 pl-2 text-base font-normal placeholder:text-[#9dabb9]" 
            placeholder="Search albums" 
          />
        </div>
      </div>

      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <h3 className="text-lg font-bold">My Albums</h3>
        <button className="text-primary text-sm font-semibold">See All</button>
      </div>
      <div className="flex overflow-x-auto hide-scrollbar">
        <div className="flex items-stretch px-4 py-2 gap-4">
          {MOCK_ALBUMS.map((album) => (
            <div key={album.id} className="flex flex-col gap-3 rounded-xl min-w-[160px] max-w-[160px]">
              <div 
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl shadow-sm border border-slate-200 dark:border-white/5 relative"
                style={{ backgroundImage: `url("${album.coverUrl}")` }}
              >
                {album.isFavorite && (
                  <div className="absolute bottom-2 right-2 bg-white/20 backdrop-blur-md rounded-full p-1">
                    <span className="material-symbols-outlined text-white text-sm fill-icon">favorite</span>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight truncate">{album.title}</p>
                <p className="text-[#9dabb9] text-xs font-medium">{album.count.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pb-2 pt-6">
        <h3 className="text-lg font-bold">People</h3>
      </div>
      <div className="flex overflow-x-auto hide-scrollbar px-4 py-2 gap-6">
        {MOCK_PEOPLE.map((person) => (
          <div key={person.id} className="flex flex-col items-center gap-2">
            <div 
              className="w-20 h-20 rounded-full bg-cover bg-center border-2 border-primary/20"
              style={{ backgroundImage: `url("${person.avatarUrl}")` }}
            />
            <p className="text-xs font-medium">{person.name}</p>
          </div>
        ))}
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-[#283039] flex items-center justify-center border-2 border-dashed border-slate-400 dark:border-slate-600">
            <span className="material-symbols-outlined text-[#9dabb9]">group</span>
          </div>
          <p className="text-xs font-medium text-[#9dabb9]">See All</p>
        </div>
      </div>

      <div className="px-4 pb-2 pt-6">
        <h3 className="text-lg font-bold">Places</h3>
      </div>
      <div className="px-4 py-2">
        <div className="relative w-full h-40 rounded-xl overflow-hidden group cursor-pointer">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAXfT__010KHqZ-UBlTN_Lq12M7fAjk6avBvBD7GBDJm6IJj3pqBKX63gr8sScgK5f_M_ezh_6SMyWM_W8Qlnv4u7KPNZ-_soybJyOCCXp1AZSBewlCNuHIVzsg68hT-nHGwU12wS70Y8lUFt6tchseCLB6nWNHMDtucUIkuhSGjxRYwWzUrEqtwPgaJ2SngxJ4XpTyxY-m9ZjQZbRmpiYK3q1wFqBSNzhzETp1gJZ7d39dwhq7uub_MOgdYHrQ2QbfSfYXsr_BDtA")' }}
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          <div className="absolute bottom-4 left-4">
            <p className="text-white text-lg font-bold drop-shadow-md">Explore Places</p>
            <p className="text-white/80 text-sm font-medium">84 Locations</p>
          </div>
        </div>
      </div>

      <div className="px-4 pb-2 pt-6">
        <h3 className="text-lg font-bold">Media Types</h3>
      </div>
      <div className="px-4 space-y-1 mb-6">
        {mediaTypes.map((type) => (
          <div key={type.name} className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-white/5 active:bg-slate-100 dark:active:bg-white/5 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">{type.icon}</span>
              <span className="text-base font-medium">{type.name}</span>
            </div>
            <div className="flex items-center gap-2 text-[#9dabb9]">
              <span className="text-sm">{type.count.toLocaleString()}</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Albums;
