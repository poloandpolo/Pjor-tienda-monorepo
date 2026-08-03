import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import './styles/MenPage.scss';
import { NavigationBar } from '../components/NavigationBar';
import { ClothingMenuButton } from '../components/ClothingMenuButton';
import { ShoppingCartButton } from '../components/ShoppingCartButton';
import { ClothingBar } from '../components/ClothingBar';
import { ClothingGallery } from '../components/ClothingGallery';
import { ShoppingCart } from '../components/ShoppingCart';
import { ClothingModal } from '../components/ClothingModal';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { WarningModal } from '../components/WarningModal';
import { Footer } from '../components/Footer';
import { AccountButton } from '../components/AccountButton';
import { AccountModal } from '../components/AccountModal';
import { useNavigate, useLocation } from 'react-router-dom';


import { useMenPageContext } from '../context/MenPageContext';
import { getProductsByDepartment } from '../services/productService';
import { getDepartmentMenu } from '../services/departmentService';


export const MenPage = () => {
  const [isClothingBarOpen, setIsClothingBarOpen] = useState(false);
  const [shoppingCartIsOpen, setShoppingCartIsOpen] = useState(false);
  const [isClothingModalOpen, setIsClothingModalOpen] = useState(false);
  const [clothingModalData, setClothingModalData] = useState(null);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isAccountModalVisible, setIsAccountModalVisible] = useState(false);
  const [dropdownMenus,setDropdownMenus] = useState([]);

  const [menClothingItems, setMenClothingItems] = useState([]); // 🔥 NUEVO
  const [loading, setLoading] = useState(true); // 🔥 NUEVO

  const navigate = useNavigate();

  const location = useLocation();

  const { addToCart } = useMenPageContext();

  // 🔥 FETCH PRODUCTS
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const data = await getProductsByDepartment('men');

      console.log('PRODUCTOS:', data);

      setMenClothingItems(data);

    } catch (error) {
      console.error('Error cargando productos:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

useEffect(()=>{

 const fetchMenu = async()=>{

   const data = await getDepartmentMenu('men');

   setDropdownMenus(data);

 }

 fetchMenu();

},[]);

  useEffect(() => {
    if (location.state?.openAccountModal) {
      setIsAccountModalVisible(true);
    }
  }, [location.state]);

  const toggleAccountModal = () => {
    setIsAccountModalVisible(prev => !prev);
  };

  const toggleClothingBar = () => {
    setIsClothingBarOpen(prev => !prev);
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

  const handleClickPayment = () => {
    navigate('/checkout');
  };

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
          openOrdersOnLoad={location.state?.openOrdersSection}
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

        {!loading && (
          <ClothingGallery
            items={menClothingItems}
            isClothingBarOpen={isClothingBarOpen}
            onOpenClothingModal={openClothingModal}
            onConfirm={openConfirmationModal}
            onWarning={openWarningModal}
          />
        )}

      </div>

      <Footer />
    </div>
  );
};