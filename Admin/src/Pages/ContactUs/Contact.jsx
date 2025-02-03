import React, { useEffect, useState } from "react";
import axios from "axios";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch contacts from the API
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          "http://api.dushadinfra.com/admin/v1/user/contact-us"
        );
        setContacts(response.data.contacts); // Assuming the API returns an array of contacts
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch contacts. Please try again later.");
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleEdit = (id) => {
    // console.log(`Edit contact with ID: ${id}`);
    // Add your logic for editing a contact
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await axios.delete(
          `http://api.dushadinfra.com/admin/v1/user/up-ed/contact/${id}`
        );
        setContacts(contacts.filter((contact) => contact._id !== id));
        // console.log(`Deleted contact with ID: ${id}`);
      } catch (err) {
        console.error(
          "Failed to delete contact:",
          err.response?.data?.msg || err.message
        );
      }
    }
  };

  if (loading) return <p>Loading contacts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Contact Us</h2>
        {/* <button className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i> Add Contact
        </button> */}
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-hover mt-4">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Message</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact._id}>
                <td>{index + 1}</td>
                <td className="fw-semibold">{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone || "N/A"}</td>
                <td className="text-truncate">{contact.comment || "N/A"}</td>
                <td>{new Date(contact.createdAt).toLocaleString()}</td>
                <td className="d-flex gap-2">
                  {/* <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleEdit(contact._id)}
                  >
                    <i className="bi bi-pencil-square"></i> Edit
                  </button> */}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(contact._id)}
                  >
                    <i className="bi bi-trash3"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contact;
