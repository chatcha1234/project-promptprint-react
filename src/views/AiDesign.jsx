import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Sparkles, Download, Share2, ArrowLeft, Wand2 } from "lucide-react";

const AiDesign = () => {
  const { productId } = useParams();
  console.log("Current Product ID for Design:", productId);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [enhancedPrompt, setEnhancedPrompt] = useState(null);

  // Function to call AI generation API
  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setGeneratedImage(null); // Clear previous image

    try {
      const response = await fetch(
        "http://localhost:5000/api/generate-design",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setGeneratedImage(data.imageUrl);
        setEnhancedPrompt(data.enhancedPrompt);
      } else {
        console.error("Failed to generate:", data.error);
        alert("Failed to generate image. Please try again.");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Error connecting to server.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Shop</span>
          </Link>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            AI Design Studio
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Preview */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex items-center justify-center min-h-[600px] relative overflow-hidden">
            <div className="relative w-full max-w-md aspect-[3/4]">
              {/* T-Shirt Mockup Background */}
              <img
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="T-Shirt Mockup"
                className="w-full h-full object-cover rounded-lg"
              />

              {/* Design Overlay Area */}
              <div className="absolute top-[25%] left-[28%] w-[44%] h-[40%] flex items-center justify-center overflow-hidden mix-blend-multiply">
                {isGenerating ? (
                  <div className="flex flex-col items-center gap-3 text-gray-500 bg-white/80 p-4 rounded-lg backdrop-blur-sm">
                    <Wand2 className="w-8 h-8 animate-spin text-blue-600" />
                    <span className="text-xs font-medium">
                      Creating Magic...
                    </span>
                  </div>
                ) : generatedImage ? (
                  <img
                    src={generatedImage}
                    alt="Generated Design"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="border-2 border-dashed border-gray-300 w-full h-full rounded-lg flex items-center justify-center bg-white/50">
                    <span className="text-gray-400 text-xs font-medium">
                      Your Art Here
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  className="p-2 bg-white/90 backdrop-blur hover:bg-white text-gray-700 rounded-lg shadow-sm transition-all"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  className="p-2 bg-white/90 backdrop-blur hover:bg-white text-gray-700 rounded-lg shadow-sm transition-all"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Controls */}
          <div className="flex flex-col h-full">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Create with AI
              </h1>
              <p className="text-gray-500 mb-8">
                Describe your vision, and let our AI generate unique artwork for
                your custom tee.
              </p>

              {enhancedPrompt && (
                <div className="mb-6 p-4 bg-purple-50 border border-purple-100 rounded-xl text-sm">
                  <div className="flex items-center gap-2 text-purple-700 font-semibold mb-1">
                    <Sparkles className="w-4 h-4" />
                    Enhanced by Gemini
                  </div>
                  <p className="text-gray-700 italic">"{enhancedPrompt}"</p>
                </div>
              )}

              {/* Prompt Input */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe your design
                </label>
                <div className="relative">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g., A cyberpunk cat wearing sunglasses, neon city background, retro wave style..."
                    className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all placeholder-gray-400 text-gray-900"
                  />
                  <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                    {prompt.length}/500
                  </div>
                </div>
              </div>

              {/* Styles */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Art Style
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    "Realistic",
                    "Anime",
                    "Oil Painting",
                    "Digital Art",
                    "Vintage",
                    "3D Render",
                  ].map((style) => (
                    <button
                      key={style}
                      className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all text-gray-600"
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!prompt || isGenerating}
                className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 ${
                  !prompt || isGenerating
                    ? "bg-gray-300 cursor-not-allowed shadow-none"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90"
                }`}
              >
                {isGenerating ? "Generating..." : "Generate Artwork"}
              </button>
            </div>

            {/* Price & Add to Cart */}
            <div className="mt-6 bg-gray-900 rounded-2xl p-6 text-white flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Price</p>
                <p className="text-2xl font-bold">$35.00</p>
              </div>
              <button className="px-8 py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiDesign;
