import React, { useState } from "react";
import {
  Upload,
  Type,
  Image as ImageIcon,
  Download,
  Share2,
  Shirt,
} from "lucide-react";

const MockupZone = () => {
  const [selectedTool, setSelectedTool] = useState("upload");

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex flex-col lg:flex-row h-[600px]">
        {/* Left: Toolbar */}
        <div className="w-full lg:w-20 bg-gray-50 border-r border-gray-100 flex lg:flex-col items-center py-4 gap-4 overflow-x-auto lg:overflow-visible">
          {[
            {
              id: "upload",
              icon: <Upload className="w-5 h-5" />,
              label: "Upload",
            },
            { id: "text", icon: <Type className="w-5 h-5" />, label: "Text" },
            {
              id: "ai",
              icon: <ImageIcon className="w-5 h-5" />,
              label: "AI Art",
            },
            {
              id: "product",
              icon: <Shirt className="w-5 h-5" />,
              label: "Product",
            },
          ].map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`p-3 rounded-xl transition-all ${
                selectedTool === tool.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {tool.icon}
            </button>
          ))}
        </div>

        {/* Center: Canvas Area */}
        <div className="flex-1 bg-gray-50/50 relative flex items-center justify-center p-8">
          <div className="relative w-full max-w-md aspect-[3/4] bg-white rounded-lg shadow-2xl shadow-gray-200/50 flex items-center justify-center overflow-hidden">
            {/* T-Shirt Base */}
            <div className="relative w-full h-full flex items-center justify-center bg-gray-100">
              <Shirt className="w-64 h-64 text-gray-300 stroke-1" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-gray-400 text-sm font-medium opacity-50">
                  Print Area
                </span>
              </div>
            </div>

            {/* Design Controls Overlay (Placeholder) */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="p-2 bg-white/90 backdrop-blur rounded-lg shadow-sm hover:shadow-md transition-all text-gray-600 hover:text-blue-600">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-2 bg-white/90 backdrop-blur rounded-lg shadow-sm hover:shadow-md transition-all text-gray-600 hover:text-blue-600">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Properties Panel */}
        <div className="w-full lg:w-80 bg-white border-l border-gray-100 p-6 flex flex-col h-full overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Customize</h3>
            <p className="text-sm text-gray-500">Adjust your design details</p>
          </div>

          <div className="space-y-6">
            {/* Color Picker Demo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base Color
              </label>
              <div className="flex gap-2">
                {["bg-white", "bg-black", "bg-blue-500", "bg-red-500"].map(
                  (color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border border-gray-200 shadow-sm ${color} hover:scale-110 transition-transform`}
                    />
                  )
                )}
              </div>
            </div>

            <div className="border-t border-gray-100 my-4" />

            {/* AI Generator Placeholder */}
            <div className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                  New
                </span>
                <h4 className="text-sm font-semibold text-gray-900">
                  AI Generator
                </h4>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Create unique designs with a simple prompt.
              </p>
              <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                Try AI Magic
              </button>
            </div>
          </div>

          <div className="mt-auto pt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500">Total</span>
              <span className="text-xl font-bold text-gray-900">$29.00</span>
            </div>
            <button className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl shadow-lg shadow-gray-900/10 transition-all hover:-translate-y-0.5">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockupZone;
