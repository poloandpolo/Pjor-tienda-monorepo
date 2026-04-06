import React from 'react'
import './styles/CrewCard.scss'

export const CrewCard = ({img, name}) => {
  return (
    <div className='crew-card'>
        <div className='crew-card__card-wrapper'>
            <img src={img}/>
            <p>{name}</p>
        </div>
    </div>
  )
}
