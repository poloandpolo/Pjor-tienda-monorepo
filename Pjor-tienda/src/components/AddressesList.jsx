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

  // 🔥 DEBUG
  useEffect(() => {
    console.log('📦 ADDRESSES STATE:', addresses);
    console.log('📊 LENGTH:', addresses.length);
  }, [addresses]);

  // 🔥 scroll control
  useImperativeHandle(ref, () => ({
    scrollToLast: () => {
      if (sliderRef.current && addresses.length > 0) {
        sliderRef.current.slickGoTo(addresses.length - 1);
      }
    },
  }));

  // 🔥 fetch inicial
  useEffect(() => {
    console.log('🚀 FETCHING ADDRESSES...');
    fetchAddresses();
  }, []);

  // 🔥 forzar re-render de slick
  useEffect(() => {
    console.log('🔁 REBUILD SLIDER');
    setSliderKey(prev => prev + 1);
  }, [addresses]);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const handleSelection = (address) => {
    console.log('✅ SELECTED ADDRESS:', address);
    setSelectedAddress(address);
  };

  // 🔥 ERROR STATE
  if (error) {
    return (
      <div className="addresses-list__content">
        <div className="addresses-list__empty">
          Error al cargar direcciones: {error}
        </div>

        <div className="addresses-list__footer">
          <label
            className="addresses-list__label"
            onClick={openModal}
          >
            Agregar Dirección
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="addresses-list__content">

      {/* 🔥 BODY */}
      <div className="addresses-list__body">
        {addresses.length > 0 ? (
          <Slider
            key={sliderKey}
            ref={sliderRef}
            {...sliderSettings}
          >
            {addresses.map((address) => {
              console.log('🧱 RENDERING ADDRESS:', address);

              return (
                <div key={address.id}>
                  <AddressItem
                    address={address}
                    isSelected={selectedAddress?.id === address.id}
                    onSelect={handleSelection}
                  />
                </div>
              );
            })}
          </Slider>
        ) : (
          <div className="addresses-list__empty">
            {console.log('⚠️ NO ADDRESSES')}
            No hay direcciones disponibles
          </div>
        )}
      </div>

      {/* 🔥 FOOTER (AQUÍ VA EL BOTÓN, FUERA DEL SLIDER) */}
      <div className="addresses-list__footer">
        <label
          className="addresses-list__label"
          onClick={openModal}
        >
          Agregar Dirección
        </label>
      </div>

    </div>
  );
});