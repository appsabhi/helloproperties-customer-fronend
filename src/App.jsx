import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SectionIntro from "./components/SectionIntro";
import ConsultancyServices from "./components/ConsultancyServices";
import FeaturedProperties from "./components/FeaturedProperties";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import PropertiesPage from "./components/PropertiesPage";
import ExploreLocationsPage from "./components/ExploreLocationsPage";
import ContactPage from "./components/ContactPage";
import NotFoundPage from "./components/NotFoundPage";

import { CustomerPropertyProvider } from "./context/CustomerPropertyContext";

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SectionIntro />
        <ConsultancyServices />
        <FeaturedProperties />
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
          <Route path="/explore" element={<ExploreLocationsPage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </CustomerPropertyProvider>
  );
}

export default App;
