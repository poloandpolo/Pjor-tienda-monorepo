import React from 'react'
import './styles/AddressesAndPaymentsSection.scss'

export const AddressesAndPaymentsSection = () => {
    return (
        <div className='addresses-and-payment-section__content'>
            <div className='addresses-and-payment-section__header-buttons'>
                <div className='addresses-and-payment-section__header-buttons-wrapper'>
                    <button>
                        Direcciones
                    </button>
                    <button>
                        Pagos
                    </button>
                </div>
            </div>
        </div>
    )
}
