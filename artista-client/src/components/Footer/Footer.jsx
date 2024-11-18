import React from "react";
import "./Footer.css";


function Footer() {
  return (
    <div className="footer">
      <p>Questions? Call 000-800-919-1694</p>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 p-0 m-0">
            <a href="">FAQ</a>
            <a href="" >Investor relations</a >
            <a href="" >Privacy</a >
            <a href="" >Speed test</a >
          </div>
          <div className="col-md-3 p-0 m-0">
            <a href="" >Help Centre</a >
            <a href="" >Jobs</a >
            <a href="" >Cookie Preferences</a >
            <a href="" >Legal Notices</a >
          </div>
          <div className="col-md-3 p-0 m-0">
            <a href="" >Account</a >
            <a href="" >Ways to Watch</a >
            <a href="" >Corporate Information</a >
            <a href="" >Only on Artista</a >
          </div>
          <div className="col-md-3 p-0 m-0">
            <a href=""  >Media Centre</a >
            <a href=""  >Terms of Use</a >
            <a href=""  >Contact Us</a >
          </div>
        </div>
      </div>
      <div className="d-flex gap-4 align-items-baseline justify-content-between mt-5">
      <h3>Artista</h3>
      <p>Artista india</p>
      </div>
     
    </div>
  );
}

export default Footer;
