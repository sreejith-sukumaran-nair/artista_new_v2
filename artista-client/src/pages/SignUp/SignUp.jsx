import React, { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import axios from "axios";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleChange = async (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.email) {
      return setErrorMessage("Please fill out all the fields...");
    }
    if (formData.password !== formData["confirm-password"]) {
      return setErrorMessage("Please confirm password correctly...");
    }
    try {
      setLoading(true);
      setErrorMessage("");

      const { username, password, email } = formData;
      const dataToSend = { username, password, email };

      const res = await axios.post("/api/v1/auth/signup", dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = res.data;

      if (data.success === false) {
        setErrorMessage(data.message);

      } else {
        navigate("/login");
      }
    } catch (error) {

      setErrorMessage(error.response?.data?.message || "An error occurred");

    } finally {

      setLoading(false);

    }
  };

  

  return (
    <>
      <div className="login">
        <h3 className="login-logo">Artista</h3>
        <div className="login-form">
          <h2>Sign Up</h2>
          {errorMessage && (
            <small className="text-warning fw-light">{errorMessage}</small>
          )}
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              id="username"
              type="username"
              placeholder="User name"
            />
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
            <input
              type="password"
              id="confirm-password"
              onChange={handleChange}
              placeholder="Confirm password"
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
                "Sign Up"
              )}
            </button>
          </form>
          <div className="signup-link d-flex">
            <div>
              <Link to={"/login"}>
                <p>
                  Already have an account?{" "}
                  <span
                    className="link-to-sign ms-1"
                    onClick={() => setSignState("Sign In")}
                    href=""
                  >
                    Sign In
                  </span>
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

export default SignUp;
