import newHouseVillaImg from "../assets/hero-panels/new_house_villa.jpg";
import newResidentialPlotImg from "../assets/hero-panels/new_residential_plot.jpg";
import newIndustrialPlotImg from "../assets/hero-panels/new_industrial_plot.jpg";
import newCommercialBuildingImg from "../assets/hero-panels/new_commercial_building.jpg";
import newAgriculturalLandImg from "../assets/hero-panels/new_agricultural_land.jpg";

import apartmentImg from "../assets/hero-panels/apartment_panel_1790572137625.jpg";
import commercialLandImg from "../assets/land-commercial.jpg";

export const propertyCategories = [
  { id: "plot-land", title: "Plot/Land", path: "/properties?type=Plot%2FLand", img: newResidentialPlotImg, desc: "Prime land parcels for versatile development." },
  { id: "house-villa", title: "House/Villa", path: "/properties?type=House%2FVilla", img: newHouseVillaImg, desc: "Exclusive, spacious homes with premium amenities." },
  { id: "apartment-flat", title: "Apartment/Flat", path: "/properties?type=Apartment%2FFlat", img: apartmentImg, desc: "Modern living spaces in prime city locations." },
  { id: "commercial-building", title: "Commercial Building", path: "/properties?type=Commercial%20Building", img: newCommercialBuildingImg, desc: "Strategic locations for business growth." },
  { id: "residential-plot", title: "Residential Plot", path: "/properties?type=Residential%20Plot", img: newResidentialPlotImg, desc: "Build your dream home on premium verified plots." },
  { id: "commercial-plot", title: "Commercial Plot", path: "/properties?type=Commercial%20Plot", img: commercialLandImg, desc: "Ideal plots for commercial ventures and ROI." },
  { id: "agricultural-land", title: "Agricultural Land", path: "/properties?type=Agricultural%20Land", img: newAgriculturalLandImg, desc: "Fertile land and plantations across Kerala." },
  { id: "industrial-plot", title: "Industrial Plot", path: "/properties?type=Industrial%20Plot", img: newIndustrialPlotImg, desc: "Spacious plots for industrial development." },
];


