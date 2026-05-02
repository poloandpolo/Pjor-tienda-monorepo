import React from 'react'
import './styles/OrderItemCard.scss'

const OrderItemCard = ({ item }) => {
    return (
        <div className="order-item-card">
            <img className="order-item-card__product-image" src={item.image} />
            <div className="order-item-card__details-wrapper">
                <p>{item.name}</p>
                <p>Talla {item.size}</p>
                <p>Cant {item.quantity}</p>
                <div>
                    <div className="order-item-card__details-wrapper__color-wrapper">
                    <p>Color:</p><img className="order-item-card__color-image" src={item.color.image} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderItemCard