import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useMenPageContext } from '../context/MenPageContext';
import { updateAddress } from '../services/addressService';
import './styles/AccountAddressesSection.scss';

import { AccountAddressItem } from './AccountAddressItem';

export const AccountAddressesSection = ({
    editingFields,
    handleFieldChange,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    tempValues,
    handleBackToMenuClick,
    inputRefs,
    handleFocus
}) => {

    const {
        addresses,
        fetchAddresses,
        error
    } = useMenPageContext();

    const sliderRef = useRef(null);

    useEffect(() => {
        fetchAddresses();
    }, []);

    // 🔧 FIX: forzar recalculo de slick cuando llegan datos
    useEffect(() => {

        const timeout = setTimeout(() => {
            sliderRef.current?.slickGoTo(0);
            sliderRef.current?.innerSlider?.onWindowResized();
        }, 150);

        return () => clearTimeout(timeout);

    }, [addresses]);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: false // 🔴 FIX IMPORTANTE
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='account-addresses-section'>

            {addresses.length > 0 ? (

                <Slider ref={sliderRef} {...settings}>

                    {addresses.map((addressData) => (

                        <div key={addressData.id}>

                            <AccountAddressItem
                                addressData={addressData}
                                editingFields={editingFields}
                                handleFieldChange={handleFieldChange}
                                handleEditClick={handleEditClick}
                                handleSaveClick={handleSaveClick}
                                handleCancelClick={handleCancelClick}
                                tempValues={tempValues}
                                fetchAddresses={fetchAddresses}
                                inputRefs={inputRefs}
                                handleFocus={handleFocus}
                            />

                        </div>

                    ))}

                </Slider>

            ) : (
                <p>No hay direcciones guardadas</p>
            )}

            <button
                className='account-addresses-section__back-button'
                onClick={handleBackToMenuClick}
            >
                Volver
            </button>

        </div>
    );
};