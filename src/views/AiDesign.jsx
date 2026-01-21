import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Download,
  Share2,
  ArrowLeft,
  Wand2,
  RefreshCcw,
  ShoppingCart,
} from "lucide-react";
import { Canvas, Image as FabricImage } from "fabric"; // Fabric.js v6+ named imports

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
  const navigate = useNavigate();

  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  // Initialize Fabric Canvas
  useEffect(() => {
    // Don't initialize if already exists
    if (fabricCanvasRef.current) {
      console.log("🎨 Fabric Canvas already exists, skipping init");
      return;
    }

    if (!canvasRef.current) {
      console.log("⚠️ Canvas DOM element not ready");
      return;
    }

    console.log("🎨 Initializing Fabric Canvas...");

    const canvas = new Canvas(canvasRef.current, {
      width: 500,
      height: 600,
      backgroundColor: "#f9fafb",
      selection: false,
    });

    fabricCanvasRef.current = canvas;
    setIsCanvasReady(true);

    // Load T-Shirt Background
    const shirtImg = new Image();
    shirtImg.src = "/products3.png";
    shirtImg.onload = () => {
      // Check if canvas still exists (in case of unmount)
      if (!fabricCanvasRef.current) return;

      const fabricImg = new FabricImage(shirtImg);
      // Scale shirt to fit canvas
      const scale =
        Math.min(
          canvas.width / fabricImg.width,
          canvas.height / fabricImg.height,
        ) * 0.9;

      fabricImg.scale(scale);
      fabricImg.set({
        left: canvas.width / 2,
        top: canvas.height / 2,
        originX: "center",
        originY: "center",
        selectable: false,
        evented: false,
      });

      canvas.add(fabricImg);
      canvas.sendObjectToBack(fabricImg);
      canvas.renderAll();
      console.log("✅ T-shirt background loaded");
    };

    return () => {
      console.log("🧹 Disposing Fabric Canvas");
      canvas.dispose();
      fabricCanvasRef.current = null; // Clear the ref!
      setIsCanvasReady(false);
    };
  }, []);

  // Handle Adding/Updating Design on Canvas
  useEffect(() => {
    if (!fabricCanvasRef.current || !generatedImage || !isCanvasReady) {
      console.log("⏳ Waiting for canvas or image...", {
        hasCanvas: !!fabricCanvasRef.current,
        hasImage: !!generatedImage,
        isReady: isCanvasReady,
      });
      return;
    }

    const canvas = fabricCanvasRef.current;

    // Remove existing designs (keep background)
    canvas.getObjects().forEach((obj) => {
      if (obj.selectable) {
        canvas.remove(obj);
      }
    });

    const imgObj = new Image();
    imgObj.crossOrigin = "anonymous";
    imgObj.src = generatedImage;

    console.log("🎨 Loading generated image onto canvas:", generatedImage);

    imgObj.onload = () => {
      // Double-check canvas still exists after async image load
      if (!fabricCanvasRef.current) {
        console.log("⚠️ Canvas was disposed before image loaded");
        return;
      }

      console.log("✅ Image loaded successfully, creating Fabric object...");
      const designImg = new FabricImage(imgObj);
      const scale = (canvas.width * 0.4) / designImg.width;

      designImg.set({
        scaleX: scale,
        scaleY: scale,
        left: canvas.width / 2,
        top: canvas.height * 0.4,
        originX: "center",
        originY: "center",
        cornerColor: "white",
        cornerStrokeColor: "#2563eb",
        borderColor: "#2563eb",
        cornerStyle: "circle",
        transparentCorners: false,
        padding: 10,
      });

      canvas.add(designImg);
      canvas.setActiveObject(designImg);
      canvas.bringObjectToFront(designImg); // Ensure it's on top of the shirt
      canvas.renderAll();
      console.log(
        "🖌️ Canvas rendered with new design. Objects:",
        canvas.getObjects().length,
      );
    };

    imgObj.onerror = (err) => {
      console.error("❌ Error loading image object:", err);
    };
  }, [generatedImage, isCanvasReady]);

  // Handle Window Resize
  useEffect(() => {
    const handleResize = () => {
      if (!fabricCanvasRef.current || !canvasRef.current.parentElement) return;
      // Logic for resizing canvas if needed
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setGeneratedImage(null);
    setOriginalImage(null);
    setTransparentImage(null); // Clear previous image

    const apiUrl = "/api/generate-design";
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

  const handleUseDesign = async () => {
    if (!fabricCanvasRef.current) return;

    // Export Canvas to Data URL (capture the look)
    const designDataUrl = fabricCanvasRef.current.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 1,
    });

    const customProduct = {
      name: "Custom AI T-Shirt",
      description: `Custom design: ${prompt}`,
      price: 590, // Fixed price for custom tee
      imageUrl: designDataUrl, // Use the canvas snapshot
      isCustom: true,
    };

    // Add to Cart via API
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        const response = await fetch("/api/cart/custom", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            customProduct,
            quantity: 1,
          }),
        });

        if (response.ok) {
          alert("Added to cart!");
          navigate("/cart");
        } else {
          const data = await response.json();
          alert(data.error || "Failed to add to cart");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to add to cart");
      }
    } else {
      alert("Please login to purchase");
      navigate("/login");
    }
  };

  const handleRemoveBackground = async () => {
    if (!generatedImage) return;
    setIsRemovingBg(true);

    const apiUrl = "/api/remove-background";

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
            <div className="flex-1 flex items-center justify-center min-h-0 relative overflow-hidden bg-white">
              {/* Fabric Canvas Container */}
              <div className="relative w-full h-full flex items-center justify-center bg-gray-50/50 rounded-xl overflow-hidden border border-gray-100">
                <div className="relative shadow-xl">
                  <canvas ref={canvasRef} width={500} height={600} />
                </div>

                {/* Loading Overlay */}
                {isGenerating && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/90 z-10 transition-all duration-300">
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
                )}

                {!generatedImage && !isGenerating && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className="bg-white/80 p-6 rounded-2xl backdrop-blur-sm text-center shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Preview Design
                      </h3>
                      <p className="text-sm text-gray-500">
                        Your generated artwork will appear here
                      </p>
                    </div>
                  </div>
                )}
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
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
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
