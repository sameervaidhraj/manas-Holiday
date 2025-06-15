
import { useState } from "react";
import { Calendar, Users, MapPin, Plane, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const BookNow = () => {
  const [bookingData, setBookingData] = useState({
    destination: "",
    departureDate: "",
    returnDate: "",
    travelers: "1",
    email: "",
    phone: "",
    specialRequests: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('booking_requests')
        .insert([
          {
            destination: bookingData.destination,
            departure_date: bookingData.departureDate,
            return_date: bookingData.returnDate,
            travelers: parseInt(bookingData.travelers),
            email: bookingData.email,
            phone: bookingData.phone,
            special_requests: bookingData.specialRequests || null
          }
        ]);

      if (error) throw error;

      toast({
        title: "Booking Request Submitted!",
        description: "Thank you for your booking request. Our team will contact you within 24 hours to confirm your booking.",
      });

      // Reset form
      setBookingData({
        destination: "",
        departureDate: "",
        returnDate: "",
        travelers: "1",
        email: "",
        phone: "",
        specialRequests: ""
      });
    } catch (error) {
      console.error('Error submitting booking request:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
              Book Your Dream Trip
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto px-4">
              Ready for your next adventure? Fill out the form below and let us create the perfect journey for you
            </p>
          </div>
        </div>
      </div>

      {/* Booking Form Section */}
      <div className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Complete Your Booking</h2>
              <p className="text-gray-600 text-sm sm:text-base">Tell us about your dream destination and we'll handle the rest</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Trip Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="destination" className="flex items-center mb-2 text-sm sm:text-base">
                    <MapPin className="h-4 w-4 mr-2 text-purple-600" />
                    Destination
                  </Label>
                  <Input
                    id="destination"
                    name="destination"
                    type="text"
                    placeholder="Where would you like to go?"
                    value={bookingData.destination}
                    onChange={handleChange}
                    className="text-sm sm:text-base"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="travelers" className="flex items-center mb-2 text-sm sm:text-base">
                    <Users className="h-4 w-4 mr-2 text-purple-600" />
                    Number of Travelers
                  </Label>
                  <Input
                    id="travelers"
                    name="travelers"
                    type="number"
                    min="1"
                    value={bookingData.travelers}
                    onChange={handleChange}
                    className="text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="departureDate" className="flex items-center mb-2 text-sm sm:text-base">
                    <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                    Departure Date
                  </Label>
                  <Input
                    id="departureDate"
                    name="departureDate"
                    type="date"
                    value={bookingData.departureDate}
                    onChange={handleChange}
                    className="text-sm sm:text-base"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="returnDate" className="flex items-center mb-2 text-sm sm:text-base">
                    <Plane className="h-4 w-4 mr-2 text-purple-600" />
                    Return Date
                  </Label>
                  <Input
                    id="returnDate"
                    name="returnDate"
                    type="date"
                    value={bookingData.returnDate}
                    onChange={handleChange}
                    className="text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t pt-6 sm:pt-8">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Contact Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="email" className="text-sm sm:text-base">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={bookingData.email}
                      onChange={handleChange}
                      className="mt-1 text-sm sm:text-base"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-sm sm:text-base">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98821 89222"
                      value={bookingData.phone}
                      onChange={handleChange}
                      className="mt-1 text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <Label htmlFor="specialRequests" className="text-sm sm:text-base">Special Requests or Preferences</Label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={bookingData.specialRequests}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                  rows={4}
                  placeholder="Tell us about any special requirements, dietary restrictions, or preferences..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 sm:pt-6">
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-lg"
                >
                  <CreditCard className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                </Button>
                
                <p className="text-center text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4 px-2">
                  Our team will contact you within 24 hours to confirm your booking and discuss payment options.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookNow;
