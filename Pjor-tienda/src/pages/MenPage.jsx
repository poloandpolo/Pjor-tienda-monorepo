import React, { useState } from 'react';
import { Header } from '../components/Header';
import './styles/MenPage.scss';
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
import { AccountButton } from '../components/AccountButton';
import { AccountModal } from '../components/AccountModal';
import { useNavigate } from 'react-router-dom';

const dropdownMenus = [
  {
    title: "Gorras",
    emoji: "🧢",
    items: ["Beisbol", "Snapback", "5 Paneles"]
  },
  {
    title: "Prendas superiores",
    emoji: "👕",
    items: ["Playeras", "Polos", "Camisas", "Hoodies", "Chamarras"]
  },
  {
    title: "Prendas inferiores",
    emoji: "👖",
    items: ["Jogger", "Jeans", "Calcetas"]
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

export const MenPage = () => {
  const [isClothingBarOpen, setIsClothingBarOpen] = useState(false);
  const [shoppingCartIsOpen, setShoppingCartIsOpen] = useState(false);
  const [isClothingModalOpen, setIsClothingModalOpen] = useState(false);
  const [clothingModalData, setClothingModalData] = useState(null);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isAccountModalVisible, setIsAccountModalVisible] = useState(false); // Nuevo estado para mostrar el modal

  const navigate = useNavigate()

  const { menClothingItems } = useMenPageContext();

  const toggleAccountModal = () => {
    setIsAccountModalVisible(prevState => !prevState); // Cambiar la visibilidad del modal
  };

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

  const handleClickPayment = () =>{
    navigate('/checkout');
    console.log('hola mundo')
  }

  return (
    <div className='men-page'>
      <Header />
      <NavigationBar />
      <div className='men-page__clothing-section'>
        {!isClothingBarOpen && (
          <ClothingMenuButton
            toggleClothingBar={toggleClothingBar}
            isOpen={isClothingBarOpen}
          />
        )}
        <AccountModal 
        isVisible={isAccountModalVisible}
        onClose={toggleAccountModal}
         />
        <AccountButton
          isOpen={isClothingBarOpen}
          onClick={toggleAccountModal}
        />
        <ShoppingCartButton
          onClick={openShoppingCart}
          isOpen={isClothingBarOpen}
        />
        <ShoppingCart
          isOpen={shoppingCartIsOpen}
          onClose={closeShoppingCart}
          onClickPayment={handleClickPayment}
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
          items={menClothingItems}
          isClothingBarOpen={isClothingBarOpen}
          onOpenClothingModal={openClothingModal}
          onConfirm={openConfirmationModal}
          onWarning={openWarningModal}
        />
      </div>
      <Footer />
    </div>
  );
};
