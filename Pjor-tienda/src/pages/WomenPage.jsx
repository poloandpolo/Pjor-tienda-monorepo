import React, { useState } from 'react';
import { Header } from '../components/Header';
import './styles/WomenPage.scss';
import { NavigationBar } from '../components/NavigationBar';
import { ClothingMenuButton } from '../components/ClothingMenuButton';
import { ShoppingCartButton } from '../components/ShoppingCartButton';
import { ClothingBar } from '../components/ClothingBar';
import { ClothingGallery } from '../components/ClothingGallery';
import { useMenPageContext } from '../context/MenPageContext';
import { ShoppingCart } from '../components/ShoppingCart';
import { ClothingModal } from '../components/ClothingModal';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { WarningModal } from '../components/WarningModal'; // Asegúrate de que el nombre coincida con tu archivo
import { Footer } from '../components/Footer';

const dropdownMenus = [
    {
      title: "Gorras",
      emoji: "🧢",
      items: ["Beisbol", "Snapback", "5 Paneles"]
    },
    {
      title: "Prendas superiores",
      emoji: "👚",
      items: ["Blusas", "Croptops", "Camisas", "Hoodies", "Chamarras"]
    },
    {
      title: "Vestidos y Jumper",
      emoji: "👗",
      items: ["Vestido", "Jumper"]
    },
    {
      title: "Prendas inferiores",
      emoji: "👖",
      items: ["Jogger", "Jeans", "Faldas"]
    },
    {
      title: "Accesorios",
      emoji: "🧦",
      items: ["Cinturones", "Calcetas"]
    },
    {
      title: "Joyeria",
      emoji: "💍",
      items: ["Collares", "Pulseras", "Brazaletes", "Cadenas", "Dijes"]
    }
  ];

export const WomenPage = () => {
  const [isClothingBarOpen, setIsClothingBarOpen] = useState(false);
  const [shoppingCartIsOpen, setShoppingCartIsOpen] = useState(false);
  const [isClothingModalOpen, setIsClothingModalOpen] = useState(false);
  const [clothingModalData, setClothingModalData] = useState(null);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const { womenClothingItems } = useMenPageContext();

  const toggleClothingBar = () => {
    setIsClothingBarOpen(prevState => !prevState);
  };

  const openShoppingCart = () => {
    setShoppingCartIsOpen(true);
  };

  const closeShoppingCart = () => {
    setShoppingCartIsOpen(false);
  };

  const openClothingModal = (item) => {
    setClothingModalData(item);
    setIsClothingModalOpen(true);
  };

  const closeClothingModal = () => {
    setClothingModalData(null);
    setIsClothingModalOpen(false);
  };

  const openWarningModal = () => {
    setIsWarningModalOpen(true);
  };

  const closeWarningModal = () => {
    setIsWarningModalOpen(false);
  };

  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  return (
    <div className='women-page'>
      <Header />
      <NavigationBar />
      <div className='women-page__clothing-section'>
        {!isClothingBarOpen && (
          <ClothingMenuButton
            toggleClothingBar={toggleClothingBar}
            isOpen={isClothingBarOpen}
          />
        )}
        <ShoppingCartButton
          onClick={openShoppingCart}
          isOpen={isClothingBarOpen}
        />
        <ShoppingCart
          isOpen={shoppingCartIsOpen}
          onClose={closeShoppingCart}
        />
        <ClothingModal
          isOpen={isClothingModalOpen}
          onClose={closeClothingModal}
          data={clothingModalData}
          onWarning={openWarningModal}
          onConfirm={openConfirmationModal}
        />
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={closeConfirmationModal}
        />
        <WarningModal
          isOpen={isWarningModalOpen}
          onClose={closeWarningModal}
        />
        {isClothingBarOpen && (
          <ClothingBar
            dropdownMenus={dropdownMenus}
            isOpen={isClothingBarOpen}
            toggleClothingBar={toggleClothingBar}
          />
        )}
        <ClothingGallery
          items={womenClothingItems}
          isClothingBarOpen={isClothingBarOpen}
          onOpenClothingModal={openClothingModal}
          onConfirm={openConfirmationModal}
          onWarning={openWarningModal}
        />
      </div>
      <Footer/>
    </div>
  );
};
