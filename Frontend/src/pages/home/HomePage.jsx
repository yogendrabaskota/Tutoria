import React from "react";
import HeroSection from "./HeroSection";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import Navbar from "../../components/Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <About />
      <Contact />
      <Footer />
    </>
  );
};

export default HomePage;
