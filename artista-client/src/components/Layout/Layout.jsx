
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'; // Import your Navbar component

function Layout() {
  return (
    <>
      <Navbar/>
      <Outlet />
    </>
  );
}

export default Layout;
