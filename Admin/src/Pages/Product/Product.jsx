import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]); // State for storing products
  const navigate = useNavigate();

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://api.dushadinfra.com/admin/v1/categories"
      );
      const products = response.data.categories.flatMap((category) =>
        category.subCategories.flatMap((subCategory) =>
          (subCategory.products || []).map((product) => ({
            ...product,
            categoryId: category._id,
            categoryName: category.category,
            subCategoryId: subCategory._id,
            subCategoryName: subCategory.Category,
          }))
        )
      );
      setProducts(products); // Update state with fetched products
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts(); // Call fetchProducts on component mount
  }, []);

  // Action handlers
  const handleActive = (id) => {
    // console.log(`Product ${id} activated!`);
  };

  const handleEdit = (categoryId, subCategoryId, productId) => {
    navigate(
      `/edit-subcategoriesP/${categoryId}/${subCategoryId}/${productId}`
    );
  };

  const handleDelete = async (product) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const deleteUrl = `https://api.dushadinfra.com/admin/v1/edit-update/prod/${product.categoryId}/${product.subCategoryId}/${product._id}`;
        await axios.delete(deleteUrl);
        alert("Product deleted successfully!");
        // Refresh the product list after deletion
        setProducts(products.filter((p) => p._id !== product._id));
      } catch (error) {
        console.error("Error deleting product:", error.message);
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Products</h2>
        <Link to={"/add-products"} className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i> Add Product
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-hover table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>Company Name</th>
              <th>Machine Name</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.categoryName}</td>
                  <td>{product.subCategoryName}</td>
                  <td>{product.CompanyName}</td>
                  <td>{product.MachineName}</td>
                  <td>
                    <img
                      src={product.Image[0] || product.Image}
                      alt={product.MachineName}
                      className="rounded"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td className="d-flex gap-2">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleActive(product._id)}
                    >
                      <i className="bi bi-check-circle"></i> Active
                    </button>
                    {/* <button
                      className="btn btn-info btn-sm"
                      onClick={() =>
                        handleEdit(product.categoryId, product.subCategoryId, product._id)
                      }
                    >
                      <i className="bi bi-pencil-square"></i> Edit
                    </button> */}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(product)}
                    >
                      <i className="bi bi-trash3"></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;
