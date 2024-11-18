import React from 'react'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Hero from '../../components/Hero/Hero.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import WhyArtista from '../../components/WhyDisney/WhyArtista.jsx'
import Drawing from '../../components/Drawings/Drawing.jsx'

function LandingPage() {
  const page = "landing-page"
  return (
    <>
      <Navbar />
      <Hero/>
      <Drawing/>
      <WhyArtista />
      <Footer/>
    </>
  )
}

export default LandingPage