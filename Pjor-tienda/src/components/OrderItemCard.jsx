import React from 'react'

const OrderItemCard = () => {
    return (
        <div className="order-item-card">
            <img src={item.image} />
            <p>{item.name}</p>
            <p>Talla {item.size}</p>
            <p>Cant {item.quantity}</p>
        </div>
    )
}

export default OrderItemCard