import React from 'react';
import './styles/ClothingGallery.scss'; 
import { ClothingCard } from './ClothingCard';

export const ClothingGallery = ({ items, isClothingBarOpen, onOpenClothingModal, onWarning, onConfirm }) => {
    return (
        <div className={`clothing-gallery ${isClothingBarOpen ? 'clothing-gallery--with-clothing-bar' : ''}`}>
            {items.map(item => (
                <ClothingCard
                    key={item.id}
                    images={item.images}
                    text={item.text}
                    id={item.id}
                    sizes={item.sizes}
                    colors={item.colors}
                    price={item.price}
                    isClothingBarOpen={isClothingBarOpen}
                    onOpenClothingModal={onOpenClothingModal}
                    onWarning={onWarning}
                    onConfirm={onConfirm}  // Nueva prop
                />
            ))}
        </div>
    );
};
