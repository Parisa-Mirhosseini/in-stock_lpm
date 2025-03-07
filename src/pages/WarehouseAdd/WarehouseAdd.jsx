import React, { useState } from "react";
import "../WarehouseAdd/WarehouseAdd.scss";
import arrowBack from "../../assets/Icons/arrow_back-24px.svg";
import { Link } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

function WarehouseAdd() {
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

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    for (const key in formData) {
      if (!formData[key].trim()) {
        newErrors[key] = `${key} is required.`;
      }
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }

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
        // Send data to back-end
        const response = await axios.post(`${BASE_URL}`, formData);
        console.log("Data saved successfully:", response.data);
        alert("Warehouse added successfully!");
      } catch (error) {
        console.error("Error saving data:", error.response?.data);
        setErrors({ ...errors, backend: "Failed to save data. Please try again." });
      }
    }
  };

  return (
    <>
      <section className="warehouseadd">
        <div className="warehouseadd__container">
          <div className="warehouseadd__container--pagelabel">
            <Link className="warehouseadd__container--pagelabel" to="/" label="go to homepage">
              <img className="warehouseadd__container--backarrow" src={arrowBack} alt="backarrow" />
              <h1>Add New Warehouses</h1>
            </Link>
          </div>
          <section className="warehouseadd__container__form">
            <div className="warehouseadd__container__form--wrehouse--Details">
              <h2>Warehouse Details</h2>
              <form className="warehouseadd__container__form-container" onSubmit={handleSubmit}>
                <label>Warehouse Name</label>
                <input
                  className="warehouseadd__container__form--input"
                  type="text"
                  name="warehouseName"
                  placeholder="Warehouse Name"
                  value={formData.warehouseName}
                  onChange={handleChange}
                />
                {errors.warehouseName && <p className="error">{errors.warehouseName}</p>}

                <label>Street Address</label>
                <input
                  className="warehouseadd__container__form--input"
                  type="text"
                  name="streetAddress"
                  placeholder="Street Address"
                  value={formData.streetAddress}
                  onChange={handleChange}
                />
                {errors.streetAddress && <p className="error">{errors.streetAddress}</p>}

                <label>City</label>
                <input
                  className="warehouseadd__container__form--input"
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <p className="error">{errors.city}</p>}

                <label>Country</label>
                <input
                  className="warehouseadd__container__form--input"
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                />
                {errors.country && <p className="error">{errors.country}</p>}
              </form>
            </div>

            <div className="warehouseadd__container__form--contact--Details">
              <h2>Contact Details</h2>

              <form className="warehouseadd__container__form-container" onSubmit={handleSubmit}>
                <label>Contact Name</label>
                <input
                  className="warehouseadd__container__form--input"
                  type="text"
                  name="contactName"
                  placeholder="Contact Name"
                  value={formData.contactName}
                  onChange={handleChange}
                />
                {errors.contactName && <p className="error">{errors.contactName}</p>}

                <label>Position</label>
                <input
                  className="warehouseadd__container__form--input"
                  type="text"
                  name="position"
                  placeholder="Position"
                  value={formData.position}
                  onChange={handleChange}
                />
                {errors.position && <p className="error">{errors.position}</p>}

                <label>Phone Number</label>
                <input
                  className="warehouseadd__container__form--input"
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

                <label>Email</label>
                <input
                  className="warehouseadd__container__form--input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </form>
            </div>

            <section className="warehouseadd__buttons">
              <button className="warehouseadd__buttons--cancel" type="button">
                Cancel
              </button>
              <button className="warehouseadd__buttons--add" type="submit">
                + Add Warehouse
              </button>
            </section>
          </section>
        </div>
      </section>
    </>
  );
}

export default WarehouseAdd;