
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import FeaturedPackages from "../components/FeaturedPackages";
import FlightDeals from "../components/FlightDeals";
import HotelOffers from "../components/HotelOffers";
import SpecialOffers from "../components/SpecialOffers";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <FeaturedPackages />
      <FlightDeals />
      <HotelOffers />
      <SpecialOffers />
      <Footer />
    </div>
  );
};

export default Index;
