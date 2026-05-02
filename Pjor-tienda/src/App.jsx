// App.jsx

import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';

import { MenPage } from './pages/MenPage';
import { LandingPage } from './pages/LandingPage';
import { MediaPage } from './pages/MediaPage';
import { WomenPage } from './pages/WomenPage';
import { VisionPage } from './pages/VisionPage';
import { CrewPage } from './pages/CrewPage';
import CheckoutPage from './pages/CheckoutPage';
import { WakingupPage } from './pages/WakingupPage';

import { MenPageContextProvider } from './context/MenPageContext';
import { AuthProvider } from './context/authContext';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div className="body">

      <AuthProvider>

        <BrowserRouter>

          <Routes>

            {/* PRE LANDING */}
            <Route
              path="/"
              element={<WakingupPage />}
            />

            {/* LANDING REAL */}
            <Route
              path="/landing"
              element={<LandingPage />}
            />

            <Route
              path="/hombre"
              element={
                <MenPageContextProvider>
                  <MenPage />
                </MenPageContextProvider>
              }
            />

            <Route
              path="/mujer"
              element={
                <MenPageContextProvider>
                  <WomenPage />
                </MenPageContextProvider>
              }
            />

            <Route
              path="/media"
              element={<MediaPage />}
            />

            <Route
              path="/crew"
              element={<CrewPage />}
            />

            <Route
              path="/vision"
              element={<VisionPage />}
            />

            <Route
              path="/checkout"
              element={
                <MenPageContextProvider>
                  <CheckoutPage />
                </MenPageContextProvider>
              }
            />

          </Routes>

        </BrowserRouter>

      </AuthProvider>

    </div>
  );
}

export default App;