import { useState, useEffect } from "react";
import { Star, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Package {
  id: number;
  title: string;
  location: string;
  duration: string;
  price: string;
  rating: number;
  image: string;
  features: string[];
}

const defaultPackages: Package[] = [
  {
    id: 1,
    title: "Goa Beach Paradise",
    location: "North & South Goa", 
    duration: "5 Days",
    price: "₹18,999",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Beach Resorts", "Water Sports", "Nightlife", "Portuguese Heritage"]
  },
  {
    id: 2, 
    title: "Kerala Backwaters & Hills",
    location: "Munnar & Alleppey",
    duration: "8 Days",
    price: "₹32,999",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Houseboat Stay", "Tea Gardens", "Spice Plantations", "Ayurveda Spa"]
  },
  {
    id: 3,
    title: "Rajasthan Royal Heritage",
    location: "Udaipur & Jodhpur",
    duration: "7 Days", 
    price: "₹28,999",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Palace Hotels", "Desert Safari", "Folk Culture", "Royal Dining"]
  },
  {
    id: 4,
    title: "Bali & Vietnam Adventure",
    location: "Bali & Ho Chi Minh City",
    duration: "10 Days",
    price: "₹89,999",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Beach Resorts", "Cultural Tours", "Temples", "Street Food"]
  },
  {
    id: 5,
    title: "Dubai Luxury Experience",
    location: "Dubai & Abu Dhabi",
    duration: "6 Days",
    price: "₹1,59,999",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Luxury Hotels", "Desert Safari", "Shopping", "Burj Khalifa"]
  },
  {
    id: 6,
    title: "Himalayan Adventure",
    location: "Manali & Leh Ladakh",
    duration: "9 Days",
    price: "₹45,999",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Mountain Passes", "Monasteries", "Adventure Sports", "Local Culture"]
  }
];

const FeaturedPackages = () => {
  const [packages, setPackages] = useState<Package[]>(defaultPackages);

  useEffect(() => {
    // Load packages from localStorage if available
    const savedPackages = localStorage.getItem('adminPackages');
    if (savedPackages) {
      try {
        const parsedPackages = JSON.parse(savedPackages);
        setPackages(parsedPackages);
      } catch (error) {
        console.error('Error parsing saved packages:', error);
        setPackages(defaultPackages);
      }
    }
  }, []);

  return (
    <section id="destinations" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Featured Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Handpicked adventures that will take your breath away and create memories to last a lifetime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105">
              <div className="relative overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-semibold text-gray-800">{pkg.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{pkg.title}</h3>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{pkg.location}</span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{pkg.duration}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {pkg.features.map((feature, index) => (
                    <span key={index} className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full font-medium">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-gray-800">{pkg.price}</span>
                    <div className="text-sm text-gray-600">per person</div>
                  </div>
                  <Link to="/book-now">
                    <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl shadow-lg group">
                      Book Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
