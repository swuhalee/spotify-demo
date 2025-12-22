import React, { Suspense } from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import Progress from './common/components/Progress/Progress';

const AppLayout = React.lazy(() => import('./layout/AppLayout'));
const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const SearchPage = React.lazy(() => import('./pages/SearchPage/SearchPage'));
const SearchWithPage = React.lazy(() => import('./pages/SearchWithPage/SearchWithPage'));
const PlaylistDetailPage = React.lazy(() => import('./pages/PlaylistDetailPage/PlaylistDetailPage'));
const PlaylistPage = React.lazy(() => import('./pages/PlaylistPage/PlaylistPage'));

// 0. sidebar (playlist, menu)
// 1. landing page: /
// 2. search page: /search
// 2-1. search results page: /search/:keyword
// 3. playlist detailpage: /playlist/:id
// 4. (mobile) playlist page: /playlist
function App() {
  return (
    <Suspense fallback={<Progress />} >
      <Routes>
        <Route path="/" element={<AppLayout />} >
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="search/:keyword" element={<SearchWithPage />} />
          <Route path="playlist/:id" element={<PlaylistDetailPage />} />
          <Route path="playlist" element={<PlaylistPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
