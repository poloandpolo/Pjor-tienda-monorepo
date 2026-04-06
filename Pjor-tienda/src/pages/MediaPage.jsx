import React, { useRef } from 'react';
import './styles/MediaPage.scss';
import { Header } from '../components/Header';
import { NavigationBar } from '../components/NavigationBar';
import { MediaMainSlider } from '../components/MediaMainSlider';
import { SeparationBar } from '../components/SeparationBar';
import { Footer } from '../components/Footer';

export const MediaPage = () => {
  const leeveBreaksRef = useRef(null);
  const skateContestRef = useRef(null);

  return (
    <div className='media-page'>
      <Header />
      <NavigationBar />
      <MediaMainSlider 
        onSlideClick={(section) => {
          if (section === 'leeveBreaks') {
            leeveBreaksRef.current.scrollIntoView({ behavior: 'smooth' });
          } else if (section === 'skateContest') {
            skateContestRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }} 
      />
      <div ref={leeveBreaksRef} className='media-page__leeve-breaks'>
        <p className='media-page__article-title'>Sesión de garaje de Leeve Breaks</p>
        <p className='media-page__paragraph'>En la casa de uno de los integrantes de Leeve Breaks, un ambiente desenfadado y lleno de carácter se convierte en el escenario perfecto para grabar su nuevo EP, capturando la esencia cruda y auténtica de su música. Las paredes están adornadas con recuerdos de conciertos pasados, mientras que el eco de los tambores resonando en cada rincón crea una atmósfera electrizante y vibrante. La mezcla de sonidos se convierte en una experiencia sensorial que envuelve a todos los presentes.</p>
        <p className='media-page__paragraph'>Los miembros de la banda, cada uno con su estilo único, se mueven entre risas y bromas, creando una camaradería palpable que refleja su pasión compartida por la música. El olor a madera, metal y un toque de café recién hecho se mezcla con la intensidad de la creatividad desenfrenada, transformando la casa en un santuario donde las preocupaciones del mundo exterior quedan atrás. En un rincón, un viejo amplificador emite un sonido crujiente que evoca la nostalgia de las primeras influencias musicales de la banda, mientras que la luz del sol se filtra a través de las ventanas, iluminando el polvo que danza en el aire.</p>
        <p className='media-page__paragraph'>A medida que comienzan a tocar, la libertad de expresarse sin restricciones se siente en cada acorde. Cada miembro aporta su propio toque, desde los riffs melódicos de la guitarra hasta los ritmos contundentes de la batería, creando una sinfonía de sonidos que cobra vida en el momento. Con cada riff y verso que se graba, el proceso se convierte en un ritual de creación, un momento decisivo que trasciende el simple acto de grabar. Este espacio, con sus muebles eclécticos, se convierte en un refugio donde la juventud y la rebeldía se encuentran, dando a luz a sonidos extraordinarios que encapsulan la esencia de lo que significa ser parte de Leeve Breaks.</p>
        <p className='media-page__paragraph'>En medio de la grabación, hay pausas para intercambiar ideas y hacer ajustes, y cada discusión se llena de entusiasmo e inspiración. Las risas y las anécdotas compartidas entre tomas recuerdan a todos lo lejos que han llegado y lo que han construido juntos. En este ritual de creación, Leeve Breaks no solo busca grabar un álbum, sino también celebrar la amistad y la búsqueda de un sonido auténtico que resonará en el corazón de quienes lo escuchen. La casa, un simple hogar, se transforma en el epicentro de una experiencia musical que promete dejar una huella imborrable, convirtiéndose en un lugar donde la pasión por la música se encuentra con la calidez de la comunidad. Así, cada sesión de grabación se convierte en un capítulo más en la historia de la banda, un testimonio de su dedicación y su amor por el rock alternativo.</p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/kt1rjIq9qKU?start=1043"
          title="Video de Leeve Breaks"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className='media-page__separation-bar-wrapper'>
        <SeparationBar />
      </div>
      <div ref={skateContestRef} className='media-page__skate-contest'>
        <p className='media-page__article-title'>Concurso en Xonaca skatepark</p>
        <p className='media-page__paragraph'>En el icónico Skatepark de la ciudad, un ambiente vibrante y lleno de adrenalina se convierte en el escenario perfecto para el concurso anual de skate. Las rampas y barandales, desgastados por incontables trucos, son testigos de la habilidad y determinación de los participantes. Alrededor, las paredes están decoradas con grafitis que reflejan el espíritu urbano, mientras la música hip-hop y punk resuena por todo el lugar, amplificando la energía que se respira en el aire.</p>
        <p className='media-page__paragraph'>Los skaters, cada uno con su propio estilo y personalidad, se preparan mentalmente para sus rondas, algunos con gestos tranquilos y otros con miradas concentradas, listos para mostrar lo mejor de su repertorio. El sonido de las ruedas golpeando el concreto se mezcla con los gritos de apoyo de los espectadores, creando una atmósfera única donde el deporte y la cultura urbana se entrelazan de manera fluida. Entre el público, se ven flashes de cámaras y celulares capturando cada truco, mientras los jueces observan con atención desde sus puestos.</p>
        <div className='media-page__skate-contest-reels-wrapper'>
          <iframe
            src="https://www.instagram.com/p/CwY9dlHhLSD/embed"
            width="400"
            height="500"
            frameBorder="0"
            scrolling="no"
            allowTransparency="true"
            allow="encrypted-media"
          ></iframe>
          <iframe
            src="https://www.instagram.com/p/Cvs7s9KgZgO/embed"
            width="400"
            height="500"
            frameBorder="0"
            scrolling="no"
            allowTransparency="true"
            allow="encrypted-media"
          ></iframe>
        </div>
        <p className='media-page__paragraph'>A medida que avanzan las rondas, los trucos se vuelven más audaces. Desde ollies perfectos hasta flips y grinds que desafían la gravedad, cada skater aporta su estilo y técnica, con movimientos que parecen desafiar las leyes de la física. Con cada maniobra exitosa, la multitud estalla en aplausos y vítores, convirtiendo el parque en una fiesta de talento y pasión por el skate. Cada caída, lejos de desanimar, motiva a los competidores a levantarse y seguir intentando, reflejando la resiliencia y el espíritu inquebrantable de esta cultura.</p>
        <p className='media-page__paragraph'>Al final del concurso, la camaradería entre los participantes es palpable. Las bromas y felicitaciones se cruzan en el ambiente, mientras los ganadores celebran con modestia y los demás reciben el reconocimiento por su esfuerzo y destreza. En este evento, no solo se trata de ganar, sino de la pasión compartida por el skate, la conexión entre los riders y el respeto mutuo que se genera sobre las tablas. El Skatepark, ese espacio urbano que en otros días es un simple lugar de recreo, se transforma en el epicentro de una comunidad que vive y respira por el skateboarding.</p>
      </div>
      <Footer/>
    </div>
  );
};
