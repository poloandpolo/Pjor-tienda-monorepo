import React from 'react'
import './styles/VisionPage.scss'
import { Header } from '../components/Header'
import { NavigationBar } from '../components/NavigationBar'
import logo from '/logo.png'
import { Footer } from '../components/Footer'

export const VisionPage = () => {
    return (
        <div className='vision-page'>
            <Header />
            <NavigationBar />
            <div className='vision-page__first-section'>
                <div className='vision-page__first-section-logo-small-devices'>
                    <img src={logo}/>
                </div>
                <div className='vision-page__first-section-p-wrapper'>
                    <p>
                        El modo en que vestimos no solo refleja nuestra esencia, sino que proyecta quiénes somos al mundo. Cada prenda que diseñamos está pensada para ofrecer una expresión auténtica y libre, donde lo único que importa es ser fiel a uno mismo. Nuestras raíces en el skateboarding nos han enseñado una verdad fundamental: la discriminación carece de sentido. En el skate, no hay distinciones de raza, género o nacionalidad; es un espacio donde todos son iguales, unidos por una misma pasión. En cada diseño buscamos transmitir esos valores, promoviendo la unidad, la inclusión y el respeto mutuo. Creemos en una comunidad donde lo que realmente importa es la actitud, el respeto por los demás y la libertad de ser quien quieras ser.
                    </p>
                </div>
                <div className='vision-page__first-section-logo-wrapper'>
                    <img className='vision-page__first-section-logo-1' src={logo} alt="" />
                    <img className='vision-page__first-section-logo-2' src={logo} alt="" />
                    <img className='vision-page__first-section-logo-3' src={logo} alt="" />
                    <img className='vision-page__first-section-logo-4' src={logo} alt="" />
                </div>
            </div>
            <Footer/>
        </div>
        
    )
}
