import React, { useState } from 'react';
import './styles/OrdersSection.scss';
import OrderItemCard from './OrderItemCard';

const OrdersSection = ({ orders = [] }) => {
    const [currentOrderIndex, setCurrentOrderIndex] = useState(0);

    if (!orders.length) {
        return <div className='orders-section__empty'>
            <h2>No tienes pedidos aún</h2>
        </div>

    }

    const currentOrder = orders[currentOrderIndex];

    const nextOrder = () => {
        if (currentOrderIndex < orders.length - 1) {
            setCurrentOrderIndex(currentOrderIndex + 1);
        }
    };

    const prevOrder = () => {
        if (currentOrderIndex > 0) {
            setCurrentOrderIndex(currentOrderIndex - 1);
        }
    };

    return (
        <div className="order-section">

            <button
                className="order-section__arrow left"
                onClick={prevOrder}
            >
                ←
            </button>

            <button
                className="order-section__arrow right"
                onClick={nextOrder}
            >
                →
            </button>

            <h2>
                PEDIDO #{currentOrder.id}
            </h2>

            <span>
                {currentOrder.created_at}
            </span>

            <div className="order-section__items-wrapper">
                {currentOrder.items.map((item, index) => (
                    <OrderItemCard
                        key={index}
                        item={item}
                    />
                ))}
            </div>

            <h3>
                TOTAL ${Number(currentOrder.total_amount).toFixed(2)}
            </h3>

        </div>
    );
};

export default OrdersSection;