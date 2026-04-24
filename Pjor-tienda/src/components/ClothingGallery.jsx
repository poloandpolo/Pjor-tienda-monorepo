import React from 'react';
import './styles/ClothingGallery.scss';
import { ClothingCard } from './ClothingCard';

export const ClothingGallery = ({
    items,
    isClothingBarOpen,
    onOpenClothingModal,
    onWarning,
    onConfirm
}) => {

    // ✅ FILTRO SOLO HOMBRE
    const menItems = items.filter(item => item.category === 'men');

    return (
        <div className={`clothing-gallery ${isClothingBarOpen ? 'clothing-gallery--with-clothing-bar' : ''}`}>
            {menItems.map(item => (
                <ClothingCard
                    key={item.id}
                    images={item.images}
                    text={item.text}
                    id={item.id}
                    sizes={item.sizes}
                    colors={item.colors}   // 👈 array correcto
                    price={item.price}
                    isClothingBarOpen={isClothingBarOpen}
                    onOpenClothingModal={onOpenClothingModal}
                    onWarning={onWarning}
                    onConfirm={onConfirm}
                />
            ))}
        </div>
    );
};