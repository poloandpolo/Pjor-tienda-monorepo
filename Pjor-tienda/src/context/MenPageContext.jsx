import React, { createContext, useContext, useState, useEffect } from 'react';
import playera_logo_clasica_hombre from '../images/playera_logo_clasica_hombre.jpg';
import playera_logo_clasica_hombre_2 from '../images/playera_logo_clasica_hombre.jpg';
import playera_logo_clasica_mujer from '../images/playera_logo_clasica_mujer.jpg';
import playera_logo_clasica_mujer_2 from '../images/playera_logo_clasica_mujer.jpg';
import black from '../images/Clothing_Colors/Black.jpg';
import white from '../images/Clothing_Colors/white.jpg';

// 🔥 IMPORTANTE
import { apiFetch } from '../services/api';

const MenPageContext = createContext();

export const useMenPageContext = () => {
  return useContext(MenPageContext);
};

export const MenPageContextProvider = ({ children }) => {

  // ========================
  // 🛒 CART
  // ========================
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size &&
          cartItem.color === item.color
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const updateItemQuantity = (id, size, color, amount) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ========================
  // 👕 PRODUCTS
  // ========================
  const menClothingItems = [
    { id: 1, images: [playera_logo_clasica_hombre, playera_logo_clasica_hombre_2], text: "Playera logo clásica hombre", sizes: ['s', 'm', 'l', 'xl', 'xxl'], colors: [black, white], price: 100 },
    { id: 2, images: [playera_logo_clasica_hombre, playera_logo_clasica_hombre_2], text: "Playera logo clásica hombre 2", sizes: ['s', 'm', 'l', 'xl', 'xxl'], colors: [black, white], price: 100 },
    { id: 3, images: [playera_logo_clasica_hombre, playera_logo_clasica_hombre_2], text: "Playera logo clásica hombre 3", sizes: ['s', 'm', 'l', 'xl', 'xxl'], colors: [black, white], price: 100 },
    { id: 4, images: [playera_logo_clasica_hombre, playera_logo_clasica_hombre_2], text: "Playera logo clásica hombre 4", sizes: ['s', 'm', 'l', 'xl', 'xxl'], colors: [black, white], price: 100 },
  ];

  const womenClothingItems = [
    { id: 7, images: [playera_logo_clasica_mujer, playera_logo_clasica_mujer_2], text: "Playera logo clásica mujer", sizes: ['s', 'm', 'l', 'xl', 'xxl'], colors: [black, white], price: 100 },
    { id: 8, images: [playera_logo_clasica_mujer, playera_logo_clasica_mujer_2], text: "Playera logo clásica mujer 2", sizes: ['s', 'm', 'l', 'xl', 'xxl'], colors: [black, white], price: 100 },
  ];

  // ========================
  // 📍 ADDRESSES
  // ========================
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState(null);

  const fetchAddresses = async () => {
    try {
      const data = await apiFetch('/api/addresses');

      if (data && Array.isArray(data.addresses)) {
        setAddresses(data.addresses);
        return data.addresses;
      } else if (Array.isArray(data)) {
        setAddresses(data);
        return data;
      } else {
        setAddresses([]);
        return [];
      }

    } catch (err) {
      setError('Error al cargar las direcciones');
      console.error(err);
      throw err;
    }
  };

  // ========================
  // 💳 PAYMENTS
  // ========================
  const [paymentMethods, setPaymentMethods] = useState([]);

  const fetchPaymentMethods = async () => {
    try {
      const data = await apiFetch('/api/payments/payment-methods');

      if (Array.isArray(data)) {
        setPaymentMethods(data);
        return data;
      } else {
        setPaymentMethods([]);
        return [];
      }

    } catch (err) {
      setError('Error al cargar métodos de pago');
      console.error(err);
      throw err;
    }
  };

  // ========================
  // PROVIDER
  // ========================
  return (
    <MenPageContext.Provider
      value={{
        cartItems,
        menClothingItems,
        womenClothingItems,
        addToCart,
        updateItemQuantity,
        addresses,
        error,
        fetchAddresses,
        paymentMethods,
        fetchPaymentMethods,
      }}
    >
      {children}
    </MenPageContext.Provider>
  );
};