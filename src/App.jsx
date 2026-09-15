import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LandTypes from "./components/LandTypes";
import FeaturedProperties from "./components/FeaturedProperties";
import PropertiesPage from "./components/PropertiesPage";
import { CustomerPropertyProvider } from "./context/CustomerPropertyContext";
import WhyHelloProperties from "./components/WhyHelloProperties";

function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <LandTypes />
      <FeaturedProperties />
      <WhyHelloProperties/>
    </>
  );
}

function App() {
  return (
    <CustomerPropertyProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
        </Routes>
      </BrowserRouter>
    </CustomerPropertyProvider>
  );
}

export default App;

