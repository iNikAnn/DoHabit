// src/App.js
import './App.css';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useDialogStore } from './stores/dialogStore';
import MainPage from './components/MainPage';
import Modal from './components/Modal';
import Dialog from './components/Containment/Dialog';
import useColorScheme from './hooks/useColorScheme';
import useAchievementsCheck from './hooks/useAchievementsCheck';
import dbModalRoutes from './db/dbModalRoutes';

// NEW COMPONENTS
import WeeklySummary from './components/WeeklySummary';
import HeatMap from './components/HeatMap';

const PUBLIC_URL = process.env.PUBLIC_URL;

function App() {
  const location = useLocation();
  const isDialogVisible = useDialogStore((s) => s.isVisible);

  useColorScheme();
  useAchievementsCheck();

  return (
    <main className="App">
      <AnimatePresence initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="*" element={<Navigate to={PUBLIC_URL} />} />

          <Route
            path={PUBLIC_URL}
            element={
              <>
                <WeeklySummary />
                <HeatMap />
                <MainPage />
              </>
            }
          />

          <Route path={`${PUBLIC_URL}/modal`} element={<Modal />}>
            {dbModalRoutes.map((r) => (
              <Route key={r.path} path={r.path} element={r.element} />
            ))}
          </Route>
        </Routes>

        {isDialogVisible && <Dialog key="dialog" />}
      </AnimatePresence>
    </main>
  );
}

export default App;
