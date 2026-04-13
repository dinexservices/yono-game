import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-6">Contact Us</h1>
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-8">
          <p className="text-slate-600 leading-relaxed mb-6">
            Have questions, suggestions, or need support? We&apos;d love to hear from you!
            Reach out to us through any of the following channels:
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
              <span className="text-2xl">📧</span>
              <div>
                <p className="text-xs text-blue-500 font-medium">Email</p>
                <p className="text-slate-700 font-semibold">support@casinohub.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
              <span className="text-2xl">📱</span>
              <div>
                <p className="text-xs text-blue-500 font-medium">Telegram</p>
                <a href="https://t.me/casinohub" className="text-blue-700 font-semibold hover:underline">
                  https://t.me/casinohub
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
              <span className="text-2xl">⏰</span>
              <div>
                <p className="text-xs text-blue-500 font-medium">Response Time</p>
                <p className="text-slate-700 font-semibold">Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
