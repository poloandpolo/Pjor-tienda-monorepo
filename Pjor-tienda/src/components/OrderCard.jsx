import React from 'react'

const OrderCard = () => {
    return (
        <div className="order-card">
            <h2>PEDIDO #{order.id}</h2>
            <span>{order.created_at}</span>

            <Slider>
                {order.items.map(item => (
                    <OrderItemCard key={item.id} item={item} />
                ))}
            </Slider>

            <h3>Total ${order.total_amount}</h3>
        </div>
    )
}

export default OrderCard