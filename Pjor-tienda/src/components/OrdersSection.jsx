import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

import './styles/OrdersSection.scss';
import OrderItemCard from './OrderItemCard';

import {
  getUserOrders,
  getOrderById
} from '../services/orderService';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const OrdersSection = () => {
  const [orders, setOrders] = useState([]);
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
  const [currentOrder, setCurrentOrder] = useState(null);

  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingOrderDetail, setLoadingOrderDetail] = useState(false);

  const [error, setError] = useState('');

  // =====================================
  // LOAD ORDERS
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
  // LOAD ORDER DETAIL
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
  // ORDER NAVIGATION
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
  // SLICK SETTINGS
  // =====================================
  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    adaptiveHeight: true
  };

  // =====================================
  // STATES
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
  // GROUP ITEMS (name + color + size)
  // =====================================
  const groupedItems = currentOrder.items?.reduce(
    (acc, item) => {
      const colorKey =
        typeof item.color === 'object'
          ? JSON.stringify(item.color)
          : item.color || '';

      const sizeKey = item.size || '';

      const groupKey = `${item.name}-${colorKey}-${sizeKey}`;

      const existingItem = acc.find(
        (product) =>
          product._groupKey === groupKey
      );

      if (existingItem) {
        existingItem.quantity += Number(
          item.quantity
        );
      } else {
        acc.push({
          ...item,
          quantity: Number(item.quantity),
          _groupKey: groupKey
        });
      }

      return acc;
    },
    []
  );

  // =====================================
  // RENDER
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

        <div className="order-section__header-date-wrapper">
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
            currentOrderIndex ===
            orders.length - 1
          }
        >
          →
        </button>

      </div>

      <div className="order-section__items-wrapper">

        <Slider {...sliderSettings}>
          {groupedItems?.map((item) => (
            <div key={item._groupKey}>
              <OrderItemCard item={item} />
            </div>
          ))}
        </Slider>

      </div>

      <div className="order-section__bottom-wrapper">
        <h3>
          TOTAL $
          {Number(
            currentOrder.total_amount
          ).toFixed(2)}
        </h3>
      </div>

    </div>
  );
};

export default OrdersSection;