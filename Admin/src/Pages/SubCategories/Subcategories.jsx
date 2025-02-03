import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Subcategories = () => {
  const [categories, setCategories] = useState([]); // Fetch categories and subcategories together
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch categories and subcategories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://api.dushadinfra.com/admin/v1/categories"
      );
      setCategories(response.data.categories);
    } catch (err) {
      setError(`Error fetching categories: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (categoryId, subCategoryId) => {
    navigate(`/edit-subcategories/${categoryId}/${subCategoryId}`);
  };

  const handleDelete = async (categoryId, subCategoryId) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        const response = await axios.delete(
          `https://api.dushadinfra.com/admin/v1/categories/edit-update/${categoryId}/${subCategoryId}`
        );
        if (response.status === 200) {
          // Update the local state to remove the deleted subcategory
          setCategories((prevCategories) =>
            prevCategories.map((category) => ({
              ...category,
              subCategories: category.subCategories.filter(
                (subCategory) => subCategory._id !== subCategoryId
              ),
            }))
          );
        }
      } catch (err) {
        console.error("Error deleting subcategory:", err);
        setError(`Error deleting subcategory: ${err.message}`);
      }
    }
  };

  let counter = 1; // Initialize counter

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Subcategories</h2>
      <Link to="/add-subcategories" className="btn btn-primary mb-3">
        + Add Sub Categories
      </Link>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Sub Category</th>
            <th>Company Name</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.flatMap((category) =>
              category.subCategories.map((subCategory) => {
                return (
                  <tr key={subCategory._id}>
                    <td>{counter++}</td> {/* Continuous counter */}
                    <td>{category.category}</td> {/* Display Category Name */}
                    <td>{subCategory.Category}</td>{" "}
                    {/* Display Sub Category Name */}
                    <td>{subCategory.CompanyName}</td>{" "}
                    {/* Display Company Name */}
                    <td>
                      <img
                        src={subCategory.Image}
                        alt={subCategory.Category}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() =>
                            handleEdit(category._id, subCategory._id)
                          }
                        >
                          <i className="bi bi-pencil-square"></i> Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() =>
                            handleDelete(category._id, subCategory._id)
                          }
                        >
                          <i className="bi bi-trash"></i> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No subcategories available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Subcategories;
