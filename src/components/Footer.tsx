
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">MH</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Manas Holiday</h3>
                <p className="text-sm text-gray-300">Your Travel Partner</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 text-sm">
              Your trusted travel partner for exploring incredible destinations. We create unforgettable experiences with personalized service and unbeatable prices.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-3">
              <div className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
                <Facebook className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
                <Twitter className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
                <Instagram className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
                <Youtube className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
            </h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm hover:translate-x-1 inline-block duration-300">Home</Link></li>
              <li><a href="#destinations" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm hover:translate-x-1 inline-block duration-300">Holiday Packages</a></li>
              <li><a href="#flights" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm hover:translate-x-1 inline-block duration-300">Flight & Hotel Offers</a></li>
              <li><a href="#offers" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm hover:translate-x-1 inline-block duration-300">Special Offers</a></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm hover:translate-x-1 inline-block duration-300">Contact Us</Link></li>
              <li><Link to="/book-now" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm hover:translate-x-1 inline-block duration-300">Book Now</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white relative">
              Our Services
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
            </h4>
            <ul className="space-y-3">
              <li><span className="text-gray-300 text-sm">Domestic Tours</span></li>
              <li><span className="text-gray-300 text-sm">International Tours</span></li>
              <li><span className="text-gray-300 text-sm">Flight Booking</span></li>
              <li><span className="text-gray-300 text-sm">Hotel Reservation</span></li>
              <li><span className="text-gray-300 text-sm">Passport Application</span></li>
              <li><span className="text-gray-300 text-sm">Visa Services</span></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white relative">
              Contact Information
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center mt-1">
                  <MapPin className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <p className="font-medium text-white text-sm">Manas Holiday</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Near Ayushman Nursing Home,<br />
                    Bilal Mill Road, Ashoknagar (M.P.) 473331
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <Phone className="h-4 w-4 text-emerald-400" />
                </div>
                <span className="text-gray-300 text-sm">+91 8982189222</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="h-4 w-4 text-emerald-400" />
                </div>
                <span className="text-gray-300 text-sm">manasholidays2011@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm">
              <Link to="/terms" className="text-gray-400 hover:text-emerald-400 transition-colors">Terms & Conditions</Link>
              <Link to="/privacy" className="text-gray-400 hover:text-emerald-400 transition-colors">Privacy Policy</Link>
              <Link to="/refund" className="text-gray-400 hover:text-emerald-400 transition-colors">Refund Policy</Link>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2024 Manas Holiday Pvt. Ltd. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
