import React from 'react'
import './styles/CheckoutHeader.scss'
import logo from '/logo.png'


export const CheckoutHeader = ({onClickStore}) => {


    return (
        <>
            <div className='checkout-header'>
                <img className='checkout-header__logo' src={logo} />
                <label onClick={onClickStore}>Volver a tienda</label>
            </div>
        </>
    )
}
