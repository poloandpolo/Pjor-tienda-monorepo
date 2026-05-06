import React from 'react'
import './styles/OrderItemCard.scss'

const OrderItemCard = ({ item }) => {
    return (
        <div className="order-item-card">
            <img className="order-item-card__product-image" src={item.images[0]} />
            <div className="order-item-card__details-wrapper">
                <p>{item.name}</p>
                <p>Talla: {item.size}</p>
                <p>Cantidad: {item.quantity}</p>
                <div>
                    <div className="order-item-card__details-wrapper__color-wrapper">
                        <p>Color:</p><img className="order-item-card__color-image" src={item.color.image} />
                    </div>
                    <p>Precio: ${item.price}</p>
                </div>
            </div>
        </div>
    )
}

export default OrderItemCard