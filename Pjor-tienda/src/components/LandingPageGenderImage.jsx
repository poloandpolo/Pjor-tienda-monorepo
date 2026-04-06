import React from 'react'
import './styles/LandingPageGenderImage.scss'

export const LandingPageGenderImage = ({imagen, onClick} ) => {
  return (
    <div className='landing-page-gender-image__container' onClick={onClick}>
      <img className='landing-page-gender-image__image' src={imagen} alt="" />
    </div>
  )
}
