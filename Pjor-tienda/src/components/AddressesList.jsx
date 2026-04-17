import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import Slider from 'react-slick';
import './styles/AddressesList.scss';
import { AddressItem } from './AddressItem';
import { useMenPageContext } from '../context/MenPageContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const AddressesList = forwardRef(({ openModal }, ref) => {

  const { addresses = [], error, fetchAddresses } = useMenPageContext();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [sliderKey, setSliderKey] = useState(0);

  const sliderRef = useRef(null);

  // 🔥 scroll control (padre)
  useImperativeHandle(ref, () => ({
    scrollToLast: () => {
      if (sliderRef.current && addresses.length > 0) {
        sliderRef.current.slickGoTo(addresses.length - 1);
      }
    },
  }));

  // 🔥 fetch al entrar a la página
  useEffect(() => {
    fetchAddresses();
  }, []);

  // 🔥 fuerza re-render del slider cuando cambian las direcciones
  useEffect(() => {
    setSliderKey(prev => prev + 1);
  }, [addresses]);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleSelection = (address) => {
    setSelectedAddress(address);
  };

  // 🔥 ERROR STATE
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

      <div className="addresses-list__body">
        {addresses.length > 0 ? (
          <Slider
            key={sliderKey} // 🔥 CLAVE para re-render correcto
            ref={sliderRef}
            {...sliderSettings}
          >
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
            No hay direcciones disponibles
          </div>
        )}
      </div>

      <label
        className="addresses-list__label"
        onClick={openModal}
      >
        Agregar Dirección
      </label>

    </div>
  );
});