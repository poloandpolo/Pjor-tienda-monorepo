import React from 'react';
import './styles/MediaMainSlider.scss';
import Slider from 'react-slick';
import Leeve_breaks from '../images/Media_Thumbnails/Leeve_breaks.jpg';
import Concurso from '../images/Media_Thumbnails/Concurso.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const MediaMainSlider = ({ onSlideClick }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: true,
    pauseOnHover: true,
  };

  const handleImageClick = (section) => {
    onSlideClick(section);
  };

  return (
    <div className='media-main-slider'>
      <div className='media-main-slider__slider-container'>
        <Slider {...settings}>
          <div onClick={() => handleImageClick('leeveBreaks')}>
            <img src={Leeve_breaks} alt="Leeve breaks" />
          </div>
          <div onClick={() => handleImageClick('skateContest')}>
            <img src={Concurso} alt="Concurso en Xonaca skatepark" />
          </div>
        </Slider>
      </div>
    </div>
  );
};
