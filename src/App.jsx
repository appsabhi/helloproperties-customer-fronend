import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SectionIntro from "./components/SectionIntro";
import PropertyWorlds from "./components/PropertyWorlds";
import FeaturedProperties from "./components/FeaturedProperties";
import KeralaDestinations from "./components/KeralaDestinations";
import TheLandscape from "./components/TheLandscape";
import WhyUs from "./components/WhyUs";
import PropertyJourneys from "./components/PropertyJourneys";
import FeaturedDestination from "./components/FeaturedDestination";
import ListPropertyCTA from "./components/ListPropertyCTA";
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
        <KeralaDestinations />
        <TheLandscape />
        <WhyUs />
        <PropertyJourneys />
        <FeaturedDestination />
        <ListPropertyCTA />
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
