
-- Create table for flight deals
CREATE TABLE public.flights (
    id SERIAL PRIMARY KEY,
    from_city TEXT NOT NULL,
    to_city TEXT NOT NULL,
    from_code TEXT NOT NULL,
    to_code TEXT NOT NULL,
    date TEXT NOT NULL,
    price TEXT NOT NULL,
    original_price TEXT NOT NULL,
    airline TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create table for hotel offers
CREATE TABLE public.hotels (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    rating NUMERIC(2, 1) NOT NULL,
    reviews INT NOT NULL,
    price TEXT NOT NULL,
    original_price TEXT NOT NULL,
    image TEXT NOT NULL,
    amenities TEXT[] NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert initial flight data from FlightDeals.tsx
INSERT INTO public.flights (from_city, to_city, from_code, to_code, date, price, original_price, airline) VALUES
('Delhi', 'Mumbai', 'DEL', 'BOM', 'Dec 15, 2024', '₹4,999', '₹7,999', 'Air India'),
('Mumbai', 'Goa', 'BOM', 'GOI', 'Dec 20, 2024', '₹3,499', '₹5,999', 'IndiGo'),
('Bangalore', 'Chennai', 'BLR', 'MAA', 'Dec 18, 2024', '₹2,999', '₹4,999', 'SpiceJet'),
('Delhi', 'London', 'DEL', 'LHR', 'Dec 25, 2024', '₹65,999', '₹89,999', 'British Airways'),
('Mumbai', 'Dubai', 'BOM', 'DXB', 'Dec 22, 2024', '₹25,999', '₹35,999', 'Emirates'),
('Chennai', 'Singapore', 'MAA', 'SIN', 'Dec 28, 2024', '₹32,999', '₹45,999', 'Singapore Airlines');

-- Insert initial hotel data from HotelOffers.tsx
INSERT INTO public.hotels (name, location, rating, reviews, price, original_price, image, amenities) VALUES
('Taj Palace Hotel', 'New Delhi, India', 4.8, 892, '₹8,999', '₹12,999', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', '{"Free WiFi", "Pool", "Restaurant", "Spa"}'),
('Oberoi Udaivilas', 'Udaipur, India', 4.9, 654, '₹15,999', '₹22,999', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', '{"Free WiFi", "Pool", "Restaurant", "Parking"}'),
('Leela Palace Goa', 'Goa, India', 4.7, 421, '₹12,999', '₹18,999', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', '{"Free WiFi", "Pool", "Beach Access", "Restaurant"}'),
('Burj Al Arab', 'Dubai, UAE', 4.9, 789, '₹45,999', '₹65,999', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', '{"Free WiFi", "Pool", "Restaurant", "Spa"}'),
('Ritz Carlton', 'London, UK', 4.8, 567, '₹35,999', '₹49,999', 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', '{"Free WiFi", "Gym", "Restaurant", "Spa"}'),
('Marina Bay Sands', 'Singapore', 4.7, 432, '₹28,999', '₹39,999', 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', '{"Free WiFi", "Pool", "Restaurant", "Gym"}');

-- Enable Row Level Security for both tables
ALTER TABLE public.flights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access to everyone
CREATE POLICY "Public read access for flights" ON public.flights FOR SELECT USING (true);
CREATE POLICY "Public read access for hotels" ON public.hotels FOR SELECT USING (true);

-- Create policies to allow admin users (authenticated role) to manage data
-- NOTE: This requires a proper admin login system.
CREATE POLICY "Admin can manage flights" ON public.flights FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage hotels" ON public.hotels FOR ALL USING (auth.role() = 'authenticated');
