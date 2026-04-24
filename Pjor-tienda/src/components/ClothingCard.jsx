import React, { useState } from 'react';
import Slider from 'react-slick';
import './styles/ClothingCard.scss'; // Asegúrate de cambiar la extensión a SCSS si es necesario
import add_to_cart_icon from '/bolsa-de-la-compra.png';
import { SizeModal } from './SizeModal';
import { useMenPageContext } from '../context/MenPageContext';
import { ColorModal } from './ColorModal';

export const ClothingCard = ({ images, text, sizes, colors, id, price, isClothingBarOpen, onOpenClothingModal, onWarning, onConfirm }) => {
    const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
    const [isColorModalOpen, setIsColorModalOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const { addToCart } = useMenPageContext();

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: !isClothingBarOpen,
    };

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            onWarning(); // Mostrar el modal de advertencia si no se selecciona talla o color
        } else {
            addToCart({ images, text, id, size: selectedSize, color: selectedColor, price });
            onConfirm(); // Mostrar el Confirmation_modal
        }
    };

    const openSizeModal = () => {
        setIsSizeModalOpen(true);
    };

    const closeSizeModal = () => {
        setIsSizeModalOpen(false);
    };

    const openColorModal = () => {
        setIsColorModalOpen(true);
    };

    const closeColorModal = () => {
        setIsColorModalOpen(false);
    };

    const handleImageClick = () => {
        onOpenClothingModal({ images, text, sizes, colors, price });
    };

    return (
        <div className={`clothing-card ${isClothingBarOpen ? 'clothing-card--open' : ''}`}>
            <div className="clothing-card__slider">
                <Slider {...settings} className="clothing-card__slider-container">
                    {images.map((image, index) => (
                        <div key={index} className="clothing-card__slide">
                            <img
                                className={`clothing-card__image ${isClothingBarOpen ? 'clothing-card__image--open' : ''}`}
                                src={image}
                                alt={`clothing-image-${index}`}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
            <button className='clothing-card__modal-button' onClick={handleImageClick}></button>
            <p className='clothing-card__text'>{text} (${price})</p>
            <div className={`clothing-card__details ${isClothingBarOpen ? 'clothing-card__details--open' : ''}`}>
                <label className='clothing-card__details-size' onClick={openSizeModal}>
                    {selectedSize ? selectedSize : 'Talla'}
                </label>
                <label className='clothing-card__details-color' onClick={openColorModal}>
                    {selectedColor ? (
                        <img src={selectedColor.image} alt={selectedColor.name} className='clothing-card__color-thumbnail' />
                    ) : (
                        'Color'
                    )}
                </label>
                <img
                className={`clothing-card__cart-icon ${isClothingBarOpen ? 'clothing-card__cart-icon--open' : ''}`}
                src={add_to_cart_icon}
                alt="Add to cart"
                onClick={handleAddToCart}
            />
            </div>
            {isSizeModalOpen && (
                <SizeModal
                    isOpen={isSizeModalOpen}
                    onClose={closeSizeModal}
                    sizes={sizes}
                    onSelectSize={setSelectedSize} // Pasar la función para seleccionar talla
                />
            )}
            {isColorModalOpen && (
                <ColorModal
                    isOpen={isColorModalOpen}
                    onClose={closeColorModal}
                    colors={colors}
                    onSelectColor={setSelectedColor} // Pasar la función para seleccionar color
                />
            )}
        </div>
    );
};
