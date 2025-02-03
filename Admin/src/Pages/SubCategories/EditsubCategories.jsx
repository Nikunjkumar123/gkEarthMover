import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditSubCategory = () => {
  const [subCategory, setSubCategory] = useState({
    Category: "",
    CompanyName: "",
    Image: null,
  });
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { categoryId, subCategoryId } = useParams();
  const navigate = useNavigate();

  // Fetch subcategory details
  useEffect(() => {
    const fetchSubCategory = async () => {
      if (!categoryId || !subCategoryId) {
        setError("Invalid category or subcategory ID");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:4040/admin/v1/categories/edit-update/${categoryId}/${subCategoryId}`
        );

        const subCategoryData = response.data;

        setSubCategory({
          Category: subCategoryData.Category, // Use the data fetched from the API
          CompanyName: subCategoryData.CompanyName || "",
          Image: subCategoryData.Image || null,
        });

        setImagePreview(subCategoryData.Image || "");
      } catch (err) {
        console.error(err);
        setError("Error fetching subcategory details");
      }
    };

    fetchSubCategory();
  }, [categoryId, subCategoryId]);

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSubCategory((prev) => ({ ...prev, Image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if ( !subCategory.CompanyName) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");

    // Create FormData for the request
    const formData = new FormData();
    formData.append("Category", subCategory.Category); // Use category name here
    // formData.append("MachineName", subCategory.MachineName);
    formData.append("CompanyName", subCategory.CompanyName);

    if (subCategory.Image instanceof File) {
      formData.append("Image", subCategory.Image);
    }

    try {
      const response = await axios.patch(
        `http://localhost:4040/admin/v1/categories/edit-update/${categoryId}/${subCategoryId}`,
        formData
      );

      if (response.status === 200) {
        alert("Subcategory updated successfully!");
        navigate("/sub-categories");
      }
    } catch (err) {
      console.error(err);
      setError("Error updating subcategory");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Edit Subcategory</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Subcategory Name</label>
          <input
            type="text"
            className="form-control"
            value={subCategory.Category}
            onChange={(e) =>
              setSubCategory((prev) => ({ ...prev, Category: e.target.value }))
            }
            required
          />
        </div>
        {/* <div className="mb-3">
          <label className="form-label">Machine Name</label>
          <input
            type="text"
            className="form-control"
            value={subCategory.MachineName}
            onChange={(e) =>
              setSubCategory((prev) => ({ ...prev, MachineName: e.target.value }))
            }
            required
          />
        </div> */}
        <div className="mb-3">
          <label className="form-label">Company Name</label>
          <input
            type="text"
            className="form-control"
            value={subCategory.CompanyName}
            onChange={(e) =>
              setSubCategory((prev) => ({ ...prev, CompanyName: e.target.value }))
            }
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
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
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Updating..." : "Update Subcategory"}
        </button>
      </form>
    </div>
  );
};

export default EditSubCategory;
