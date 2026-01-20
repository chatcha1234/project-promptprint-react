import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Download, Share2, ArrowLeft, Wand2 } from "lucide-react";

const AiDesign = () => {
  // const { productId } = useParams();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [enhancedPrompt, setEnhancedPrompt] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [isRemovingBg, setIsRemovingBg] = useState(false);
  const [originalImage, setOriginalImage] = useState(null);
  const [transparentImage, setTransparentImage] = useState(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setGeneratedImage(null);
    setOriginalImage(null);
    setTransparentImage(null); // Clear previous image

    const apiUrl = `${
      import.meta.env.VITE_API_URL || "http://localhost:5000"
    }/api/generate-design`;
    console.log("🚀 Sending request to:", apiUrl);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          style: selectedStyle,
          userId: localStorage.getItem("userId"),
        }),
      });

      const data = await response.json();
      console.log("📦 Response Data:", data);

      if (response.ok) {
        if (data.imageUrl) {
          setGeneratedImage(data.imageUrl);
          setOriginalImage(data.imageUrl); // Store original
          setEnhancedPrompt(data.enhancedPrompt);
        } else {
          alert("Server returned success but no image URL.");
        }
      } else {
        alert(`Failed to generate: ${data.error}`);
      }
    } catch (error) {
      console.error("❌ Network/Client Error:", error);
      alert("Error connecting to server.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseDesign = () => {
    alert("Design selected! (Feature coming soon: Add to Cart)");
  };

  const handleRemoveBackground = async () => {
    if (!generatedImage) return;
    setIsRemovingBg(true);

    const apiUrl = `${
      import.meta.env.VITE_API_URL || "http://localhost:5000"
    }/api/remove-background`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: generatedImage }),
      });

      const data = await response.json();
      if (data.transparentImageUrl) {
        setTransparentImage(data.transparentImageUrl);
        setGeneratedImage(data.transparentImageUrl); // Auto-switch to transparent
      } else {
        alert("Failed to remove background.");
      }
    } catch (error) {
      console.error("BG Removal Error:", error);
      alert("Error removing background.");
    } finally {
      setIsRemovingBg(false);
    }
  };

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-gray-50 flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col h-full overflow-hidden pb-4">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 flex-1 min-h-0">
          {/* Left Column: Preview */}
          {/* Left Column: Preview & Sidebar */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col h-full relative overflow-hidden">
            {/* Toggle Tabs (Visible if we have an original image) */}
            {originalImage && (
              <div className="flex justify-center gap-2 mb-4 shrink-0">
                <button
                  onClick={() => setGeneratedImage(originalImage)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    generatedImage === originalImage
                      ? "bg-gray-900 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Original
                </button>
                {transparentImage && (
                  <button
                    onClick={() => setGeneratedImage(transparentImage)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                      generatedImage === transparentImage
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    Transparent
                  </button>
                )}
              </div>
            )}

            {/* Main Preview Area */}
            <div className="flex-1 flex items-center justify-center min-h-0 relative overflow-hidden">
              <div className="relative w-full max-w-md aspect-3/4">
                <div className="w-full h-full min-h-[400px] lg:min-h-0 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative group">
                  {isGenerating ? (
                    <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300 bg-white/90 p-6 rounded-2xl">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Wand2 className="w-6 h-6 text-blue-600 animate-pulse" />
                        </div>
                      </div>
                      <span className="text-gray-500 font-medium">
                        Creating your Image...
                      </span>
                    </div>
                  ) : generatedImage ? (
                    <img
                      src={generatedImage}
                      alt="Generated Design"
                      className="w-full h-full object-contain shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-400 gap-4 bg-gray-50/50 p-6 rounded-2xl">
                      <div className="w-20 h-20 bg-gray-200 rounded-2xl flex items-center justify-center">
                        <Sparkles className="w-8 h-8 opacity-50" />
                      </div>
                      <p className="text-sm font-medium">
                        Your imagination appears here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Controls */}
          <div className="flex flex-col h-full min-h-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 flex-1 flex flex-col overflow-y-auto">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Create with AI
              </h1>
              <p className="text-gray-500 mb-6 lg:mb-8">
                Describe your vision, and let our AI generate unique artwork for
                your custom tee.
              </p>

              {enhancedPrompt && (
                <div className="mb-6 p-4 bg-purple-50 border border-purple-100 rounded-xl text-sm shrink-0">
                  <div className="flex items-center gap-2 text-purple-700 font-semibold mb-1">
                    <Sparkles className="w-4 h-4" />
                    Enhanced by Gemini
                  </div>
                  <p className="text-gray-700 italic">"{enhancedPrompt}"</p>
                </div>
              )}

              {/* Prompt Input */}
              <div className="mb-6 lg:mb-8 flex-1 flex flex-col min-h-[150px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe your design
                </label>
                <div className="relative flex-1 flex">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g., A cyberpunk cat wearing sunglasses, neon city background, retro wave style..."
                    className="w-full h-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all placeholder-gray-400 text-gray-900"
                  />
                  <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                    {prompt.length}/500
                  </div>
                </div>
              </div>

              {/* Styles */}
              <div className="mb-6 lg:mb-8 shrink-0">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Art Style
                </label>
                <div className="grid grid-cols-3 gap-2 lg:gap-3">
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
                      onClick={() => setSelectedStyle(style)}
                      className={`px-2 py-2 lg:px-3 text-xs lg:text-sm border rounded-lg transition-all ${
                        selectedStyle === style
                          ? "border-blue-600 bg-blue-50 text-blue-700 font-semibold ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-blue-500 hover:text-blue-600 text-gray-600"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <div className="shrink-0 space-y-3">
                <button
                  onClick={handleGenerate}
                  disabled={!prompt || isGenerating}
                  className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 ${
                    !prompt || isGenerating
                      ? "bg-gray-300 cursor-not-allowed shadow-none"
                      : "bg-linear-to-r from-blue-600 to-indigo-600 hover:opacity-90"
                  }`}
                >
                  {isGenerating ? "Generating..." : "Generate Artwork"}
                </button>

                {/* Actions for Generated Image */}
                {generatedImage && (
                  <div className="space-y-3 animate-in slide-in-from-bottom-2">
                    {/* Remove Background Action */}
                    {!transparentImage && (
                      <button
                        onClick={handleRemoveBackground}
                        disabled={isRemovingBg}
                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-semibold transition-all ${
                          isRemovingBg
                            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                            : "border-blue-100 text-blue-600 hover:bg-blue-50 hover:border-blue-200"
                        }`}
                      >
                        {isRemovingBg ? (
                          <>
                            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                            Removing Background...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            Remove Background (Magic)
                          </>
                        )}
                      </button>
                    )}

                    <button
                      onClick={handleUseDesign}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-green-600 text-white font-bold shadow-lg shadow-green-500/20 hover:bg-green-700 transition-all transform hover:-translate-y-0.5"
                    >
                      <Share2 className="w-5 h-5" />
                      Use This Design for T-Shirt
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiDesign;
