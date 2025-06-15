
import { Star, MapPin, Wifi, Car, Utensils, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

const fetchHotels = async () => {
  const { data, error } = await supabase.from('hotels').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

const amenityIcons = {
  "Free WiFi": Wifi,
  "Pool": Waves,
  "Restaurant": Utensils,
  "Parking": Car,
  "Gym": Waves,
  "Spa": Waves,
  "Beach Access": Waves
};

const HotelOffers = () => {
  const { data: hotels, isLoading, error } = useQuery({
    queryKey: ['hotels'],
    queryFn: fetchHotels
  });

  return (
    <section id="hotels" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Exclusive Hotel Offers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay in comfort and luxury with our handpicked hotel deals
          </p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-96 w-full" />
            ))}
          </div>
        )}

        {error && <p className="text-center text-red-500">Could not fetch hotel offers.</p>}

        {hotels && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                    ₹{parseInt(hotel.original_price.replace('₹', '').replace(',', '')) - parseInt(hotel.price.replace('₹', '').replace(',', ''))} OFF
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{hotel.name}</h3>
                  
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{hotel.location}</span>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(Number(hotel.rating)) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">{hotel.rating} ({hotel.reviews} reviews)</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.map((amenity, index) => {
                      const IconComponent = amenityIcons[amenity] || Wifi;
                      return (
                        <div key={index} className="flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          <IconComponent className="h-3 w-3 mr-1" />
                          {amenity}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-orange-600">{hotel.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">{hotel.original_price}</span>
                      <div className="text-sm text-gray-600">per night</div>
                    </div>
                    <Link to="/book-now">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HotelOffers;
