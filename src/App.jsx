import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ImpactOnGround from "./components/ImpactOnGround";
import SectionIntro from "./components/SectionIntro";
import ConsultancyServices from "./components/ConsultancyServices";
import FeaturedProperties from "./components/FeaturedProperties";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import './components/FormResponsive.css';

// Lazy Loaded Pages
const PropertiesPage = lazy(() => import("./components/PropertiesPage"));
const ExploreLocationsPage = lazy(() => import("./components/ExploreLocationsPage"));
const ContactPage = lazy(() => import("./components/ContactPage"));
const NotFoundPage = lazy(() => import("./components/NotFoundPage"));
const PropertyDetailsPage = lazy(() => import("./components/PropertyDetailsPage"));
import GlobalLoader from "./components/GlobalLoader";

import { CustomerPropertyProvider } from "./context/CustomerPropertyContext";

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ConsultancyServices />
        <ImpactOnGround />
        <FeaturedProperties />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

import ScrollToTopButton from "./components/ScrollToTopButton";

function App() {
  return (
    <CustomerPropertyProvider>
      <BrowserRouter>
        <Suspense fallback={<GlobalLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExploreLocationsPage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/property/:id" element={<PropertyDetailsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <ScrollToTopButton />
      </BrowserRouter>
    </CustomerPropertyProvider>
  );
}

export default App;
