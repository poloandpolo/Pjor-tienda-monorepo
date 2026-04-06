import React from 'react';
import men from '../images/men.jpg';
import women from '../images/women.jpg';
import { LandingPageHeader } from '../components/LandingPageHeader';
import './styles/LandingPage.scss';
import { LandingPageGenderImage } from '../components/LandingPageGenderImage';
import { LandingPageButton } from '../components/LandingPageButton';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const navigate = useNavigate();

  const handleClickMen = () => {
    navigate('/hombre');
  };

  const handleClickWomen = () => {
    navigate('/mujer');
  };

  const handleClickMedia = () => {
    navigate('/media');
  };

  const handleClickCrew = () => {
    navigate('/crew');
  };

  const handleClickVision = () => {
    navigate('/vision');
  };

  return (
    <div className='landing-page'>
      <LandingPageHeader />
      <div className='landing-page__cards-container'>
        <LandingPageGenderImage imagen={men} />
        <LandingPageGenderImage imagen={women} />
      </div>
      <div className='landing-page__buttons-container'>
        <LandingPageButton text={"Hombre"} onClick={handleClickMen}/>
        <LandingPageButton text={"Mujer"} onClick={handleClickWomen}/>
        <LandingPageButton text={"Media"} onClick={handleClickMedia}/>
        <LandingPageButton text={"Crew "} onClick={handleClickCrew}/>
        <LandingPageButton text={"Vision"} onClick={handleClickVision}/>
      </div>
    </div>
  );
};
