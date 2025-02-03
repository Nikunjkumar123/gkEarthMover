import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]); // Store projects directly
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4040/admin/v1/projects/all"
      );
      if (response.data && response.data.msg) {
        setProjects(response.data.msg);
      } else {
        setProjects([]);
      }
    } catch (err) {
      setError(`Error fetching projects: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Navigate to Edit Page
  const handleEdit = (projectId) => {
    navigate(`/edit-project/${projectId}`);
  };

  // Handle Delete Project
  const handleDelete = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await axios.delete(
          `http://localhost:4040/admin/v1/projects/all/${projectId}`
        );
        if (response.status === 200) {
          // Update the projects state
          setProjects((prevProjects) =>
            prevProjects.filter((project) => project._id !== projectId)
          );
        }
      } catch (err) {
        setError(`Error deleting project: ${err.message}`);
      }
    }
  };

  let counter = 1; // Initialize counter
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Projects</h2>
      <Link to="/addproject" className="btn btn-primary mb-3">
        + Add Project
      </Link>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Image</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map((project) => (
              <tr key={project._id}>
                <td>{counter++}</td>
                <td>{project.description}</td>
                <td>
                  <img
                    src={project.image}
                    alt={project.description}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </td>
                <td>{project.status}</td>
                <td>
                  <div className="d-flex gap-2">
                    {/* <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleEdit(project._id)}
                    >
                      <i className="bi bi-pencil"></i> Edit
                    </button> */}
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(project._id)}
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No Projects available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
