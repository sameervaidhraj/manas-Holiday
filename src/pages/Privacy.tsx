
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Information We Collect</h2>
                <p>At Manas Holiday, we collect information you provide directly to us, such as when you book a travel package, contact us for support, or subscribe to our newsletter. This may include your name, email address, phone number, travel preferences, and payment information.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>Process and manage your travel bookings</li>
                  <li>Communicate with you about your trips and our services</li>
                  <li>Provide customer support and respond to your inquiries</li>
                  <li>Send you promotional materials and travel offers (with your consent)</li>
                  <li>Improve our services and develop new offerings</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Information Sharing</h2>
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with trusted service providers who assist us in operating our business, conducting transactions, or servicing you, as long as they agree to keep this information confidential.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Data Security</h2>
                <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Your Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your personal data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request information about how we use your data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact Us</h2>
                <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
                <div className="space-y-2 mt-2">
                  <p><strong>Email:</strong> manasholidays2011@gmail.com</p>
                  <p><strong>Phone:</strong> +91 8982189222</p>
                  <p><strong>Address:</strong> Near Ayushman Nursing Home, Bilal Mill Road, Ashoknagar (M.P.) 473331</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
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

export default Privacy;
