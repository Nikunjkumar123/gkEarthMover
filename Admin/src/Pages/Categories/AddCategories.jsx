import React, { useState } from "react";
import axios from "axios";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!category.trim()) {
      setError("Category name is required.");
      setSuccess(""); // Clear any success messages
      return;
    }

    const formData = new FormData();
    formData.append("category", category);

    try {
      // Sending form data via a POST request
      const response = await axios.post("http://api.dushadinfra.com/admin/v1/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setCategory(""); // Clear category name input
      setError(""); // Clear any error messages
      setSuccess("Category added successfully!"); // Show success message

      // console.log("Response:", response.data);
    } catch (err) {
      // Set error message based on the error type
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setSuccess(""); // Clear success message
    }
  };

  return (
    <div className="container mt-2">
      <div className="card shadow">
        <div className="card-header bg-light">
          <h4>Add Category</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Category Name Input */}
            <div className="mb-3">
              <label htmlFor="categoryName" className="form-label">
                Category Name
              </label>
              <input
                type="text"
                className="form-control"
                id="categoryName"
                placeholder="Enter category name"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            {/* Display success or error messages */}
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100">
              Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
