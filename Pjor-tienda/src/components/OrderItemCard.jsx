import React from 'react'
import './styles/OrderItemCard.scss'

const OrderItemCard = ({item}) => {
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