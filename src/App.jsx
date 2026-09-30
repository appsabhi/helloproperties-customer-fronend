import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SectionIntro from "./components/SectionIntro";
import FeaturedProperties from "./components/FeaturedProperties";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import PropertiesPage from "./components/PropertiesPage";
import AboutPage from "./components/AboutPage";
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
      {/* Static decorative background */}
      <div className="page-blob page-blob-1"></div>
      <div className="page-blob page-blob-2"></div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </CustomerPropertyProvider>
  );
}

export default App;
