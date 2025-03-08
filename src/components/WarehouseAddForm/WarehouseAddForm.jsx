import React, { useState } from "react";
import "../../components/WarehouseAddForm/WarehouseAddForm.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

function WarehouseAddForm() {
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
    const navigate = useNavigate();

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
        if (!/^\d{10,11}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Invalid phone number (must be 10 or 11 digits).";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm(formData)) {
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/warehouses`, formData);
            console.log("Data saved successfully:", response.data);
            navigate("/");
        } catch (error) {
            console.error("Error saving data:", error.response?.data);

        }
    };

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                {/* Warehouse Details */}
                <div className="form__form-wrap">
                    <div className="form__form-box">
                        <h2 className="form__title">Warehouse Details</h2>
                        <label className="form__label">Warehouse Name</label>
                        <input
                            className="form__input"
                            type="text"
                            name="warehouseName"
                            placeholder="Warehouse Name"
                            value={formData.warehouseName}
                            onChange={handleChange}
                        />
                        {errors.warehouseName && <p className="error">{errors.warehouseName}</p>}

                        <label className="form__label">Street Address</label>
                        <input
                            className="form__input"
                            type="text"
                            name="streetAddress"
                            placeholder="Street Address"
                            value={formData.streetAddress}
                            onChange={handleChange}
                        />
                        {errors.streetAddress && <p className="error">{errors.streetAddress}</p>}

                        <label className="form__label">City</label>
                        <input
                            className="form__input"
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                        />
                        {errors.city && <p className="error">{errors.city}</p>}

                        <label className="form__label">Country</label>
                        <input
                            className="form__input"
                            type="text"
                            name="country"
                            placeholder="Country"
                            value={formData.country}
                            onChange={handleChange}
                        />
                        {errors.country && <p className="error">{errors.country}</p>}
                    </div>
                </div>

                {/* Contact Details */}
                <div className="form">
                <div className="form__box">
                        <h2 className="form__title">Contact Details</h2>
                        <label className="form__label">Contact Name</label>
                        <input
                            className="form__input"
                            type="text"
                            name="contactName"
                            placeholder="Contact Name"
                            value={formData.contactName}
                            onChange={handleChange}
                        />
                        {errors.contactName && <p className="error">{errors.contactName}</p>}

                        <label className="form__label">Position</label>
                        <input
                            className="form__input"
                            type="text"
                            name="position"
                            placeholder="Position"
                            value={formData.position}
                            onChange={handleChange}
                        />
                        {errors.position && <p className="error">{errors.position}</p>}

                        <label className="form__label">Phone Number</label>
                        <input
                            className="form__input"
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

                        <label className="form__label">Email</label>
                        <input
                            className="form__input"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
    
                {/* Buttons */}
                <section className="form__btn-frame">
                    <button className="form__btn-cancel" type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className="form__btn-active" type="submit">
                        + Add Warehouse
                    </button>
                </section>
                </div>
            </form>
        </>
    );
}

export default WarehouseAddForm;