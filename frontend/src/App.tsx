import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LoadingScreen } from './components/LoadingScreen';
import { ErrorBoundary } from './components/ErrorBoundary';

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const StoriesPage = lazy(() => import('./pages/StoriesPage').then((m) => ({ default: m.StoriesPage })));
const CraftsPage = lazy(() => import('./pages/CraftsPage').then((m) => ({ default: m.CraftsPage })));
const EldersPage = lazy(() => import('./pages/EldersPage').then((m) => ({ default: m.EldersPage })));
const ArchivePage = lazy(() => import('./pages/ArchivePage').then((m) => ({ default: m.ArchivePage })));
const LanguagePage = lazy(() => import('./pages/LanguagePage').then((m) => ({ default: m.LanguagePage })));
const EventsPage = lazy(() => import('./pages/EventsPage').then((m) => ({ default: m.EventsPage })));
const TimelinePage = lazy(() => import('./pages/TimelinePage').then((m) => ({ default: m.TimelinePage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then((m) => ({ default: m.GalleryPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Brief branded intro; keep short so it never blocks real content for long
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      {isLoading && <LoadingScreen />}
      <Router>
        <Suspense fallback={null}>
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
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
