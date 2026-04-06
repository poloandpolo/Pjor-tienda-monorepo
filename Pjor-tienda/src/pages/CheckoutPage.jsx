import React, { useRef, useState } from 'react';
import './styles/CheckoutPage.scss';
import { CheckoutHeader } from '../components/CheckoutHeader';
import { ShoppingCartCard } from '../components/ShoppingCartCard';
import { useMenPageContext } from '../context/MenPageContext';
import { AddressForm } from '../components/AddressForm';
import { AddressesList } from '../components/AddressesList';
import { useNavigate } from 'react-router-dom';
import { PaymentsList } from '../components/PaymentsList';
import { PaymentModal } from '../components/PaymentModal';
import {PaymentErrorModal} from '../components/PaymentErrorModal'

const CheckoutPage = () => {
  const { cartItems } = useMenPageContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentModalOpen, setpaymentModalOpen] = useState(true)
  const [activeSection, setActiveSection] = useState('shipping'); // Estado para manejar la sección activa
  const addressesListRef = useRef();


  const navigate = useNavigate();

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);
  const closePaymentModal = () => setpaymentModalOpen(false);

  const handleAddressSubmit = (data) => {
    console.log(data);

    if (addressesListRef.current) {
      setTimeout(() => {
        addressesListRef.current.scrollToLast();
      }, 0);
    }
  };

  const cartCards = cartItems.map((item) => <ShoppingCartCard key={item.id} item={item} />);
  const handleStoreClick = () => navigate(-1);

  return (
    <div className="checkout-page">
      <CheckoutHeader onClickStore={handleStoreClick} />
      {/* Modal de dirección */}
      <AddressForm onSubmit={handleAddressSubmit} modalOpen={modalOpen} closeModal={closeModal} />
      <PaymentModal paymentModalOpen={paymentModalOpen} closePaymentModal={closePaymentModal}/>
      <PaymentErrorModal/>
      <div className="checkout-page__main-content">
        <div className="checkout-page__details">
          <div className="checkout-page__details-buttons-wrapper">
            <button
              className={`checkout-page__shipping-button ${activeSection === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveSection('shipping')}
            >
              envío
            </button>
            <button
              className={`checkout-page__payment-button ${activeSection === 'payment' ? 'active' : ''}`}
              onClick={() => setActiveSection('payment')}
            >
              pago
            </button>
            <button className="checkout-page__confirmation-button">Confirmar</button>
          </div>

          {/* Renderizado condicional */}
          {activeSection === 'shipping' && <AddressesList ref={addressesListRef} openModal={openModal} />}
          {activeSection === 'payment' && <PaymentsList />}
        </div>

        <div className="checkout-page__cards">{cartCards}</div>
      </div>
      
    </div>
  );
};

export default CheckoutPage;
