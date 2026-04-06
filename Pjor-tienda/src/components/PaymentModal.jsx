import React, { useState, useEffect, useRef } from 'react';
import './styles/PaymentModal.scss';
import { loadStripe } from '@stripe/stripe-js';

// 🔥 Stripe correcto
const stripePromise = loadStripe('pk_test_51Qf2tcLpCXSlpZd8CbVF0VVVASqhGgH1mLYskbI4yRH1TQaLSQVFMWaTkghcW1pu2zlVuH3rZHRGPI5n6uxZjFlu00HWzrjVSC');

export const PaymentModal = ({ paymentModalOpen, closePaymentModal }) => {

  const handleCloseClick = () => {
    closePaymentModal();
  };

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const elementsRef = useRef(null);
  const cardRef = useRef(null);
  const stripeRef = useRef(null);

  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      postal_code: '',
      country: '',
    },
  });

  // 🔥 INIT STRIPE BIEN
  useEffect(() => {
    const initStripe = async () => {
      const stripe = await stripePromise;
      stripeRef.current = stripe;

      elementsRef.current = stripe.elements();

      cardRef.current = elementsRef.current.create('card');
      cardRef.current.mount('#card-element');
    };

    initStripe();

    return () => {
      if (cardRef.current) {
        cardRef.current.unmount();
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('address.')) {
      const field = name.split('.')[1];

      setBillingDetails(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setBillingDetails(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/payments/create-setup-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 1 }),
      });

      const { clientSecret } = await response.json();

      const stripe = stripeRef.current;

      if (!stripe || !cardRef.current) {
        setError('Stripe no está listo');
        return;
      }

      const result = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: cardRef.current,
          billing_details: {
            name: `${billingDetails.firstName} ${billingDetails.lastName}`,
            email: billingDetails.email,
            phone: billingDetails.phone,
            address: billingDetails.address,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setSuccess(false);
        return;
      }

      await fetch('http://localhost:3000/api/payments/save-payment-method', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1,
          paymentMethodId: result.setupIntent.payment_method,
        }),
      });

      setSuccess(true);
      setError(null);

    } catch (err) {
      console.error(err);
      setError('Error guardando método de pago');
      setSuccess(false);
    }
  };

  return (
    <div className={`payment-modal__overlay${paymentModalOpen ? '--shown' : ''}`}>

      <form className="payment-modal__form" onSubmit={handleSubmit}>

        <div className="payment-modal__close-wrapper">
          <button type="button" className="payment-modal__close-button" onClick={handleCloseClick}>
            X
          </button>
        </div>

        <h2>Añadir metodo de pago</h2>

        {/* ✅ RESPETANDO TUS CLASES */}
        <div className="payment-modal__input-group">
          <input type="text" name="firstName" value={billingDetails.firstName} onChange={handleInputChange} placeholder="Nombre" />
        </div>

        <div className="payment-modal__input-group">
          <input type="text" name="lastName" value={billingDetails.lastName} onChange={handleInputChange} placeholder="Apellido" />
        </div>

        <div className="payment-modal__input-group">
          <input type="email" name="email" value={billingDetails.email} onChange={handleInputChange} placeholder="correo@ejemplo.com" />
        </div>

        <div className="payment-modal__input-group">
          <input type="tel" name="phone" value={billingDetails.phone} onChange={handleInputChange} placeholder="+1234567890" />
        </div>

        <div className="payment-modal__input-group">
          <input type="text" name="address.line1" value={billingDetails.address.line1} onChange={handleInputChange} placeholder="Calle Principal 123" />
        </div>

        <div className="payment-modal__input-group">
          <input type="text" name="address.line2" value={billingDetails.address.line2} onChange={handleInputChange} placeholder="Apartamento 456 (opcional)" />
        </div>

        <div className="payment-modal__input-group">
          <input type="text" name="address.city" value={billingDetails.address.city} onChange={handleInputChange} placeholder="Ciudad" />
        </div>

        <div className="payment-modal__input-group">
          <input type="text" name="address.state" value={billingDetails.address.state} onChange={handleInputChange} placeholder="Estado" />
        </div>

        <div className="payment-modal__input-group">
          <input type="text" name="address.postal_code" value={billingDetails.address.postal_code} onChange={handleInputChange} placeholder="12345" />
        </div>

        <div className="payment-modal__input-group">
          <input type="text" name="address.country" value={billingDetails.address.country} onChange={handleInputChange} placeholder="MX" />
        </div>

        {/* 🔥 Stripe element también con tu clase */}
          <div id="card-element"></div>
        

        <div id="card-errors">
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p>✅ Método de pago guardado</p>}
        </div>

        <button type="submit">Guardar tarjeta</button>

      </form>

      
    </div>
  );
};