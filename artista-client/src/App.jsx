import React from "react";
import Home from "./pages/HomePage/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Layout from "./components/Layout/Layout.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AddCreation from "./pages/AddCreation/AddCreation.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="add_creation" element={<AddCreation />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
