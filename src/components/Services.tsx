
import { Plane, Map, Camera, Compass, Globe, Star } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "World Tours",
    description: "Curated experiences across all continents with expert local guides"
  },
  {
    icon: Plane,
    title: "Flight Deals", 
    description: "Best prices on flights worldwide with flexible booking options"
  },
  {
    icon: Map,
    title: "Custom Itineraries",
    description: "Personalized travel plans tailored to your interests and budget"
  },
  {
    icon: Camera,
    title: "Photo Tours",
    description: "Capture stunning moments with professional photography guides"
  },
  {
    icon: Compass,
    title: "Adventure Travel",
    description: "Thrilling expeditions for the adventurous spirit in you"
  },
  {
    icon: Star,
    title: "Luxury Escapes",
    description: "Premium accommodations and exclusive experiences worldwide"
  }
];

const Services = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            What We Offer
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From adventure expeditions to luxury getaways, we create extraordinary travel experiences tailored just for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index}
                className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
