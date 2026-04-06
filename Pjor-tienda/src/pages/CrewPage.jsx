import React from 'react'
import { Header } from '../components/Header'
import { NavigationBar } from '../components/NavigationBar'
import './styles/CrewPage.scss'
import { CrewCard } from '../components/CrewCard'
import Agustin from '../images/crew/Agustin.jpg'
import Guillermo from '../images/crew/Guillermo.jpg'
import { Footer } from '../components/Footer'

export const CrewPage = () => {
    return (
        <div className='crew-page'>
            <Header />
            <NavigationBar />
            <div className='crew-page__cards-gallery'>
                <CrewCard img={Agustin} name='Agustin Condado' />
                <CrewCard img={Guillermo} name='Guillermo Serrano' />
            </div>
            <Footer/>
        </div>
    )
}
