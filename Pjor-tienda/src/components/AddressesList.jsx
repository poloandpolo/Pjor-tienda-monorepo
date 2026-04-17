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

  // 🔥 DEBUG: ver estado global
  useEffect(() => {
    console.log('📦 ADDRESSES STATE:', addresses);
    console.log('📊 LENGTH:', addresses.length);
    console.log('⚠️ TYPE:', typeof addresses);
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

  // 🔥 re-render slider
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
    arrows: false,
  };

  const handleSelection = (address) => {
    console.log('✅ SELECTED ADDRESS:', address);
    setSelectedAddress(address);
  };

  // 🔥 ERROR
  if (error) {
    console.log('❌ ERROR STATE:', error);

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

      <label
        className="addresses-list__label"
        onClick={openModal}
      >
        Agregar Dirección
      </label>

    </div>
  );
});