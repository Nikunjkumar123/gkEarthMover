import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./Component/Navbar/Navbar";
// import Dashboard from "./Pages/Dashboard/dashboard";
import Login from "./Pages/Login/Login";
import "./App.css";

import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import Sidebar from "./Component/Sidebar/Sidebar";
import Categories from "./Pages/Categories/Categories";
import Subcategories from "./Pages/SubCategories/Subcategories";
import Product from "./Pages/Product/Product";
import Contact from "./Pages/ContactUs/Contact";
import AddCategories from "./Pages/Categories/AddCategories";
import EditCategories from "./Pages/Categories/EditCategories";
import EditsubCategories from "./Pages/SubCategories/EditsubCategories.jsx";
import EditsubCategoriesProduc from "./Pages/Product/EditsubCategoriesProduc.jsx";
import AddSubCategories from "./Pages/SubCategories/AddSubCategories";
import AddProduct from "./Pages/Product/AddProduct";
import ContactEquipment from "./Pages/ContactEquipment/ContactEquipment";
import Projects from "./Pages/Project/Projects.jsx";
import Addproject from "./Pages/Project/Addproject.jsx";

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className={`app-container ${isLoginPage ? "login-page" : ""}`}>
      {!isLoginPage && <Sidebar />}
      <div className="main-container">
        {!isLoginPage && <Topbar />}

        {/* Center Content */}
        <div className="content-area">
          <Routes>
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/categories" element={<Categories />} />
            <Route path="/add-categories" element={<AddCategories />} />
            <Route path="/edit-categories/:id" element={<EditCategories />} />
            <Route path="/sub-categories" element={<Subcategories />} />
            <Route path="/add-subcategories" element={<AddSubCategories />} />
            <Route
              path="/edit-subcategories/:categoryId/:subCategoryId"
              element={<EditsubCategories />}
            />

            <Route
              path="/edit-subcategoriesP/:categoryId/:subCategoryId/:producId"
              element={<EditsubCategoriesProduc />}
            />

            <Route path="/products" element={<Product />} />
            <Route path="/add-products" element={<AddProduct />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/contact-equipment" element={<ContactEquipment />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/addproject" element={<Addproject />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper;
