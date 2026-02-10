
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const BottomNavbar: React.FC = () => {
  const location = useLocation();
  const isDetailView = location.pathname.startsWith('/photo/');

  // Don't show regular bottom nav in photo detail view
  if (isDetailView) return null;

  const navItems = [
    { label: 'Library', icon: 'image', to: '/library', activeIcon: 'photo_library' },
    { label: 'For You', icon: 'auto_awesome', to: '/foryou', activeIcon: 'auto_awesome' },
    { label: 'Albums', icon: 'folder', to: '/albums', activeIcon: 'folder' },
    { label: 'Search', icon: 'search', to: '/search', activeIcon: 'search' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-primary' : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span className={`material-symbols-outlined text-[28px] ${isActive ? 'fill-icon' : ''}`}>
                {isActive ? item.activeIcon : item.icon}
              </span>
              <span className={`text-[10px] font-medium ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNavbar;
