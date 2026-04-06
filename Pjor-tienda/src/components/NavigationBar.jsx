import React from 'react';
import './styles/NavigationBar.scss';
import { useNavigate } from 'react-router-dom';

export const NavigationBar = () => {
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

    <nav className='navigation-bar'>
      <ul className='navigation-bar__list'>
        <li className='navigation-bar__item'><a className='navigation-bar__link' onClick={handleClickMen}>Hombre</a></li>
        <li className='navigation-bar__item'><a className='navigation-bar__link' onClick={handleClickWomen}>Mujer</a></li>
        <li className='navigation-bar__item'><a className='navigation-bar__link'onClick={handleClickMedia}>Media</a></li>
        <li className='navigation-bar__item'><a className='navigation-bar__link'onClick={handleClickCrew}>Crew</a></li>
        <li className='navigation-bar__item'><a className='navigation-bar__link' onClick={handleClickVision}>Vision</a></li>
      </ul>
    </nav>
  );
}
