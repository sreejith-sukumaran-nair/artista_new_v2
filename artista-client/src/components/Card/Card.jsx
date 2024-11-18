import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import "./Card.css";
import { LuIndianRupee } from "react-icons/lu";
import axios from "axios";

function Card({ work }) {
  

  return (
    <>
      
      <div class="col product-card">
        <div class="p-1 rounded-3 bg-tranparent">
          <div style={{height : "100%"}} class="card mx-auto position-relative align-items-center">
            <img src={work.imageUrl} class="card-img-top" alt="card-image" />
            <div class="card-body  text-center mx-auto justify-content-center  position-absolute bottom-0 start-0">
              <h5 class="card-title text-white">
                <div className="d-flex align-center gap-2">
                  <span className="fs-6">4.1</span>
                  <FaStar className="star-icon" />
                </div>
              </h5>
            </div>
          </div>
          <div class="card-body text-start mt-2 px-1 py-1">
            <h6 class="card-title">{work.title}</h6>
            <h6 class="mt-1 fw-light">Author : {work.authorDetails.username}</h6>
            <h6 class="card-text mt-1">
            <LuIndianRupee />{work.price}
            </h6>
            <p><small>{work.description}</small></p>
            
            <a href="#" class="btn btn-sm category-specials-button mt-1">
              Add to Cart
            </a>
            <a
              href="#"
              onclick="wishlisted()"
              id="w0"
              class="btn btn-sm wishlist-button mt-1"
            >
              Wishlist
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
