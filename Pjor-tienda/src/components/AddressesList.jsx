import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import Slider from 'react-slick';
import './styles/AddressesList.scss';
import { AddressItem } from './AddressItem';
import { useMenPageContext } from '../context/MenPageContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const AddressesList = forwardRef(({_, ref, openModal}) => {
  const { addresses, error, fetchAddresses } = useMenPageContext();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const sliderRef = React.useRef();

  useImperativeHandle(ref, () => ({
    scrollToLast: () => {
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(addresses.length - 1); // Ir al último slide
      }
    },
  }));

  useEffect(() => {
    fetchAddresses();
  }, []); // Solo se ejecuta una vez al montar el componente

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
    return <div>Error al cargar direcciones: {error}</div>;
  }

  return (
    <div className="addresses-list__content">
      {addresses.length > 0 ? (
        <Slider ref={sliderRef} {...sliderSettings}>
          {addresses.map((address) => (
            <div key={address.id}>
              <AddressItem
                address={address}
                isSelected={selectedAddress && selectedAddress.id === address.id}
                onSelect={handleSelection}
              />
            </div>
          ))}
        </Slider>
      ) : (
        <div>No hay direcciones disponibles</div>
      )}
      <label className="addresses-list__label" onClick={openModal} >
        Agregar Dirección
      </label>
    </div>
  );
  
});
