import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';

import playera_logo_clasica_hombre from '../images/playera_logo_clasica_hombre.jpg';
import playera_logo_clasica_hombre_2 from '../images/playera_logo_clasica_hombre.jpg';
import playera_logo_clasica_mujer from '../images/playera_logo_clasica_mujer.jpg';
import playera_logo_clasica_mujer_2 from '../images/playera_logo_clasica_mujer.jpg';

import black from '../images/Clothing_Colors/Black.jpg';
import white from '../images/Clothing_Colors/white.jpg';

// 🔥 services
import { apiFetch } from '../services/api';
import { getPaymentMethods } from '../services/paymentService';

const MenPageContext = createContext();

export const useMenPageContext = () => {
  return useContext(MenPageContext);
};

export const MenPageContextProvider = ({
  children
}) => {

  // ========================
  // 🔐 AUTH
  // ========================
  const [isAuthenticated, setIsAuthenticated] =
    useState(
      !!localStorage.getItem('jwt')
    );

  useEffect(() => {

    const checkAuth = () => {
      setIsAuthenticated(
        !!localStorage.getItem('jwt')
      );
    };

    window.addEventListener(
      'storage',
      checkAuth
    );

    return () =>
      window.removeEventListener(
        'storage',
        checkAuth
      );

  }, []);

  // ========================
  // 🛒 CART
  // ========================
  const [cartItems, setCartItems] =
    useState(() => {

      const storedCart =
        localStorage.getItem('cartItems');

      return storedCart
        ? JSON.parse(storedCart)
        : [];

    });

  useEffect(() => {

    localStorage.setItem(
      'cartItems',
      JSON.stringify(cartItems)
    );

  }, [cartItems]);

  const addToCart = (item) => {

    setCartItems((prevItems) => {

      const existingItemIndex =
        prevItems.findIndex(
          (cartItem) =>
            cartItem.id === item.id &&
            cartItem.size === item.size &&
            cartItem.color === item.color
        );

      if (existingItemIndex > -1) {

        const updatedItems = [...prevItems];

        updatedItems[
          existingItemIndex
        ].quantity += 1;

        return updatedItems;

      } else {

        return [
          ...prevItems,
          {
            ...item,
            quantity: 1
          }
        ];

      }

    });

  };

  const updateItemQuantity = (
    id,
    size,
    color,
    amount
  ) => {

    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id &&
            item.size === size &&
            item.color === color
            ? {
              ...item,
              quantity:
                item.quantity + amount
            }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );

  };

  
  // ========================
  // 📍 ADDRESSES
  // ========================
  const [addresses, setAddresses] =
    useState([]);

  const [
    addressesError,
    setAddressesError
  ] = useState(null);

  const fetchAddresses = async () => {

    setAddressesError(null);

    try {

      const data =
        await apiFetch('/api/addresses');

      if (
        data &&
        Array.isArray(data.addresses)
      ) {

        setAddresses(data.addresses);

        return data.addresses;

      } else if (
        Array.isArray(data)
      ) {

        setAddresses(data);

        return data;

      } else {

        setAddresses([]);

        return [];

      }

    } catch (err) {

      setAddressesError(
        'Error al cargar las direcciones'
      );

      console.error(err);

      throw err;
    }
  };

  // ========================
  // 💳 PAYMENTS
  // ========================
  const [
    paymentMethods,
    setPaymentMethods
  ] = useState([]);

  const [
    paymentMethodsError,
    setPaymentMethodsError
  ] = useState(null);

  const fetchPaymentMethods =
    async () => {

      setPaymentMethodsError(null);

      try {

        const data =
          await getPaymentMethods();

        if (
          Array.isArray(data)
        ) {

          setPaymentMethods(data);

          return data;

        } else {

          setPaymentMethods([]);

          return [];

        }

      } catch (err) {

        setPaymentMethodsError(
          'Error al cargar métodos de pago'
        );

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

        addToCart,
        updateItemQuantity,

        addresses,
        addressesError,
        fetchAddresses,

        paymentMethods,
        paymentMethodsError,
        fetchPaymentMethods,

        isAuthenticated,
      }}
    >
      {children}
    </MenPageContext.Provider>
  );
};