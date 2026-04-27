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

export const AddressesList = forwardRef(
  (
    {
      selectedAddress,
      setSelectedAddress,
      openModal,
    },
    ref
  ) => {
    const {
      addresses = [],
      error,
      fetchAddresses,
    } = useMenPageContext();

    const [sliderKey, setSliderKey] = useState(0);

    const sliderRef = useRef(null);

    useImperativeHandle(ref, () => ({
      scrollToLast: () => {
        if (sliderRef.current && addresses.length > 0) {
          sliderRef.current.slickGoTo(addresses.length - 1);
        }
      },
    }));

    useEffect(() => {
      fetchAddresses();
    }, []);

    useEffect(() => {
      setSliderKey((prev) => prev + 1);
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
      setSelectedAddress(address);
    };

    if (error) {
      return (
        <div className="addresses-list__content">
          <div className="addresses-list__body">
            <div className="addresses-list__empty">
              Error al cargar direcciones: {error}
            </div>
          </div>
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
              {addresses.map((address) => (
                <div key={address.id}>
                  <AddressItem
                    address={address}
                    isSelected={
                      selectedAddress?.id === address.id
                    }
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
      </div>
    );
  }
);