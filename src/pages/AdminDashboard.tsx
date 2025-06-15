
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Plus, Edit, Trash2, Users, DollarSign, Calendar, LogOut, Plane, Hotel, MessageSquare, FileText } from 'lucide-react';
import PackageManager from '@/components/admin/PackageManager';
import FlightManager from '@/components/admin/FlightManager';
import HotelManager from '@/components/admin/HotelManager';
import ContactManager from '@/components/admin/ContactManager';
import BookingManager from '@/components/admin/BookingManager';
import { useToast } from '@/hooks/use-toast';

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

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [packages, setPackages] = useState<Package[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if admin is authenticated
    const checkAdminSession = () => {
      const adminSession = localStorage.getItem('adminSession');
      if (!adminSession) {
        navigate('/admin/login');
        return;
      }

      try {
        const session = JSON.parse(adminSession);
        // Check if session is valid (you can add expiration logic here if needed)
        if (!session.email || !session.loginTime) {
          localStorage.removeItem('adminSession');
          navigate('/admin/login');
          return;
        }
      } catch (error) {
        localStorage.removeItem('adminSession');
        navigate('/admin/login');
        return;
      }
    };

    checkAdminSession();

    // Load packages from localStorage or use default data
    const savedPackages = localStorage.getItem('adminPackages');
    if (savedPackages) {
      setPackages(JSON.parse(savedPackages));
    } else {
      // Default packages data
      const defaultPackages = [
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
      setPackages(defaultPackages);
      localStorage.setItem('adminPackages', JSON.stringify(defaultPackages));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/admin/login');
  };

  const updatePackages = (newPackages: Package[]) => {
    setPackages(newPackages);
    localStorage.setItem('adminPackages', JSON.stringify(newPackages));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 sm:py-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-base">MH</span>
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600 text-sm sm:text-base">Manas Holiday Management</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-1 mb-6 sm:mb-8 border-b overflow-x-auto">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('overview')}
            className="flex items-center space-x-2 rounded-b-none text-xs sm:text-sm whitespace-nowrap"
            size="sm"
          >
            <Package className="w-4 h-4" />
            <span>Overview</span>
          </Button>
          <Button
            variant={activeTab === 'packages' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('packages')}
            className="flex items-center space-x-2 rounded-b-none text-xs sm:text-sm whitespace-nowrap"
            size="sm"
          >
            <Package className="w-4 h-4" />
            <span>Packages</span>
          </Button>
          <Button
            variant={activeTab === 'flights' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('flights')}
            className="flex items-center space-x-2 rounded-b-none text-xs sm:text-sm whitespace-nowrap"
            size="sm"
          >
            <Plane className="w-4 h-4" />
            <span>Flights</span>
          </Button>
          <Button
            variant={activeTab === 'hotels' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('hotels')}
            className="flex items-center space-x-2 rounded-b-none text-xs sm:text-sm whitespace-nowrap"
            size="sm"
          >
            <Hotel className="w-4 h-4" />
            <span>Hotels</span>
          </Button>
          <Button
            variant={activeTab === 'contacts' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('contacts')}
            className="flex items-center space-x-2 rounded-b-none text-xs sm:text-sm whitespace-nowrap"
            size="sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contacts</span>
          </Button>
          <Button
            variant={activeTab === 'bookings' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('bookings')}
            className="flex items-center space-x-2 rounded-b-none text-xs sm:text-sm whitespace-nowrap"
            size="sm"
          >
            <FileText className="w-4 h-4" />
            <span>Bookings</span>
          </Button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6 sm:space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Total Packages</CardTitle>
                  <Package className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold">{packages.length}</div>
                  <p className="text-xs text-muted-foreground">Active travel packages</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Avg. Price</CardTitle>
                  <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold">₹52,499</div>
                  <p className="text-xs text-muted-foreground">Average package price</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Avg. Rating</CardTitle>
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold">4.8</div>
                  <p className="text-xs text-muted-foreground">Customer satisfaction</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Avg. Duration</CardTitle>
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold">7 Days</div>
                  <p className="text-xs text-muted-foreground">Average trip length</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Packages */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Recent Packages</CardTitle>
                <CardDescription>Your latest travel packages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {packages.slice(0, 3).map((pkg) => (
                    <div key={pkg.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border rounded-lg gap-3">
                      <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
                        <img src={pkg.image} alt={pkg.title} className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-sm sm:text-base truncate">{pkg.title}</h3>
                          <p className="text-xs sm:text-sm text-gray-600">{pkg.location} • {pkg.duration}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {pkg.features.slice(0, 2).map((feature, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right w-full sm:w-auto">
                        <div className="text-base sm:text-lg font-bold">{pkg.price}</div>
                        <div className="text-xs sm:text-sm text-gray-600">⭐ {pkg.rating}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Packages Management Tab */}
        {activeTab === 'packages' && (
          <PackageManager packages={packages} onUpdatePackages={updatePackages} />
        )}
        
        {/* Flights Management Tab */}
        {activeTab === 'flights' && (
          <FlightManager />
        )}

        {/* Hotels Management Tab */}
        {activeTab === 'hotels' && (
          <HotelManager />
        )}

        {/* Contacts Management Tab */}
        {activeTab === 'contacts' && (
          <ContactManager />
        )}

        {/* Bookings Management Tab */}
        {activeTab === 'bookings' && (
          <BookingManager />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
