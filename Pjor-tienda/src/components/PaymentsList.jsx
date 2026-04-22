import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import Slider from 'react-slick';
import './styles/PaymentsList.scss';
import { useMenPageContext } from '../context/MenPageContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// 🔥 igual que AddressItem pero para pagos
import { PaymentItem } from './PaymentItem';

export const PaymentsList = forwardRef(({ openModal }, ref) => {

  const { paymentMethods = [], error, fetchPaymentMethods } = useMenPageContext();

  const [selectedPayment, setSelectedPayment] = useState(null);
  const sliderRef = React.useRef();

  useImperativeHandle(ref, () => ({
    scrollToLast: () => {
      if (sliderRef.current && paymentMethods.length > 0) {
        sliderRef.current.slickGoTo(paymentMethods.length - 1);
      }
    },
  }));

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
      </div>
    );
  }

  return (
    <div className="payments-list__content">

      <div className="payments-list__body">
        {paymentMethods.length > 0 ? (
          <Slider ref={sliderRef} {...sliderSettings}>
            {paymentMethods.map((payment) => (
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
            No hay métodos de pago disponibles
          </div>
        )}
      </div>



    </div>
  );
});