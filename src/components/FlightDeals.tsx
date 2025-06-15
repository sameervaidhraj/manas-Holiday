
import { Plane, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

const fetchFlights = async () => {
  const { data, error } = await supabase.from('flights').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

const FlightDeals = () => {
  const { data: flights, isLoading, error } = useQuery({
    queryKey: ['flights'],
    queryFn: fetchFlights
  });

  return (
    <section id="flights" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Best Flight Deals
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fly to your dream destinations with our exclusive flight offers
          </p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        )}

        {error && <p className="text-center text-red-500">Could not fetch flight deals.</p>}

        {flights && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flights.map((flight) => (
              <div key={flight.id} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600">{flight.airline}</div>
                  <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Save ₹{parseInt(flight.original_price.replace('₹', '').replace(',', '')) - parseInt(flight.price.replace('₹', '').replace(',', ''))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">{flight.from_code}</div>
                    <div className="text-sm text-gray-600">{flight.from_city}</div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <Plane className="h-6 w-6 text-blue-600 mb-1" />
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">{flight.to_code}</div>
                    <div className="text-sm text-gray-600">{flight.to_city}</div>
                  </div>
                </div>

                <div className="flex items-center justify-center mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{flight.date}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-orange-600">{flight.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">{flight.original_price}</span>
                    <div className="text-sm text-gray-600">per person</div>
                  </div>
                  <Link to="/book-now">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2">
                      Book Flight
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FlightDeals;
