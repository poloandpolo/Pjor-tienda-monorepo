import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react';
import Slider from 'react-slick';
import './styles/PaymentsList.scss';
import { PaymentItem } from './PaymentItem';
import { useMenPageContext } from '../context/MenPageContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const PaymentsList = forwardRef(({ openModal }, ref) => {

  const { payments = [], error, fetchPayments } = useMenPageContext();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const sliderRef = useRef(null);

  useImperativeHandle(ref, () => ({
    scrollToLast: () => {
      if (sliderRef.current && payments.length > 0) {
        sliderRef.current.slickGoTo(payments.length - 1);
      }
    },
  }));

  useEffect(() => {
    fetchPayments();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleSelection = (payment) => {
    setSelectedPayment(payment);
  };

  if (error) {
    return (
      <div className="payments-list__content">
        <div className="payments-list__empty">
          Error al cargar métodos de pago: {error}
        </div>

        <label
          className="payments-list__label"
          onClick={openModal}
        >
          Agregar Método de Pago
        </label>
      </div>
    );
  }

  return (
    <div className="payments-list__content">

      {payments.length > 0 ? (
        <Slider ref={sliderRef} {...sliderSettings}>
          {payments.map((payment) => (
            <div key={payment.id}>
              <PaymentItem
                payment={payment}
                isSelected={selectedPayment?.id === payment.id}
                onSelect={handleSelection}
              />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="payments-list__empty">
          <p>No hay métodos de pago</p>

          <label
            className="payments-list__label"
            onClick={openModal}
          >
            Agregar Método de Pago
          </label>
        </div>
      )}

      <label
        className="payments-list__label"
        onClick={openModal}
      >
        Agregar Método de Pago
      </label>

    </div>
  );
});