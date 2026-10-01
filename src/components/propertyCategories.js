import newHouseVillaImg from "../assets/hero-panels/HouseVilla.jpg";
import newResidentialPlotImg from "../assets/hero-panels/Residential Plot.jpg";
import newIndustrialPlotImg from "../assets/hero-panels/industrial_plot.jpg";
import newCommercialBuildingImg from "../assets/hero-panels/commercial_plot.jpg";
import newAgriculturalLandImg from "../assets/hero-panels/Agricultural Land.jpg";

import apartmentImg from "../assets/hero-panels/ApartmentFlat.jpg";
import commercialLandImg from "../assets/hero-panels/commercial_plot.jpg";

export const propertyCategories = [
  { id: "plot-land", title: "Plot/Land", path: "/properties?type=Plot%2FLand", img: newResidentialPlotImg, desc: "Prime land parcels for versatile development." },
  { id: "house-villa", title: "House/Villa", path: "/properties?type=House%2FVilla", img: newHouseVillaImg, desc: "Exclusive, spacious homes with premium amenities." },
  { id: "apartment-flat", title: "Apartment/Flat", path: "/properties?type=Apartment%2FFlat", img: apartmentImg, desc: "Modern living spaces in prime city locations." },
 
  { id: "residential-plot", title: "Residential Plot", path: "/properties?type=Residential%20Plot", img: newResidentialPlotImg, desc: "Build your dream home on premium verified plots." },
  { id: "commercial-plot", title: "Commercial Plot", path: "/properties?type=Commercial%20Plot", img: commercialLandImg, desc: "Ideal plots for commercial ventures and ROI." },
  { id: "agricultural-land", title: "Agricultural Land", path: "/properties?type=Agricultural%20Land", img: newAgriculturalLandImg, desc: "Fertile land and plantations across Kerala." },
  { id: "industrial-plot", title: "Industrial Plot", path: "/properties?type=Industrial%20Plot", img: newIndustrialPlotImg, desc: "Spacious plots for industrial development." },
];


