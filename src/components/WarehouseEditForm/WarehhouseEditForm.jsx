import React, { useState, useEffect } from "react";
import "../../components/WarehouseEditForm/WarehouseEditForm.scss";
import arrowBack from "../../Assets/Icons/arrow_back-24px.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

function WarehouseEditForm() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    warehouseName: "",
    streetAddress: "",
    city: "",
    country: "",
    contactName: "",
    position: "",
    phoneNumber: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  // Fetch the existing warehouse data
  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/warehouses/${id}`);
        setFormData(response.data); // Pre-fill the form with existing data
      } catch (error) {
        console.error("Error fetching warehouse data:", error);
        alert("Failed to load warehouse data. Please try again later.");
      }
    };

    fetchWarehouse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    // Check for required fields
    for (const key in formData) {
      if (!formData[key].trim()) {
        newErrors[key] = `${key} is required.`;
      }
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }

    // Validate phone number format
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number (10 digits required).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Send updated data to back-end
        const response = await axios.put(`${BASE_URL}/warehouses/${id}`, formData);
        console.log("Data updated successfully:", response.data);
        alert("Warehouse updated successfully!");
        navigate("/"); // Redirect to homepage after successful update
      } catch (error) {
        console.error("Error updating data:", error.response?.data);
        setErrors({ ...errors, backend: "Failed to update data. Please try again." });
      }
    }
  };

  const handleCancel = () => {
    navigate("/"); // Navigate back to the homepage
  };

  return (
    <>
      <section className="warehouseedit">
        <div className="warehouseedit__container">
          <div className="warehouseedit__container--pagelabel">
            <Link className="warehouseedit__container--pagelabel" to="/" label="go to homepage">
              <img className="warehouseedit__container--backarrow" src={arrowBack} alt="backarrow" />
              <h1 className="warehouseedit__container--pagelabel--text">Edit Warehouse</h1>
            </Link>
          </div>
          <section className="warehouseedit__container__form">
            <form className="warehouseedit__container__form-container" onSubmit={handleSubmit}>
              
              Warehouse Details
              <div className="warehouseedit__container__form--warehouse--details">
                <h2 className="warehouseedit__container__form--contact--details--text">Warehouse Details</h2>
                <label>Warehouse Name</label>
                <input
                  className="warehouseedit__container__form--input"
                  type="text"
                  name="warehouseName"
                  placeholder="Warehouse Name"
                  value={formData.warehouseName}
                  onChange={handleChange}
                />
                {errors.warehouseName && <p className="error">{errors.warehouseName}</p>}

                <label>Street Address</label>
                <input
                  className="warehouseedit__container__form--input"
                  type="text"
                  name="streetAddress"
                  placeholder="Street Address"
                  value={formData.streetAddress}
                  onChange={handleChange}
                />
                {errors.streetAddress && <p className="error">{errors.streetAddress}</p>}

                <label>City</label>
                <input
                  className="warehouseedit__container__form--input"
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <p className="error">{errors.city}</p>}

                <label>Country</label>
                <input
                  className="warehouseedit__container__form--input"
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                />
                {errors.country && <p className="error">{errors.country}</p>}
              </div>

              {/* Contact Details */}
              <div className="warehouseedit__container__form--contact--details">
                <h2 className="warehouseedit__container__form--contact--details--text">Contact Details</h2>
                <label>Contact Name</label>
                <input
                  className="warehouseedit__container__form--input"
                  type="text"
                  name="contactName"
                  placeholder="Contact Name"
                  value={formData.contactName}
                  onChange={handleChange}
                />
                {errors.contactName && <p className="error">{errors.contactName}</p>}

                <label>Position</label>
                <input
                  className="warehouseedit__container__form--input"
                  type="text"
                  name="position"
                  placeholder="Position"
                  value={formData.position}
                  onChange={handleChange}
                />
                {errors.position && <p className="error">{errors.position}</p>}

                <label>Phone Number</label>
                <input
                  className="warehouseedit__container__form--input"
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

                <label>Email</label>
                <input
                  className="warehouseedit__container__form--input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>

              {/* Buttons */}
              <section className="warehouseedit__buttons">
                <button className="warehouseedit__buttons--cancel" type="button" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="warehouseedit__buttons--save" type="submit">
                  Save Changes
                </button>
              </section>
            </form>
          </section>
        </div>
      </section>
    </>
  );
}

export default WarehouseEditForm;

