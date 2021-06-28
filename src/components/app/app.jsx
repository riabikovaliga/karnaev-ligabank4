import React from "react";
import Header from "../header/header";
import MainSlider from "../main-slider/main-slider";
import ServicesSlider from "../services-slider/services-slider";
import Calculator from "../calculator/calculator";
import Map from "../map/map";
import Footer from "../footer/footer";

const App = () => {
  return (
    <>
      <Header/>
      <main>
        <MainSlider/>
        <ServicesSlider/>
        <Calculator/>
        <Map/>
      </main>
      <Footer/>
    </>
  );
};

App.displayName = `App`;

export default App;
