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
import { PaymentErrorModal } from '../components/PaymentErrorModal';

const CheckoutPage = () => {
  const { cartItems } = useMenPageContext();

  const [modalOpen, setModalOpen] = useState(false);
  const [paymentModalOpen, setpaymentModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('shipping');
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const addressesListRef = useRef();
  const paymentsListRef = useRef(); // 🔥 NUEVO

  const navigate = useNavigate();

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  const closePaymentModal = () => setpaymentModalOpen(false);
  const openPaymentModal = () => setpaymentModalOpen(true); // 🔥 NUEVO

  const handleAddressSubmit = (data) => {
    console.log(data);

    if (addressesListRef.current) {
      setTimeout(() => {
        addressesListRef.current.scrollToLast();
      }, 0);
    }
  };

  const cartCards = cartItems.map((item) => (
    <ShoppingCartCard key={item.id} item={item} />
  ));

  const handleStoreClick = () => navigate(-1);

  return (
    <div className="checkout-page">
      <CheckoutHeader onClickStore={handleStoreClick} />

      {/* Modal de dirección */}
      <AddressForm
        onSubmit={handleAddressSubmit}
        modalOpen={modalOpen}
        closeModal={closeModal}
      />

      {/* Modal de pago */}
      <PaymentModal
        paymentModalOpen={paymentModalOpen}
        closePaymentModal={closePaymentModal}
        onPaymentError={() => {
          setErrorModalOpen(true);

          setTimeout(() => {
            setErrorModalOpen(false);
          }, 3000);
        }}
      />

      {/* Error modal */}
      <PaymentErrorModal isOpen={errorModalOpen} />

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

            <button className="checkout-page__confirmation-button">
              Confirmar
            </button>
          </div>

          {activeSection === 'shipping' && (
            <>
              <AddressesList
                ref={addressesListRef}
                openModal={openModal}
              />

              <div className="checkout-page__add-address">
                <label onClick={openModal}>
                  Agregar Dirección
                </label>
              </div>
            </>
          )}

          {activeSection === 'payment' && (
            <>
              <PaymentsList
                ref={paymentsListRef}
                openModal={openPaymentModal}
              />

              <div className="checkout-page__add-payment">
                <label onClick={openPaymentModal}>
                  Agregar método de pago
                </label>
              </div>
            </>
          )}

        </div>

        <div className="checkout-page__cards">
          {cartCards}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;