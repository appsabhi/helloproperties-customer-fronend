import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SectionIntro from "./components/SectionIntro";
import PropertyWorlds from "./components/PropertyWorlds";
import FeaturedProperties from "./components/FeaturedProperties";
import WhyUs from "./components/WhyUs";
import PropertyJourneys from "./components/PropertyJourneys";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import PropertiesPage from "./components/PropertiesPage";

import { CustomerPropertyProvider } from "./context/CustomerPropertyContext";

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SectionIntro />
        <PropertyWorlds />
        <FeaturedProperties />
        <WhyUs />
        <PropertyJourneys />
        <FinalCTA />
      </main>
      <Footer />
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
