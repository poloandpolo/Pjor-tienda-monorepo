import React from 'react';
import './styles/LandingPageButton.scss';

export const LandingPageButton = ({ text, onClick }) => {
  return (
    <div className='landing-page-button' onClick={onClick}>
      <button className='landing-page-button__button'>{text}</button>
    </div>
  );
};
