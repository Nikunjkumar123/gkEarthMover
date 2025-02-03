import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const SubEquipment = () => {
  const { categoryId, subCategoryId } = useParams(); // Extract categoryId and subCategoryId from the URL

  const [equipmentData, setEquipmentData] = useState([]); // State to hold the dynamic equipment data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  // Fetch equipment data when categoryId or subCategoryId changes
  useEffect(() => {
    const fetchEquipmentData = async () => {
      try {
        const response = await fetch(
          `https://api.dushadinfra.com/admin/v1/categories/${categoryId}/subcategories/${subCategoryId}/products`
        );
        const data = await response.json();

        if (data && data.products) {
          setEquipmentData(data.products); // Correctly set equipmentData from the 'products' key
        }
      } catch (error) {
        console.error("Error fetching equipment data:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to fetch equipment data. Please try again later.",
          icon: "error",
        });
      }
    };

    if (categoryId && subCategoryId) {
      fetchEquipmentData(); // Only fetch data if both categoryId and subCategoryId are available
    }
  }, [categoryId, subCategoryId]); // Trigger fetch when either categoryId or subCategoryId changes

  const openModal = (equipment) => {
    setSelectedEquipment(equipment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEquipment(null);
    setIsModalOpen(false);
  };

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    // Combine the form data with the selected equipment data
    const combinedData = {
      ...formData, // Spread the form data from react-hook-form
      equipmentName: selectedEquipment.MachineName, // Directly include equipmentName
      company: selectedEquipment.CompanyName, // Directly include company
    };
  
    try {
      // Log the combined data for debugging
      // console.log("Form Data:", combinedData);
  
      const response = await fetch(
        `http://localhost:4040/admin/v1/user/contact`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(combinedData),
        }
      );
  
      // Check if response is ok (status 200-299)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const res = await response.json(); // Parse the response JSON
  
      // Log the response to check its structure
      // console.log("Server Response:", res.msg);
  
      if (res.msg == 'Equipment details added successfully') {
        Swal.fire({
          title: "Good job!",
          text: "Inquiry sent successfully!",
          icon: "success",
        });
        reset(); // Reset the form after successful submission
        closeModal(); // Close the modal after submission
      } else {
        // If the response does not have success, display an error message
        Swal.fire({
          title: "Oops!",
          text: res.message || "Something went wrong. Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      // Handle network errors or any other issues
      console.error("Error during submission:", error);
      Swal.fire({
        title: "Error",
        text: error.message || "Network error. Please try again later.",
        icon: "error",
      });
    }
  };
  
  return (
    <>
      <div className="container RentalEquipment">
        <div className="row">
          <div className="equipment-title">
            <h3>More Model</h3>
          </div>

          {/* Equipment Cards */}
          <div className="row m-0 p-0">
            {equipmentData.length > 0 ? (
              equipmentData.map((equipment) => (
                <div key={equipment._id} className="col-lg-4 col-md-6">
                  <div className="card equipment-card">
                    <div className="equipment-img">
                      <img
                        src={equipment.Image[0]} // Assuming Image is an array, using the first item
                        className="card-img-top"
                        alt={equipment.MachineName}
                      />
                    </div>
                    <div className="card-body">
                      <h2 className="card-title">{equipment.MachineName}</h2>
                      <hr />
                      <h4 className="delivery-info">{equipment.CompanyName}</h4>
                      {/* Handle specs if it's an array */}
                      <ul className="specs-list">
                        {equipment.specs &&
                          equipment.specs.map((spec, index) => (
                            <h5 key={index}>{spec}</h5>
                          ))}
                      </ul>
                    </div>
                    <div className="card-footer">
                      <button
                        className="reserve-btn"
                        onClick={() => openModal(equipment)} // Open modal with selected equipment data
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading equipment data...</p> // Loading message while data is being fetched
            )}
          </div>
        </div>
      </div>

      {/* Modal (Render only when modal is open) */}
      {isModalOpen && selectedEquipment && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing on inner click
          >
            <h2>Reserve Equipment</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Equipment Name:</label>
                <input
                  type="text"
                  value={selectedEquipment.MachineName}
                  {...register("equipmentName")}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Company Name:</label>
                <input
                  type="text"
                  value={selectedEquipment.CompanyName}
                  {...register("company")}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
                <span className="text-danger">
                  {errors.name && <p>{errors.name.message}</p>}
                </span>
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="number"
                  placeholder="Phone Number"
                  {...register("phone", {
                    required: "Phone number is required",
                    minLength: {
                      value: 10,
                      message: "Phone number must be 10 digits",
                    },
                    maxLength: {
                      value: 10,
                      message: "Phone number cannot exceed 10 digits",
                    },
                  })}
                />
                <span className="text-danger">
                  {errors.phone && <p>{errors.phone.message}</p>}
                </span>
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                <span className="text-danger">
                  {errors.email && <p>{errors.email.message}</p>}
                </span>
              </div>
              <div className="form-group">
                <label>Address:</label>
                <textarea
                  placeholder="Address"
                  {...register("address", {
                    required: "Location is required",
                  })}
                />
                <span className="text-danger">
                  {errors.address && <p>{errors.address.message}</p>}
                </span>
              </div>
              <div className="form-actions">
                <button type="button" onClick={closeModal}>
                  Close
                </button>
                <button type="submit">Confirm Reservation</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SubEquipment;
