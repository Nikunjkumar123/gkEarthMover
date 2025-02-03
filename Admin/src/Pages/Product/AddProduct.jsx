import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    category: '',
    subCategory: '',
    companyName: '',
    image: null,
    isMostSelling: false,
    description: '',
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4040/admin/v1/categories');
        if (response.data && Array.isArray(response.data.categories)) {
          setCategories(response.data.categories); // Populate categories
        } else {
          console.error('Invalid categories response:', response.data);
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  // Fetch subcategories based on selected category
  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:4040/admin/v1/categories/${categoryId}/subcategories`
      );

      if (response.data && Array.isArray(response.data.subCategories)) {
        setSubCategories(response.data.subCategories); // Populate subcategories
      } else {
        console.error('Invalid subcategories response:', response.data);
        setSubCategories([]);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setSubCategories([]);
    }
  };

  // Handle category change to fetch subcategories
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setFormData({ ...formData, category: categoryId, subCategory: '' });
    fetchSubCategories(categoryId); // Fetch subcategories when category changes
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append('Category', formData.category);
      productData.append('subCategory', formData.subCategory);
      productData.append('CompanyName', formData.companyName);
      productData.append('MachineName', formData.machineName);
      productData.append('image', formData.image);
      productData.append('isMostSelling', formData.isMostSelling);
      productData.append('description', formData.description);

      // Sending POST request to the backend
      await axios.post(
        `http://localhost:4040/admin/v1/categories/${formData.category}/subcategories/${formData.subCategory}/products`,
        productData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      alert('Product added successfully!');
      // Reset form after submission
      setFormData({
        category: '',
        subCategory: '',
        companyName: '',
        machineName: '',
        image: null,
        isMostSelling: false,
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product!');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Product Form</h3>
      <form onSubmit={handleSubmit}>
        {/* Category Dropdown */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Categories</label>
          <select
            id="category"
            name="category"
            className="form-select"
            value={formData.category}
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>{category.category}</option>
            ))}
          </select>
        </div>

        {/* Subcategory Dropdown */}
        <div className="mb-3">
          <label htmlFor="subCategory" className="form-label">Subcategories</label>
          <select
            id="subCategory"
            name="subCategory"
            className="form-select"
            value={formData.subCategory}
            onChange={handleChange}
            disabled={!formData.category} // Disable until category is selected
          >
            <option value="">Select Subcategory</option>
            {subCategories.length > 0 ? (
              subCategories.map((subCategory) => (
                <option key={subCategory._id} value={subCategory._id}>
                  {subCategory.Category}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No subcategories available
              </option>
            )}
          </select>
        </div>

        {/* Other Fields */}
        <div className="mb-3">
          <label htmlFor="machineName" className="form-label">Machine Name</label>
          <input
            type="text"
            id="machineName"
            name="machineName"
            className="form-control"
            value={formData.machineName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="companyName" className="form-label">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            className="form-control"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            id="isMostSelling"
            name="isMostSelling"
            className="form-check-input"
            checked={formData.isMostSelling}
            onChange={handleChange}
          />
          <label htmlFor="isMostSelling" className="form-check-label">Most Selling Products</label>
        </div>

        {/* <div className="mb-3">
          <label htmlFor="description" className="form-label">Product Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div> */}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
