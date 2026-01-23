import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Zap, ShieldCheck, Truck } from "lucide-react";

const LandingPage = () => {
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

      {/* ==================== HOW IT WORKS ==================== */}
      <div className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 pl-1.25">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                From Imagination to <br />{" "}
                <span className="text-indigo-600">Reality in 3 Steps</span>
              </h2>
              <div className="space-y-8 mt-10">
                {[
                  {
                    step: "01",
                    title: "Imagine",
                    desc: "Type what you want to see. 'A cyberpunk cat eating ramen'.",
                  },
                  {
                    step: "02",
                    title: "Generate",
                    desc: "Our AI creates 4 unique variations for you to choose from.",
                  },
                  {
                    step: "03",
                    title: "Wear",
                    desc: "We print your favorite design on a premium t-shirt and ship it.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <span className="text-5xl font-black text-gray-100 group-hover:text-indigo-100 transition-colors">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12">
                <Link
                  to="/ai-design"
                  className="text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-2"
                >
                  Start Designing Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-600 rounded-3xl rotate-3 opacity-20 blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop"
                alt="Printing Process"
                className="relative rounded-3xl shadow-2xl z-10 hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ==================== REVIEWS ==================== */}
      <div className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">
            Trusted by Creators
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah J.",
                role: "Digital Artist",
                text: "The print quality is insane. I couldn't believe it was generated by AI.",
              },
              {
                name: "Mike T.",
                role: "Developer",
                text: "Finally, I can wear my own memes. Fast shipping and great fabric.",
              },
              {
                name: "Emily R.",
                role: "Student",
                text: "Ordered a custom shirt for my boyfriend. He loved it! Best gift ever.",
              },
            ].map((review, idx) => (
              <div
                key={idx}
                className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm"
              >
                <div className="flex gap-1 mb-4 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center font-bold">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{review.name}</p>
                    <p className="text-xs text-gray-400">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==================== CTA FOOTER ==================== */}
      <div className="py-20 bg-indigo-600 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">
            Ready to wear your imagination?
          </h2>
          <p className="text-indigo-100 text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of creators who are turning their ideas into fashion.
          </p>
          <Link
            to="/shop"
            className="inline-block px-12 py-5 bg-white text-indigo-600 rounded-full font-bold text-xl hover:shadow-2xl hover:-translate-y-1 transition-all shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
