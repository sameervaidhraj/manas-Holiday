
import { Gift, Clock, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const offers = [
  {
    id: 1,
    title: "Early Bird Special",
    description: "Book 60 days in advance and save up to 30% on all packages",
    discount: "30%",
    validUntil: "Dec 31, 2024",
    icon: Clock,
    color: "bg-green-500"
  },
  {
    id: 2,
    title: "Group Travel Discount",
    description: "Travel with 6+ people and get exclusive group rates",
    discount: "25%",
    validUntil: "Ongoing",
    icon: Users,
    color: "bg-blue-500"
  },
  {
    id: 3,
    title: "First Time Traveler",
    description: "New customers get special pricing on their first booking",
    discount: "20%",
    validUntil: "Limited Time",
    icon: Gift,
    color: "bg-purple-500"
  },
  {
    id: 4,
    title: "Global Explorer",
    description: "Book multiple destinations and unlock progressive savings",
    discount: "Up to 40%",
    validUntil: "Year Round",
    icon: Globe,
    color: "bg-orange-500"
  }
];

const SpecialOffers = () => {
  return (
    <section id="offers" className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Special Offers & Discounts
          </h2>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Don't miss out on these limited-time deals and exclusive savings opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer) => {
            const IconComponent = offer.icon;
            return (
              <div key={offer.id} className="bg-white text-gray-800 rounded-lg shadow-lg p-6 hover:transform hover:scale-105 transition-all duration-300">
                <div className={`${offer.color} text-white rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                
                <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{offer.description}</p>
                
                <div className="mb-4">
                  <span className="text-3xl font-bold text-orange-600">{offer.discount}</span>
                  <span className="text-sm text-gray-500 ml-2">OFF</span>
                </div>
                
                <div className="text-sm text-gray-500 mb-4">
                  Valid until: {offer.validUntil}
                </div>
                
                <Link to="/book-now">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    Claim Offer
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg opacity-90 mb-4">
            Ready to start your adventure?
          </p>
          <Link to="/book-now">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 px-8 py-3 text-lg font-semibold">
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
