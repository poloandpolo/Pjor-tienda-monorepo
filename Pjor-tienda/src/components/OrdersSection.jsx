import React, { useEffect, useState } from 'react';
import './styles/OrdersSection.scss';
import OrderItemCard from './OrderItemCard';

import {
  getUserOrders,
  getOrderById
} from '../services/orderService';

const OrdersSection = () => {
  const [orders, setOrders] = useState([]);
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);

  const [currentOrder, setCurrentOrder] = useState(null);

  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingOrderDetail, setLoadingOrderDetail] = useState(false);

  const [error, setError] = useState('');

  // =====================================
  // 🔥 CARGAR ÓRDENES AL MONTAR
  // =====================================
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      setError('');

      const data = await getUserOrders();

      setOrders(data || []);

      if (data?.length) {
        await fetchOrderDetail(data[0].id);
      }

    } catch (err) {
      console.error(err);
      setError('Error cargando pedidos');
    } finally {
      setLoadingOrders(false);
    }
  };

  // =====================================
  // 🔥 CARGAR DETALLE ORDEN
  // =====================================
  const fetchOrderDetail = async (orderId) => {
    try {
      setLoadingOrderDetail(true);

      const data = await getOrderById(orderId);

      setCurrentOrder(data);

    } catch (err) {
      console.error(err);
      setError('Error cargando pedido');
    } finally {
      setLoadingOrderDetail(false);
    }
  };

  // =====================================
  // 🔥 NAVEGACIÓN
  // =====================================
  const nextOrder = async () => {
    if (currentOrderIndex < orders.length - 1) {
      const newIndex = currentOrderIndex + 1;

      setCurrentOrderIndex(newIndex);

      await fetchOrderDetail(
        orders[newIndex].id
      );
    }
  };

  const prevOrder = async () => {
    if (currentOrderIndex > 0) {
      const newIndex = currentOrderIndex - 1;

      setCurrentOrderIndex(newIndex);

      await fetchOrderDetail(
        orders[newIndex].id
      );
    }
  };

  // =====================================
  // 🔥 STATES
  // =====================================
  if (loadingOrders) {
    return (
      <div className="orders-section__empty">
        <h2>Cargando pedidos...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-section__empty">
        <h2>{error}</h2>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="orders-section__empty">
        <h2>No tienes pedidos aún</h2>
      </div>
    );
  }

  if (!currentOrder || loadingOrderDetail) {
    return (
      <div className="orders-section__empty">
        <h2>Cargando pedido...</h2>
      </div>
    );
  }

  // =====================================
  // 🔥 RENDER
  // =====================================
  return (
    <div className="order-section">

        <div className="order-section__header">

        <button
        className="order-section__arrow left"
        onClick={prevOrder}
        disabled={currentOrderIndex === 0}
      >
        ←
      </button>

      <div className='order-section__header-date-wrapper'>
        <h2>
        PEDIDO #{currentOrder.id}         
      </h2>

       <label>
        {new Date(
          currentOrder.created_at
        ).toLocaleDateString()}
      </label>

      </div>

       



      <button
        className="order-section__arrow right"
        onClick={nextOrder}
        disabled={
          currentOrderIndex === orders.length - 1
        }
      >
        →
      </button>

        </div>

      <div className="order-section__items-wrapper">
        {currentOrder.items?.map((item, index) => (
          <OrderItemCard
            key={index}
            item={item}
          />
        ))}
      </div>

      <h3>
        TOTAL $
        {Number(
          currentOrder.total_amount
        ).toFixed(2)}
      </h3>

    </div>
  );
};

export default OrdersSection;