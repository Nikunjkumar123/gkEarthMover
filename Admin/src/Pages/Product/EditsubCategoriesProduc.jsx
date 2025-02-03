import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProduct = ({ categoryId, subCategoryId, productId }) => {
  const [formData, setFormData] = useState({
    category: categoryId || "",
    subCategory: subCategoryId || "",
    companyName: "",
    image: null,
    isMostSelling: false,
    description: "",
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch categories, subcategories, and product details
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch categories
        const categoriesResponse = await axios.get(
          "https://api.dushadinfra.com/admin/v1/categories"
        );
        setCategories(categoriesResponse.data.categories || []);

        // Fetch product details
        const productResponse = await axios.get(
          `https://api.dushadinfra.com/admin/v1/edit-update/prod/${categoryId}/${subCategoryId}/${productId}`
        );
        const product = productResponse.data;

        // Set form data
        setFormData({
          category: product.category || categoryId,
          subCategory: product.subCategory || subCategoryId,
          companyName: product.companyName || "",
          image: null,
          isMostSelling: product.isMostSelling || false,
          description: product.description || "",
        });

        // Fetch subcategories for the selected category
        if (product.category) {
          const subCategoriesResponse = await axios.get(
            `https://api.dushadinfra.com/admin/v1/categories/${product.category}/subcategories`
          );
          setSubCategories(subCategoriesResponse.data.subCategories || []);
        }

        // Fetch products for the selected subcategory
        if (product.subCategory) {
          const productsResponse = await axios.get(
            `https://api.dushadinfra.com/admin/v1/subcategories/${product.subCategory}/products`
          );
          setProducts(productsResponse.data.products || []);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categoryId, subCategoryId, productId]);

  // Handle category change
  const handleCategoryChange = async (e) => {
    const selectedCategoryId = e.target.value;
    setFormData({
      ...formData,
      category: selectedCategoryId,
      subCategory: "",
      productName: "",
    });

    try {
      const response = await axios.get(
        `https://api.dushadinfra.com/admin/v1/categories/${selectedCategoryId}/subcategories`
      );
      setSubCategories(response.data.subCategories || []);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setSubCategories([]);
    }
  };

  // Handle subcategory change
  const handleSubCategoryChange = async (e) => {
    const selectedSubCategoryId = e.target.value;
    setFormData({
      ...formData,
      subCategory: selectedSubCategoryId,
      productName: "",
    });

    try {
      const response = await axios.get(
        `https://api.dushadinfra.com/admin/v1/subcategories/${selectedSubCategoryId}/products`
      );
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        productData.append(key, value);
      });

      await axios.put(
        `https://api.dushadinfra.com/admin/v1/edit-update/prod/${categoryId}/${subCategoryId}/${productId}`,
        productData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Product updated successfully!");
      navigate("/products"); // Redirect to products list
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product!");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h3>Edit Product</h3>
      <form onSubmit={handleSubmit}>
        {/* Category Dropdown */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Categories
          </label>
          <select
            id="category"
            name="category"
            className="form-select"
            value={formData.category}
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Dropdown */}
        <div className="mb-3">
          <label htmlFor="subCategory" className="form-label">
            Subcategories
          </label>
          <select
            id="subCategory"
            name="subCategory"
            className="form-select"
            value={formData.subCategory}
            onChange={handleSubCategoryChange}
            disabled={!formData.category}
          >
            <option value="">Select Subcategory</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory._id} value={subCategory._id}>
                {subCategory.subCategory}
              </option>
            ))}
          </select>
        </div>

        {/* Form Fields */}
        {/* Add productName, machineName, companyName, image, isMostSelling, description */}
        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
