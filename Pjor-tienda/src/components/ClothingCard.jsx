import React, { useState } from 'react';
import Slider from 'react-slick';
import './styles/ClothingCard.scss';
import add_to_cart_icon from '/bolsa-de-la-compra.png';
import { SizeModal } from './SizeModal';
import { useMenPageContext } from '../context/MenPageContext';
import { ColorModal } from './ColorModal';

export const ClothingCard = ({
    images,
    text,
    sizes,
    colors,
    id,
    price,
    isClothingBarOpen,
    onOpenClothingModal,
    onWarning,
    onConfirm
}) => {

    const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
    const [isColorModalOpen, setIsColorModalOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);

    // ✅ FIX 1: inicializar con primer color
    const [selectedColor, setSelectedColor] = useState(colors?.[0] || null);

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
            onWarning();
        } else {
            addToCart({
                images,
                text,
                id,
                size: selectedSize,
                color: selectedColor, // objeto completo
                price
            });
            onConfirm();
        }
    };

    return (
        <div className={`clothing-card ${isClothingBarOpen ? 'clothing-card--open' : ''}`}>

            <div className="clothing-card__slider">
                <Slider {...settings}>
                    {images.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt={`img-${index}`} />
                        </div>
                    ))}
                </Slider>
            </div>

            <p>{text} (${price})</p>

            <div className="clothing-card__details">

                <label onClick={() => setIsSizeModalOpen(true)}>
                    {selectedSize || 'Talla'}
                </label>

                <label onClick={() => setIsColorModalOpen(true)}>
                    {/* ✅ FIX 2: usar image del objeto */}
                    {selectedColor ? (
                        <img
                            src={selectedColor.image}
                            alt={selectedColor.name}
                            className="clothing-card__color-thumbnail"
                        />
                    ) : (
                        'Color'
                    )}
                </label>

                <img
                    src={add_to_cart_icon}
                    alt="cart"
                    onClick={handleAddToCart}
                />
            </div>

            {isColorModalOpen && (
                <ColorModal
                    isOpen={isColorModalOpen}
                    onClose={() => setIsColorModalOpen(false)}
                    colors={colors}
                    onSelectColor={setSelectedColor} // objeto completo
                />
            )}

            {isSizeModalOpen && (
                <SizeModal
                    isOpen={isSizeModalOpen}
                    onClose={() => setIsSizeModalOpen(false)}
                    sizes={sizes}
                    onSelectSize={setSelectedSize}
                />
            )}
        </div>
    );
};