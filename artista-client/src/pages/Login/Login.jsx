import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../../redux/user/userSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({});
  const { error: errorMessage, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password || !formData.email) {
      return dispatch(signInFailure("Fill up all the fields"));
    }
    try {
      dispatch(signInStart());

      const res = await axios.post("/api/v1/auth/signin", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = res.data;


      if(data.success === false){
        dispatch(signInFailure(data.message))
      } else {
        dispatch(signInSuccess(data));
        navigate("/home");
      }

    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      dispatch(signInFailure(errorMessage));
    }
  };

  return (
    <>
      <div className="login">
      <h3 className="login-logo">Artista</h3>
        <div className="login-form">
          <h2>Sign In</h2>
          {errorMessage && (
            <small className="text-secondary fw-light">{errorMessage}</small>
          )}
          <form onSubmit={handleSubmit}>
            <input
              id="email"
              onChange={handleChange}
              type="email"
              placeholder="email address"
            />
            <input
              id="password"
              onChange={handleChange}
              type="password"
              placeholder="Password"
            />
            <button type="submit">
            {loading ? (
                <>
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <span className="mx-2">loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className="signup-link d-flex">
            <Link to={"/login/forget"}>Forget password?</Link>
            <div>
              <Link to={"/signup"}>
                <p>
                  New to Artista?{" "}
                  <span className="link-to-sign ms-1">Sign Up</span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
 

