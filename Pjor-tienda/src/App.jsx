import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MenPage } from './pages/MenPage';
import { LandingPage } from './pages/LandingPage';
import { MenPageContextProvider } from './context/MenPageContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MediaPage } from './pages/MediaPage';
import { WomenPage } from './pages/WomenPage'; // Importa el componente WomenPage
import { VisionPage } from './pages/VisionPage'
import { CrewPage } from './pages/CrewPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <div className='body'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='hombre' element={
            <MenPageContextProvider>
              <MenPage />
            </MenPageContextProvider>
          } />
          <Route path='mujer' element={
            <MenPageContextProvider>
              <WomenPage />
            </MenPageContextProvider>
          } />
          <Route path='media' element={<MediaPage />} />
          <Route path='crew' element={<CrewPage />} />
          <Route path='vision' element={<VisionPage />} />
          <Route path='checkout' element={
            <MenPageContextProvider>
              <CheckoutPage />
            </MenPageContextProvider>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
