import React, { useState, useEffect } from "react";
import "./Equipment.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Equipment = () => {
  const [selectedTab, setSelectedTab] = useState("sew"); // Default category
  const [categoryId, setCatId] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // Fetch categories from API
  const getingCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4040/admin/v1/categories"
      );
      setCategories(response.data.categories);
      // Initially show subCategories for the default category (first one in the list)
      if (response.data.categories.length > 0) {
        setSubCategories(response.data.categories[0].subCategories);
      }
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    getingCategory();
  }, []);

  useEffect(() => {
    const selectedCategory = categories.find(
      (category) => category.category === selectedTab
    );
    if (selectedCategory) {
      setSubCategories(selectedCategory.subCategories);
      setCatId(selectedCategory._id);
    }
  }, [selectedTab, categories]);

  const navigate = useNavigate();

  return (
    <div className="container RentalEquipment">
      <div className="row">
        <div className="equipment-title">
          <h3>Awesome Equipment</h3>
          <h1>Featured Rental Equipment</h1>
          <p>
            Our commitment to quality ensures that every piece of equipment we
            offer is maintained to the highest standards, delivering the
            performance needed on-site.
          </p>
        </div>

        {/* Tabs */}
        <div className="tab-section">
          {categories.map((tab) => (
            <button
              key={tab._id}
              className={`tab-btn ${
                selectedTab === tab.category ? "active" : ""
              }`}
              onClick={() => {
                setSelectedTab(tab.category);
              }}
            >
              {tab.category}
            </button>
          ))}
        </div>

        {/* SubCategory Cards */}

        <div className="row m-0 p-0">
          {subCategories.length > 0 ? (
            subCategories.map((subCategory) => (
              <div key={subCategory._id} className="col-lg-4 col-md-6">
                <div className="card equipment-card">
                  <div className="equipment-img">
                    <img
                      src={subCategory.Image}
                      className="card-img-top"
                      alt={subCategory.MachineName}
                    />
                  </div>
                  <div className="card-body">
                    <h2 className="card-title">{subCategory.Category}</h2>
                    <hr />
                    <h4 className="delivery-info">{subCategory.CompanyName}</h4>
                  </div>
                  <div className="card-footer">
                    <Link to={`/subEquipment/${categoryId}/${subCategory._id}`}>
                      <button className="reserve-btn">View All</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No subcategories available for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Equipment;
