import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { StoriesPage } from './pages/StoriesPage';
import { CraftsPage } from './pages/CraftsPage';
import { EldersPage } from './pages/EldersPage';
import { ArchivePage } from './pages/ArchivePage';
import { LanguagePage } from './pages/LanguagePage';
import { EventsPage } from './pages/EventsPage';
import { TimelinePage } from './pages/TimelinePage';
import { GalleryPage } from './pages/GalleryPage';
import { LoadingScreen } from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="stories" element={<StoriesPage />} />
            <Route path="crafts" element={<CraftsPage />} />
            <Route path="elders" element={<EldersPage />} />
            <Route path="archive" element={<ArchivePage />} />
            <Route path="language" element={<LanguagePage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="timeline" element={<TimelinePage />} />
            <Route path="gallery" element={<GalleryPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;