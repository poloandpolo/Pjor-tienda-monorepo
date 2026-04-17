import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react';
import Slider from 'react-slick';
import './styles/AddressesList.scss';
import { AddressItem } from './AddressItem';
import { useMenPageContext } from '../context/MenPageContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const AddressesList = forwardRef(({ openModal }, ref) => {

  const { addresses = [], error, fetchAddresses } = useMenPageContext();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const sliderRef = useRef(null);

  // 🔥 Exponer función al padre
  useImperativeHandle(ref, () => ({
    scrollToLast: () => {
      if (sliderRef.current && addresses.length > 0) {
        sliderRef.current.slickGoTo(addresses.length - 1);
      }
    },
  }));

  // 🔥 Fetch inicial
  useEffect(() => {
    fetchAddresses();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleSelection = (address) => {
    setSelectedAddress(address);
  };

  if (error) {
    return (
      <div className="addresses-list__content">
        <div className="addresses-list__empty">
          Error al cargar direcciones: {error}

        </div>

         <label
            className="addresses-list__label"
            onClick={openModal}
          >
            Agregar Dirección
          </label>
          
      </div>
    );
  }

  return (
    <div className="addresses-list__content">

      {addresses.length > 0 ? (
        <Slider ref={sliderRef} {...sliderSettings}>
          {addresses.map((address) => (
            <div key={address.id}>
              <AddressItem
                address={address}
                isSelected={selectedAddress?.id === address.id}
                onSelect={handleSelection}
              />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="addresses-list__empty">
          <p>No hay direcciones disponibles</p>

          <label
            className="addresses-list__label"
            onClick={openModal}
          >
            Agregar Dirección
          </label>

        </div>
      )}

      <label
        className="addresses-list__label"
        onClick={openModal}
      >
        Agregar Dirección
      </label>

    </div>
  );
});