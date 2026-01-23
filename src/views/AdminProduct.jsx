import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Upload,
  Tag,
  DollarSign,
  FileText,
  Type,
} from "lucide-react";

export default function AdminProduct() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get product ID from URL if editing
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    tag: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch product data if editing
  useEffect(() => {
    if (isEditing) {
      const fetchProduct = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/products`,
          );
          const products = await response.json();
          const product = products.find((p) => p._id === id); // Simple find from list or fetch specific

          if (product) {
            setFormData({
              name: product.name,
              description: product.description,
              price: product.price,
              imageUrl: product.imageUrl,
              tag: product.tag || "",
            });
          }
        } catch (error) {
          console.error("Error fetching product:", error);
          alert("Failed to load product details");
        } finally {
          setIsLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized! Please login as admin.");
      return;
    }

    try {
      const url = isEditing
        ? `${import.meta.env.VITE_API_URL}/api/admin/products/${id}`
        : `${import.meta.env.VITE_API_URL}/api/admin/products`;

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(
          isEditing
            ? "Product Updated Successfully!"
            : "Product Created Successfully!",
        );
        navigate("/admin/manage-products"); // Redirect to list after success
      } else {
        alert("Failed to save product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to server");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading product data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/admin/manage-products"
            className="p-2 rounded-full bg-white hover:bg-gray-100 border border-gray-200 transition-colors text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {isEditing ? "Edit Product" : "Add New Product"}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {isEditing
                ? "Update existing product details"
                : "Create a new item for your inventory"}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Type className="w-4 h-4" /> Product Name
              </label>
              <input
                name="name"
                placeholder="Ex. Premium Cotton T-Shirt"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-400"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Description
              </label>
              <textarea
                name="description"
                placeholder="Detailed description of the product..."
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-400 resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Price (THB)
                </label>
                <input
                  name="price"
                  type="number"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-400"
                  required
                />
              </div>

              {/* Tag */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4" /> Tag (Optional)
                </label>
                <input
                  name="tag"
                  placeholder="Ex. Best Seller, New Arrival"
                  value={formData.tag}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-400"
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Upload className="w-4 h-4" /> Product Image
              </label>

              {/* File Upload Input */}
              <div className="mb-4">
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg border border-gray-300 transition-colors flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    <span>Choose File</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;

                        const formData = new FormData();
                        formData.append("image", file);

                        const token = localStorage.getItem("token"); // Get token here
                        try {
                          const response = await fetch(
                            `${import.meta.env.VITE_API_URL}/api/upload`,
                            {
                              method: "POST",
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                              body: formData,
                            },
                          );
                          const data = await response.json();
                          if (data.imageUrl) {
                            setFormData((prev) => ({
                              ...prev,
                              imageUrl: data.imageUrl,
                            }));
                          }
                        } catch (error) {
                          console.error("Upload failed", error);
                          alert("Upload failed");
                        }
                      }}
                    />
                  </label>
                  <span className="text-gray-400 text-sm">
                    or paste URL below
                  </span>
                </div>
              </div>

              <input
                name="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-400"
                required
              />
              {formData.imageUrl && (
                <div className="mt-4 p-2 bg-gray-50 rounded-xl border border-gray-200 w-fit">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="h-32 rounded-lg object-cover"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="w-5 h-5" />{" "}
                    {isEditing ? "Update Product" : "Create Product"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
