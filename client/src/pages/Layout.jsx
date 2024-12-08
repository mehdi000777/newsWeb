import React from "react";
import { Outlet } from "react-router-dom";
import Header from '../components/Header';
import Hero from '../components/Hero';
import PopularNews from '../components/PopularNews'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <>
      <Header />
      <Hero />
      <Outlet />
      <PopularNews />
      <Footer />
    </>
  );
};

export default Layout;
