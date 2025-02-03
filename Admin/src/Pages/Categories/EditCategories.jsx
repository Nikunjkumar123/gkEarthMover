import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditCategory = () => {
  const { id } = useParams(); // Get the category ID from the URL
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");
  // const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch the category data by ID
  const getCategory = async () => {
    try {
      const response = await axios.get(
        `https://api.dushadinfra.com/admin/v1/categories/single/${id}`
      );
      setCategoryName(response.data.data.category);
      // setImage(response.data.data.image);
      // console.log(response.data.data.image)
    } catch (err) {
      setError("Error fetching category data.");
    }
  };

  useEffect(() => {
    getCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare the updated data
    const formData = new FormData();
    formData.append("category", categoryName);
    // if (image) {
    //   formData.append("image", image);
    // }

    try {
      const response = await axios.patch(
        `https://api.dushadinfra.com/admin/v1/edit-update/cat/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setLoading(false);
      alert("Category updated successfully!");
      navigate("/categories"); // Navigate back to categories list
    } catch (err) {
      setLoading(false);
      setError("Error updating category.");
    }
  };

  return (
    <div className="container mt-2">
      <h2>Edit Category</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            className="form-control"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        {/* <div className="mb-3">
          <label htmlFor="image" className="form-label">Category Image</label>
          <input
            type="file"
            id="image"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div> */}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Updating..." : "Update Category"}
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
