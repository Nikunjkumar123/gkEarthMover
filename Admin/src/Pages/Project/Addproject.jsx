import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const [project, setProject] = useState({
    description: "",
    image: null, // Store image as a file object
    status: "upcoming",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject({
      ...project,
      [name]: value,
    });
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first file
    if (file) {
      setProject({
        ...project,
        image: file, // Set the image file to the state
      });
    }
  };

  // Handle add project
  const handleAddProject = async (e) => {
    e.preventDefault();

    // Form validation for image and description
    if (!project.image) {
      setError("Image is required.");
      return;
    }

    const formData = new FormData();
    formData.append("description", project.description);
    formData.append("image", project.image);
    formData.append("status", project.status);

    try {
      const response = await axios.post(
        "https://api.dushadinfra.com/admin/v1/projects/all",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file upload
          },
        }
      );
      if (response.status === 201) {
        setSuccess("Project added successfully!");
        setProject({
          description: "",
          image: null,
          status: "upcoming",
        });
        setTimeout(() => {
          navigate("/projects");
        }, 2000); // Navigate to projects list after 2 seconds
      }
    } catch (err) {
      setError(`Error adding project: ${err.message}`);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Add New Project</h2>

      {/* Success Message */}
      {success && <div className="alert alert-success">{success}</div>}
      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleAddProject}>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={project.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            name="image"
            accept="image/*" // Restrict file types to images only
            onChange={handleImageChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-control"
            name="status"
            value={project.status}
            onChange={handleInputChange}
            required
          >
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Project
        </button>
      </form>
    </div>
  );
};

export default AddProject;
