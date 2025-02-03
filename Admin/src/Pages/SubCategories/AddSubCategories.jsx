import React, { useState, useEffect } from "react";
import axios from "axios";

const AddSubCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [companyName, setCompanyName] = useState(""); // Added company name state
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://api.dushadinfra.com/admin/v1/categories"
        );
        setCategories(response.data.categories); // Assuming your API returns categories
      } catch (err) {
        setError("Error fetching categories");
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory || !subCategoryName || !companyName || !image) {
      setError("Please fill all fields");
      return;
    }
    setLoading(true);
    setError(""); // Clear any previous errors

    const formData = new FormData();
    formData.append("Category", subCategoryName);
    formData.append("CompanyName", companyName);
    formData.append("image", image);

    try {
      // Send POST request to add subcategory under selected category
      await axios.post(
        `https://api.dushadinfra.com/admin/v1/categories/${selectedCategory}/subcategories`,
        formData
      );

      setLoading(false);
      alert("Subcategory added successfully!");
      // Clear form
      setSubCategoryName("");
      setCompanyName(""); // Reset company name state
      setImage(null);
      setImagePreview("");
    } catch (err) {
      setLoading(false);
      setError("Error adding subcategory");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">Add Sub Categories</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Category Dropdown */}
            <div className="mb-3">
              <label htmlFor="categorySelect" className="form-label">
                Select Category
              </label>
              <select
                className="form-select"
                id="categorySelect"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
              >
                <option value="">-- Select a Category --</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.category}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Name Input */}
            <div className="mb-3">
              <label htmlFor="subcategoryName" className="form-label">
                Subcategory Name
              </label>
              <input
                type="text"
                className="form-control"
                id="subcategoryName"
                placeholder="Enter subcategory name"
                value={subCategoryName}
                onChange={(e) => setSubCategoryName(e.target.value)}
                required
              />
            </div>

            {/* Company Name Input */}
            <div className="mb-3">
              <label htmlFor="companyName" className="form-label">
                Company Name
              </label>
              <input
                type="text"
                className="form-control"
                id="companyName"
                placeholder="Enter company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>

            {/* Image Upload */}
            <div className="mb-3">
              <label htmlFor="categoryImage" className="form-label">
                Upload Image
              </label>
              <input
                type="file"
                className="form-control"
                id="categoryImage"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mb-3">
                <label className="form-label">Image Preview</label>
                <div className="border p-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Subcategory"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSubCategories;
