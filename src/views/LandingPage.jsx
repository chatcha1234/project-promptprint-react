import React from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowRight, Star, Zap, ShieldCheck, Truck } from "lucide-react";

const LandingPage = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (isAuthenticated) {
    return <Navigate to="/shop" replace />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ==================== HERO SECTION ==================== */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>

        {/* Background Image/Video Placeholder */}
        <div
          className="absolute inset-0 bg-cover bg-center animate-ken-burns"
          style={{ backgroundImage: "url('/CommitTeam.png')" }}
        ></div>

        {/* Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto text-white space-y-8">
          <div className="space-y-4 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
              Design Your Dream <br /> With AI Power
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light">
              Create unique custom t-shirts in seconds. No design skills needed.
              Just imagine it, and our AI will print it.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8 animate-fade-in-up delay-200">
            <Link
              to="/shop"
              className="px-10 py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl flex items-center gap-2"
            >
              Shop Collection <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/ai-design"
              className="px-10 py-4 bg-transparent border-2 border-white/30 backdrop-blur-sm text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all hover:scale-105"
            >
              Try AI Design ✨
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/50">
          <span className="text-sm">Scroll to explore</span>
        </div>
      </div>

      {/* ==================== FEATURES SECTION ==================== */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-indigo-500 uppercase tracking-wider mb-2">
              Why Choose Us
            </h2>
            <h3 className="text-4xl font-bold text-gray-900">
              Premium Quality, Powered by Technology
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Zap className="w-10 h-10 text-yellow-500" />,
                title: "AI-Powered Design",
                desc: "Generate professional-grade artwork from simple text prompts in seconds.",
              },
              {
                icon: <ShieldCheck className="w-10 h-10 text-emerald-500" />,
                title: "Premium Materials",
                desc: "We use 100% premium cotton and eco-friendly inks that last wash after wash.",
              },
              {
                icon: <Truck className="w-10 h-10 text-blue-500" />,
                title: "Fast Shipping",
                desc: "Production in 24 hours. Express delivery to your doorstep within 3-5 days.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl shadow-xs hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
