import React, { useEffect, useState } from "react";

const Upcoming = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Fetch data from the API
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://api.dushadinfra.com/admin/v1/project/upcoming"
        );
        const data = await response.json();
        if (response.ok) {
          setProjects(data.msg); // Set the projects from the API response
          setLoading(false);
        } else {
          setError(data.msg || "Failed to fetch projects");
          setLoading(false);
        }
      } catch (err) {
        setError("Something went wrong");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Function to handle image click and open modal
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  return (
    <>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="hero">
              <h1>UPCOMING PROJECTS</h1>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container p-4 my-4">
          <div className="row">
            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
            {!loading &&
              !error &&
              projects.map((project) => (
                <div className="col-6 col-md-4" key={project._id}>
                  <div className="projectImage">
                    <img
                      src={project.image}
                      alt="Project"
                      className="img-fluid"
                      onClick={() => openModal(project.image)}
                    />
                    <h5 className="text-center text-uppercase">
                      {project.description}
                    </h5>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div
            className="modal show"
            style={{ display: "block" }}
            onClick={closeModal}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <img
                    src={selectedImage}
                    alt="Selected Project"
                    className="img-fluid"
                  />
                </div>
                <button type="button" className="close" onClick={closeModal}>
                  &times;
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Upcoming;
