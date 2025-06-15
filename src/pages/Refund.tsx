
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Refund = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Refund Policy</h1>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Cancellation Terms</h2>
                <p>At Manas Holiday, we understand that travel plans can change. Our refund policy is designed to be fair while protecting our business interests and those of our service providers.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Refund Schedule</h2>
                <p className="font-medium">For Domestic Travel Packages:</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>45+ days before travel: 100% refund (minus processing fees)</li>
                  <li>30-44 days before travel: 75% refund</li>
                  <li>15-29 days before travel: 50% refund</li>
                  <li>7-14 days before travel: 25% refund</li>
                  <li>Less than 7 days: No refund</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Processing Fees</h2>
                <p>A processing fee of ₹500 per person applies to all cancellations, regardless of the cancellation timeline. This fee covers administrative costs and payment gateway charges.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Non-Refundable Items</h2>
                <p>The following are non-refundable:</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>Visa fees and documentation charges</li>
                  <li>Travel insurance premiums</li>
                  <li>Confirmed flight tickets (subject to airline policies)</li>
                  <li>Pre-booked activities and experiences</li>
                  <li>Peak season and festival bookings (special terms apply)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Refund Process</h2>
                <p>To request a refund:</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>Contact us immediately via phone or email</li>
                  <li>Provide your booking reference and reason for cancellation</li>
                  <li>Submit any required documentation</li>
                  <li>Refunds will be processed within 7-10 business days after approval</li>
                  <li>Refunds will be credited to the original payment method</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Force Majeure</h2>
                <p>In cases of natural disasters, political unrest, or other circumstances beyond our control, we will work with you to reschedule your trip or provide a credit for future travel.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact for Cancellations</h2>
                <p>To cancel your booking or inquire about refunds:</p>
                <div className="space-y-2 mt-2">
                  <p><strong>Email:</strong> manasholidays2011@gmail.com</p>
                  <p><strong>Phone:</strong> +91 8982189222</p>
                  <p><strong>WhatsApp:</strong> +91 8982189222</p>
                </div>
              </section>

              <section>
                <p className="text-sm text-gray-500 mt-8">Note: This refund policy is subject to change. Please review the terms at the time of booking. For group bookings and special packages, different terms may apply.</p>
                <p className="text-sm text-gray-500 mt-2">Last updated: January 2025</p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Refund;
