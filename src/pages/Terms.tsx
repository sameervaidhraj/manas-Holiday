
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Agreement to Terms</h2>
                <p>By using our services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Booking and Payment</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>All bookings require a confirmation deposit</li>
                  <li>Full payment must be made before travel commencement</li>
                  <li>Prices are subject to change until booking is confirmed</li>
                  <li>We accept payments via bank transfer, UPI, and cash</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Travel Documents</h2>
                <p>Travelers are responsible for ensuring they have valid identification and any required permits. Manas Holiday is not responsible for denied entry due to improper documentation.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Liability</h2>
                <p>Manas Holiday acts as an intermediary between travelers and service providers. We are not liable for any loss, injury, or damage arising from services provided by third parties.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Changes to Itinerary</h2>
                <p>We reserve the right to modify itineraries due to weather, local conditions, or circumstances beyond our control. We will provide suitable alternatives whenever possible.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact Information</h2>
                <div className="space-y-2">
                  <p><strong>Email:</strong> manasholidays2011@gmail.com</p>
                  <p><strong>Phone:</strong> +91 8982189222</p>
                  <p><strong>Address:</strong> Near Ayushman Nursing Home, Bilal Mill Road, Ashoknagar (M.P.) 473331</p>
                </div>
              </section>

              <section>
                <p className="text-sm text-gray-500 mt-8">Last updated: January 2025</p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
