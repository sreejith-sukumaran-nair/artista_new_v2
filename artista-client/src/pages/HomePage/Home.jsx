import React from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/Footer";
import WhyArtista from "../../components/WhyDisney/WhyArtista";
import Drawing from "../../components/Drawings/Drawing";

function Home() {
  return (
    <div>
      <Hero/>
      <Drawing/>
      <WhyArtista/>
      <Footer/>
    </div>
  );
}

export default Home;
