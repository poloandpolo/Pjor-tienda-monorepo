// WakingupPage.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const WakingupPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    wakeServer();
  }, []);

  const wakeServer = async () => {
    try {
      await fetch(
        'https://pjor-tienda-monorepo.onrender.com/',
        {
          method: 'GET'
        }
      );
    } catch (error) {
      console.error(
        'Wake server error:',
        error
      );
    } finally {
      setTimeout(() => {
        navigate('/landing');
      }, 1200);
    }
  };

  return (
    <div className="wakingup-page">

      <div className="wakingup-page__content">

        <h1 className="wakingup-page__logo">
          Pjor
        </h1>

        <p className="wakingup-page__text">
          Preparing experience...
        </p>

        <div className="wakingup-page__spinner"></div>

      </div>

    </div>
  );
};