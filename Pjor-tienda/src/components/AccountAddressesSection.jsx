import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { AddressForm } from './AddressForm';

import { useMenPageContext } from '../context/MenPageContext';

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
    handleFocus,
    setActiveAddressId
}) => {

    const {
        addresses,
        fetchAddresses,
        error
    } = useMenPageContext();

    const sliderRef = useRef(null);

    // ✅ NUEVO ESTADO
    const [showAddressForm, setShowAddressForm] =
        useState(false);

    useEffect(() => {

        fetchAddresses();

    }, []);

    useEffect(() => {

        const timeout = setTimeout(() => {

            sliderRef.current
                ?.innerSlider
                ?.onWindowResized();

        }, 150);

        return () => clearTimeout(timeout);

    }, [addresses]);

    useEffect(() => {

        if (
            addresses.length > 0 &&
            setActiveAddressId
        ) {

            setActiveAddressId(
                addresses[0].id
            );

        }

    }, [addresses, setActiveAddressId]);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: false,
        swipeToSlide: true,
        waitForAnimate: false,

        afterChange: (currentSlide) => {

            const currentAddress =
                addresses[currentSlide];

            if (
                currentAddress &&
                setActiveAddressId
            ) {

                setActiveAddressId(
                    currentAddress.id
                );

            }

        }
    };

    if (error) {

        return <div>{error}</div>;

    }

    return (

        <div className='account-addresses-section'>

            {
                showAddressForm ? (

                    <AddressForm
                        onClose={() =>
                            setShowAddressForm(false)
                        }
                    />

                ) : (

                    <>
                        {addresses.length > 0 ? (

                            <Slider
                                ref={sliderRef}
                                {...settings}
                            >

                                {addresses.map((addressData) => (

                                    <div key={addressData.id}>

                                        <AccountAddressItem
                                            addressData={addressData}
                                            editingFields={editingFields}
                                            handleFieldChange={
                                                handleFieldChange
                                            }
                                            handleEditClick={
                                                handleEditClick
                                            }
                                            handleSaveClick={
                                                handleSaveClick
                                            }
                                            handleCancelClick={
                                                handleCancelClick
                                            }
                                            tempValues={tempValues}
                                            fetchAddresses={
                                                fetchAddresses
                                            }
                                            inputRefs={inputRefs}
                                            handleFocus={handleFocus}
                                        />

                                    </div>

                                ))}

                            </Slider>

                        ) : (

                            <p>
                                No hay direcciones guardadas
                            </p>

                        )}
                    </>

                )
            }

            <button
                className='account-addresses-section__back-button'
                onClick={handleBackToMenuClick}
            >
                Volver
            </button>

        </div>

    );

};