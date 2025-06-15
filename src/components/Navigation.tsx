
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isHomePage]);

  // Determine navbar appearance based on page and scroll state
  const getNavbarClasses = () => {
    if (isHomePage && !isScrolled) {
      // Transparent navbar on homepage when not scrolled
      return "fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-none";
    } else {
      // White navbar with shadow when scrolled or on other pages
      return "fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200";
    }
  };

  const getTextClasses = () => {
    if (isHomePage && !isScrolled) {
      return "text-white";
    } else {
      return "text-gray-800";
    }
  };

  const getLinkClasses = () => {
    if (isHomePage && !isScrolled) {
      return "text-white/90 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/10";
    } else {
      return "text-gray-600 hover:text-emerald-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-emerald-50";
    }
  };

  const getMobileLinkClasses = () => {
    if (isHomePage && !isScrolled) {
      return "text-white/90 hover:text-white block px-3 py-2 rounded-lg text-base font-medium hover:bg-white/10 transition-colors";
    } else {
      return "text-gray-600 hover:text-emerald-600 block px-3 py-2 rounded-lg text-base font-medium hover:bg-emerald-50 transition-colors";
    }
  };

  const getMenuButtonClasses = () => {
    if (isHomePage && !isScrolled) {
      return "inline-flex items-center justify-center p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors";
    } else {
      return "inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors";
    }
  };

  const getMobileMenuClasses = () => {
    if (isHomePage && !isScrolled) {
      return "px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 backdrop-blur-md border-t border-white/20";
    } else {
      return "px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md border-t border-gray-200";
    }
  };

  const getBookNowButtonClasses = () => {
    if (isHomePage && !isScrolled) {
      return "bg-transparent border-2 border-white/60 text-white hover:bg-white/10 hover:border-white px-6 py-2 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm";
    } else {
      return "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105";
    }
  };

  return (
    <nav className={getNavbarClasses()}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md">
                <img 
                  src="/lovable-uploads/4b36feb9-baa6-4e83-99fd-718c6ec13c9b.png" 
                  alt="Manas Holiday Logo" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${getTextClasses()}`}>
                  Manas Holiday
                </h1>
                <p className={`text-xs font-medium ${isHomePage && !isScrolled ? 'text-white/70' : 'text-gray-500'}`}>Your Travel Partner</p>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              <Link to="/" className={getLinkClasses()}>Home</Link>
              <a href="#destinations" className={getLinkClasses()}>Destinations</a>
              <a href="#flights" className={getLinkClasses()}>Flights</a>
              <a href="#hotels" className={getLinkClasses()}>Hotels</a>
              <a href="#offers" className={getLinkClasses()}>Offers</a>
              <Link to="/contact" className={getLinkClasses()}>Contact</Link>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <Link to="/book-now">
              <Button className={getBookNowButtonClasses()}>
                Book Now
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={getMenuButtonClasses()}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className={getMobileMenuClasses()}>
            <Link to="/" className={getMobileLinkClasses()}>Home</Link>
            <a href="#destinations" className={getMobileLinkClasses()}>Destinations</a>
            <a href="#flights" className={getMobileLinkClasses()}>Flights</a>
            <a href="#hotels" className={getMobileLinkClasses()}>Hotels</a>
            <a href="#offers" className={getMobileLinkClasses()}>Offers</a>
            <Link to="/contact" className={getMobileLinkClasses()}>Contact</Link>
            <Link to="/book-now" className="block mt-3">
              <Button className={getBookNowButtonClasses()}>
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
