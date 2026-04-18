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
                <svg className="w-6 h-6 shrink-0 text-blue-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12.002 12.002 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              <div>
                <p className="text-xs text-blue-500 font-medium">Telegram</p>
                <a href="https://t.me/+xiZV9WhjGl05OWU9" className="text-blue-700 font-semibold hover:underline">
                  https://t.me/+xiZV9WhjGl05OWU9
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
