import React from "react";
import hero_banner from "../../assets/bg3.jpg";
import wolv1 from "../../assets/bg2.jpg";
import wolv2 from "../../assets/bg7.jpg";
import background_banner from "../../assets/bg2.jpg";
import "./Hero.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Hero() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="hero position-relative">
      {/* <img className='w-100' src={hero_banner} alt="" /> */}
      <div className="position-absolute w-100 h-100 top-0 bottom-0 z-1 masking-carosuel d-flex justify-content-center align-content-center align-items-center">
        {!currentUser && 
        <div className="d-flex flex-column text-center hero-unauthorised">
          <h2>
            Unlimited oil paintings and more <br />
            starts at &#x20b9;.1199
          </h2>
          <h4 className="fw-light">Return at any time</h4>
          <p>Ready to explore? please sign in with email and password</p>
          <Link to={'/login'} >
          <button>Sign In</button>
          </Link>
        </div>
        }
      </div>
      {currentUser && (
        <div className="position-relative">
          <div
            id="carouselExampleAutoplaying"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={hero_banner} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={wolv1} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={wolv2} className="d-block w-100" alt="..." />
              </div>
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      )}

      {!currentUser && (
        <>
          <img className="background-banner" src={background_banner} />
        </>
      )}
    </div>
  );
}

export default Hero;
