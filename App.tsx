
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Library from './pages/Library';
import Albums from './pages/Albums';
import Search from './pages/Search';
import ForYou from './pages/ForYou';
import PhotoDetail from './pages/PhotoDetail';
import BottomNavbar from './components/BottomNavbar';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
        <main className="flex-1 overflow-y-auto pb-20">
          <Routes>
            <Route path="/library" element={<Library />} />
            <Route path="/foryou" element={<ForYou />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/search" element={<Search />} />
            <Route path="/photo/:id" element={<PhotoDetail />} />
            <Route path="/" element={<Navigate to="/library" replace />} />
          </Routes>
        </main>
        <BottomNavbar />
      </div>
    </HashRouter>
  );
};

export default App;
