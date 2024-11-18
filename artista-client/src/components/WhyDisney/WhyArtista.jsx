import React from "react";
import "./WhyArtista.css";
import TV from "../../assets/TV.png";
import download_logo from "../../assets/download-logo.png";
import telescope from "../../assets/telescope.png";
import kids from "../../assets/kids.png";

function WhyArtista() {
  return (
    <>
      <div className="why-disney">
        <h4 className="fw-light mt-5 mb-4 me-auto">More reasons to join</h4>
        <div className="container-fluid mx-0">
          <div className="row">
            <div className="col-md-6 col-lg-3 mt-2 px-2  ">
              <div className="why-card p-3">
                <div>
                  <h5 className="mb-3">Showcase Your Art</h5>
                  <p className="fw-light">
                  Share your artistic creations with a broad audience and gain visibility. With dedicated space for showcasing your work.
                  </p>
                </div>

                <div className="d-flex justify-content-end">
                  <img className="w-50 mt-5" src={TV} alt="" />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mt-2 px-2 ">
              <div className="why-card p-3">
                <div>
                  <h5 className="mb-3">Connect with Enthusiasts</h5>
                  <p className="fw-light">
                  Join a community of art lovers and artists where you can share your passion.
                  </p>
                </div>

                <div className="d-flex justify-content-end">
                  <img className="w-50 mt-5" src={download_logo} alt="" />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mt-2 px-2 ">
              <div className="why-card p-3">
                <div>
                  <h5 className="mb-3">Easy Sales Process</h5>
                  <p className="fw-light">
                  our web app provides a seamless and secure platform for selling your artwork.
                  </p>
                </div>

                <div className="d-flex justify-content-end">
                  <img className="w-50 mt-5" src={telescope} alt="" />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mt-2 px-2">
              <div className="why-card p-3">
                <div>
                  <h5 className="mb-3">Dedicated Support and Exposure</h5>
                  <p className="fw-light">
                  Receive personalized support from your platform to help boost your visibility and sales.
                  </p>
                </div>

                <div className="d-flex justify-content-end">
                  <img className="w-50 mt-5" src={kids} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WhyArtista;
