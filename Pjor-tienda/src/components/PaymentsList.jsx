import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import Slider from 'react-slick';
import './styles/PaymentsList.scss';
import { useMenPageContext } from '../context/MenPageContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { PaymentItem } from './PaymentItem';

export const PaymentsList = forwardRef(
  (
    {
      openModal,
      selectedPayment: parentSelectedPayment,
      setSelectedPayment: setParentSelectedPayment,
      onSelectPayment,
      setActivePaymentMethodId,
    },
    ref
  ) => {
    const {
      paymentMethods = [],
      error,
      fetchPaymentMethods,
    } = useMenPageContext();

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

    const notifyParent = (payment) => {

      if (setParentSelectedPayment) {
        setParentSelectedPayment(payment);
      }

      if (onSelectPayment) {
        onSelectPayment(payment);
      }

      if (setActivePaymentMethodId) {
        setActivePaymentMethodId(payment.id);
      }

    };


    const handleSelection = (payment) => {

      setSelectedPayment(payment);

      notifyParent(payment);

    };

    // Auto seleccionar primera tarjeta
    useEffect(() => {
      if (paymentMethods.length > 0 && !selectedPayment) {
        const firstPayment = paymentMethods[0];

        setSelectedPayment(firstPayment);
        notifyParent(firstPayment);
      }
    }, [paymentMethods]);

    // Si el padre cambia el valor, sincronizar visualmente
    useEffect(() => {
      if (parentSelectedPayment) {
        setSelectedPayment(parentSelectedPayment);
      }
    }, [parentSelectedPayment]);

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
            <Slider
              ref={sliderRef}
              {...sliderSettings}
            >
              {paymentMethods.map((payment) => (
                <div key={payment.id}>
                  <PaymentItem
                    payment={payment}
                    isSelected={
                      selectedPayment?.id === payment.id
                    }
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
  }
);