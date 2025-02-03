import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactEquipment = () => {
  // State to hold the fetched equipment details
  const [equipmentDetails, setEquipmentDetails] = useState([]);

  // Fetch equipment data when the component mounts
  useEffect(() => {
    const fetchEquipmentDetails = async () => {
      try {
        const response = await axios.get(
          "https://api.dushadinfra.com/admin/v1/user/contact"
        );
        // Update state with fetched data
        setEquipmentDetails(response.data.all || []);
      } catch (error) {
        console.error("Error fetching equipment details:", error);
      }
    };
    fetchEquipmentDetails();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Handle Edit functionality (You can add actual logic here)
  const handleEdit = (id) => {
    // console.log(`Edit equipment with ID: ${id}`);
    // Add your logic for editing an equipment entry
  };

  // Handle Delete functionality
  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this equipment entry?")
    ) {
      try {
        // Call the API to delete the equipment using DELETE method
        const response = await axios.delete(
          `https://api.dushadinfra.com/admin/v1/enquiry/up-ed/${id}`
        );

        // Check if the deletion was successful
        if (response.status === 200) {
          // Update the UI by removing the deleted item from the state
          setEquipmentDetails((prevDetails) =>
            prevDetails.filter((equipment) => equipment._id !== id)
          );
          alert("Equipment deleted successfully.");
        } else {
          alert("Failed to delete the equipment.");
        }
      } catch (error) {
        console.error("Error deleting equipment:", error);
        alert("There was an error deleting the equipment.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Equipment Details</h2>
        {/* <button className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i> Add Equipment
        </button> */}
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-hover mt-4">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Equipment Name</th>
              <th>Company Name</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {equipmentDetails.length > 0 ? (
              equipmentDetails.map((equipment, index) => (
                <tr key={equipment._id}>
                  <td>{index + 1}</td> {/* Display row number (index + 1) */}
                  <td className="fw-semibold">{equipment.equipmentName}</td>
                  <td>{equipment.company}</td>
                  <td>{equipment.name}</td>
                  <td>{equipment.phone}</td>
                  <td>{equipment.email}</td>
                  <td>{equipment.address}</td>
                  <td className="d-flex gap-2">
                    {/* <button
                      className="btn btn-info btn-sm"
                      onClick={() => handleEdit(equipment._id)}
                    >
                      <i className="bi bi-pencil-square"></i> Edit
                    </button> */}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        // console.log(equipment)
                        handleDelete(equipment._id);
                      }}
                    >
                      <i className="bi bi-trash3"></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No equipment details available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactEquipment;
