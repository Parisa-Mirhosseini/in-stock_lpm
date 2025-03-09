import React, { useState } from "react";
import "../../components/WarehouseAddForm/WarehouseAddForm.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

function WarehouseAddForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    warehouse_name: "",
    address: "",
    city: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (data) => {
    let newErrors = {};

    Object.keys(data).forEach((key) => {
      const value = data[key];

      if (typeof value === "string" && !value.trim()) {
        newErrors[key] = `${key.replace("_", " ")} is required.`;
      } else if (value === null || value === undefined || value === "") {
        newErrors[key] = `${key.replace("_", " ")} is required.`;
      }
    });

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(data.contact_email)) {
      newErrors.contact_email = "Invalid email address.";
    }

    return newErrors;
  };

  // for (const key in formData) {
  //     if (!formData[key].trim()) {
  //         newErrors[key] = `${key.replace("_", " ")} is required.`;
  //     }
  // }

  // Validate email format
  // if (!/\S+@\S+\.\S+/.test(data.contact_email)) {
  //     newErrors.contact_email = "Invalid email address.";
  // }

  // // Validate phone number format
  // if (!/^\d{10,11}$/.test(formData.contact_phone)) {
  //     newErrors.contact_phone = "Invalid phone number (must be 10 or 11 digits).";
  // }

  //     setErrors(newErrors);
  //     return Object.keys(newErrors).length === 0;
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return; // Stop submission if there are errors
    }

    try {
      await axios.post(`${BASE_URL}/api/warehouses`, formData);
      console.log("Warehouse added successfully!");
      alert("Warehouse added successfully!");
      navigate("/warehouses");
    } catch (error) {
      console.error("Error adding data:", error);
      setErrors({ ...errors, backend: "Failed to add data." });
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <form className="addwarehouse__form" onSubmit={handleSubmit}>
      <div className="addwarehouse__form__form-wrap">
        <div className="addwarehouse__form__form-box">
          <div className="addwarehouse__form__box--each">
            {/* Warehouse Details */}
            <h2 className="addwarehouse__form__title">Warehouse Details</h2>
            <label
              className="addwarehouse__form__label"
              htmlFor="warehouse_name"
            >
              Warehouse Name
            </label>
            <input
              className="form__input"
              type="text"
              id="warehouse_name"
              name="warehouse_name"
              placeholder="Warehouse Name"
              value={formData.warehouse_name}
              onChange={handleChange}
            />
            {errors.warehouse_name && (
              <p className="error">{errors.warehouse_name}</p>
            )}

            <label className="addwarehouse__form__label" htmlFor="address">
              Street Address
            </label>
            <input
              className="addwarehouse__form__input"
              type="text"
              id="address"
              name="address"
              placeholder="Street Address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <p className="error">{errors.address}</p>}

            <label className="addwarehouse__form__label" htmlFor="city">
              City
            </label>
            <input
              className="addwarehouse__form__input"
              type="text"
              id="city"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
            {errors.city && <p className="error">{errors.city}</p>}

            <label className="addwarehouse__form__label" htmlFor="country">
              Country
            </label>
            <input
              className="addwarehouse__form__input"
              type="text"
              id="country"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
            />
            {errors.country && <p className="error">{errors.country}</p>}
          </div>
        </div>

        {/* Contact Details */}
        <div className="addwarehouse__form__box">
          <h2 className="addwarehouse__form__title">Contact Details</h2>
          <label className="addwarehouse__form__label" htmlFor="contact_name">
            Contact Name
          </label>
          <input
            className="addwarehouse__form__input"
            type="text"
            id="contact_name"
            name="contact_name"
            placeholder="Contact Name"
            value={formData.contact_name}
            onChange={handleChange}
          />
          {errors.contact_name && (
            <p className="error">{errors.contact_name}</p>
          )}

          <label
            className="addwarehouse__form__label"
            htmlFor="contact_position"
          >
            Position
          </label>
          <input
            className="addwarehouse__form__input"
            type="text"
            id="contact_position"
            name="contact_position"
            placeholder="Position"
            value={formData.contact_position}
            onChange={handleChange}
          />
          {errors.contact_position && (
            <p className="error">{errors.contact_position}</p>
          )}

          <label className="addwarehouse__form__label" htmlFor="contact_phone">
            Phone Number
          </label>
          <input
            className="form__input"
            type="text"
            id="contact_phone"
            name="contact_phone"
            placeholder="Phone Number"
            value={formData.contact_phone}
            onChange={handleChange}
          />
          {errors.contact_phone && (
            <p className="error">{errors.contact_phone}</p>
          )}

          <label className="addwarehouse__form__label" htmlFor="contact_email">
            Email
          </label>
          <input
            className="form__input"
            type="email"
            id="contact_email"
            name="contact_email"
            placeholder="Email"
            value={formData.contact_email}
            onChange={handleChange}
          />
          {errors.contact_email && (
            <p className="error">{errors.contact_email}</p>
          )}
        </div>
      </div>
      {/* Buttons */}
      <section className="addwarehouse__form__btn-frame">
        <button
          className="addwarehouse__form__btn-cancel"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button className="addwarehouse__form__btn-active" type="submit">
          + Add Warehouse
        </button>
      </section>
    </form>
  );
}

export default WarehouseAddForm;
