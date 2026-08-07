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

    <AuthProvider>

      <MenPageContextProvider>

        <BrowserRouter>

          <Routes>


            {/* PRE LANDING */}
            <Route
              path="/"
              element={<WakingupPage />}
            />


            {/* LANDING */}
            <Route
              path="/landing"
              element={<LandingPage />}
            />


            {/* HOMBRE */}
            <Route
              path="/hombre"
              element={<MenPage />}
            />


            {/* MUJER */}
            <Route
              path="/mujer"
              element={<WomenPage />}
            />


            {/* MEDIA */}
            <Route
              path="/media"
              element={<MediaPage />}
            />


            {/* CREW */}
            <Route
              path="/crew"
              element={<CrewPage />}
            />


            {/* VISION */}
            <Route
              path="/vision"
              element={<VisionPage />}
            />


            {/* CHECKOUT */}
            <Route
              path="/checkout"
              element={<CheckoutPage />}
            />


            {/* RUTA DESCONOCIDA */}
            <Route
              path="*"
              element={<LandingPage />}
            />


          </Routes>

        </BrowserRouter>

      </MenPageContextProvider>

    </AuthProvider>

  );

}


export default App;