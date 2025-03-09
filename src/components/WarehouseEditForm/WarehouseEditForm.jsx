import React, { useState, useEffect } from "react";
import "../../components/WarehouseEditForm/WarehouseEditForm.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const BASE_URL = import.meta.env.VITE_API_URL;

function WarehouseEditForm() {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/warehouses/${id}`);
        const { id: _id, created_at, updated_at, ...rest } = data;
        setFormData(rest); // Pre-fill form
      } catch (error) {
        console.error("Error fetching warehouse data:", error);
        alert("Failed to load warehouse data.");
      }
    };

    fetchWarehouse();
  }, [id]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return; // Stop submission if there are errors
    }

    try {
      await axios.put(`${BASE_URL}/api/warehouses/${id}`, formData);
      console.log("Warehouse updated successfully!");
      alert("Warehouse updated successfully!");
      navigate("/warehouses");
    } catch (error) {
      console.error("Error updating data:", error);
      setErrors({ ...errors, backend: "Failed to update data." });
    }
  };

  const handleCancel = () => navigate("/warehouses");



  return (
    <form onSubmit={handleSubmit} className="warehouseedit__form">
      {/* Warehouse Details */}
      <div className="warehouseedit__form__form-wrap">
        <div className="warehouseedit__form__form-box">
          <div className="warehouseedit__form__box--each">
            <h2 className="warehouseedit__form__title">Warehouse Details</h2>
            {["warehouse_name", "address", "city", "country"].map((field) => (
              <div key={field}>
                <label className="warehouseedit__form__label" htmlFor={field}>
                  {field.replace("_", " ")}
                </label>
                <input
                  className="warehouseedit__form__input"
                  type="text"
                  id={field}
                  name={field}
                  placeholder={field.replace("_", " ")}
                  value={formData[field] || ""}
                  onChange={handleChange}
                />
                {errors[field] && <p className="error">{errors[field]}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Details */}
        <div className="warehouseedit__form__box">
          <h2 className="warehouseedit__form__title">Contact Details</h2>
          {["contact_name", "contact_position", "contact_phone", "contact_email"].map((field) => (
            <div key={field}>
              <label className="warehouseedit__form__label" htmlFor={field}>
                {field.replace("_", " ")}
              </label>
              <input
                className="warehouseedit__form__input"
                type={field === "contact_email" ? "email" : "text"}
                id={field}
                name={field}
                placeholder={field.replace("_", " ")}
                value={formData[field] || ""}
                onChange={handleChange}
              />
              {errors[field] && <p className="error">{errors[field]}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <section className="warehouseedit__form__btn-frame">
        <button
          type="button"
          onClick={handleCancel}
          className="warehouseedit__form__btn-cancel"
        >
          Cancel
        </button>
        <button type="submit" className="warehouseedit__form__btn-active">
          Save
        </button>
      </section>
    </form>
  );
}
export default WarehouseEditForm;
