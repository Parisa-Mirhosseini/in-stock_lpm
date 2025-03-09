import "./InventoryEditForm.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

function InventoryEditForm() {
  const [openQuantity, setOpenQuantity] = useState(false);
  const [inventories, setInventories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const [formValues, setFormValues] = useState({
    warehouse_name: "",
    item_name: "",
    description: "",
    category: "",
    status: "",
    quantity: "",
  });

  // Toggle quantity box
  const toggleQuantityBox = () => {
    setOpenQuantity((prev) => !prev);
  };

  // Handle cancel button click
  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/inventories");
  };

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fetch inventories and warehouses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [inventoriesResp, warehousesResp] = await Promise.all([
          axios.get(`${BASE_URL}/api/inventories`),
          axios.get(`${BASE_URL}/api/warehouses`),
        ]);

        setInventories(inventoriesResp.data);
        setWarehouses(warehousesResp.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Fetch inventory item data
  useEffect(() => {
    const fetchInventoryItem = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/inventories/${id}`);
        setFormValues(response.data);
      } catch (error) {
        console.error("Error fetching inventory item:", error);
      }
    };

    fetchInventoryItem();
  }, [id]);

  // Validate form
  const validateForm = (formValues) => {
    for (let key in formValues) {
      if (formValues[key] === "") {
        alert("Please fill all input fields");
        return false;
      }
    }

    if (
      formValues.status === "In Stock" &&
      (!formValues.quantity || formValues.quantity === "")
    ) {
      alert("Please enter a quantity for items in stock.");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm(formValues)) {
      return;
    }

    const { updated_at, created_at, warehouse_name, ...dataToSend } =
      formValues;

    try {
      const response = await axios.put(
        `${BASE_URL}/api/inventories/${id}`,
        dataToSend
      );
      console.log("Inventory updated successfully:", response.data);
      navigate("/inventories");
    } catch (error) {
      console.error("Error updating inventory:", error);
      alert("Error updating inventory");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__form-wrap">
        {/* Left Column: Item Details */}
        <div className="form__form-box">
          <h2 className="form__title">Item Details</h2>

          <label className="form__label" htmlFor="item_name">
            Item Name
          </label>
          <input
            className="form__input"
            onChange={handleInputChange}
            name="item_name"
            type="text"
            value={formValues.item_name}
          />

          <label className="form__label" htmlFor="description">
            Description
          </label>
          <textarea
            className="form__text"
            onChange={handleInputChange}
            name="description"
            rows={7}
            value={formValues.description}
          ></textarea>

          <label className="form__label" htmlFor="category">
            Category
          </label>
          <select
            className="form__dropdown"
            value={formValues.category}
            onChange={(event) =>
              setFormValues((prevData) => ({
                ...prevData,
                category: event.target.value,
              }))
            }
          >
            <option value="" disabled>
              {formValues.category}
            </option>
            {inventories.map((inventory) => (
              <option key={inventory.id} value={inventory.category}>
                {inventory.category}
              </option>
            ))}
          </select>
        </div>

        {/* Right Column: Item Availability and Buttons */}
        <div className="form__fields-box">
          <h2 className="form__field-title">Item Availability</h2>
          <label className="form__label" htmlFor="status">
            Status
          </label>
          <div className="form__box">
            <li className="form__list">
              <input
                className={`form__radio ${openQuantity ? "hover" : ""}`}
                type="radio"
                name="status"
                checked={formValues.status === "In Stock"}
                value="In Stock"
                onChange={(event) => {
                  setFormValues((prevData) => ({
                    ...prevData,
                    status: event.target.value,
                  }));
                  setOpenQuantity(true);
                }}
              />
              In stock
            </li>

            <li className="form__list">
              <input
                className="form__radio"
                type="radio"
                name="status"
                checked={formValues.status === "Out of Stock"}
                value="Out of Stock"
                onChange={(event) => {
                  setFormValues((prevData) => ({
                    ...prevData,
                    status: event.target.value,
                  }));
                  setOpenQuantity(false);
                }}
              />
              Out of stock
            </li>
          </div>

          {openQuantity && (
            <div className="form__quantity">
              <label className="form__label" htmlFor="quantity">
                Quantity
              </label>
              <input
                className="form__input"
                name="quantity"
                type="number"
                min="0"
                value={formValues.quantity}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div className="form__frame">
            <label className="form__label" htmlFor="warehouse_id">
              Warehouse
            </label>
            <select
              className="form__dropdown"
              value={formValues.warehouse_id}
              onChange={(event) =>
                setFormValues((prevData) => ({
                  ...prevData,
                  warehouse_id: event.target.value,
                }))
              }
            >
              <option value="" disabled>
                {formValues.warehouse_name}
              </option>
              {warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.warehouse_name}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="form__btn-frame">
            <button onClick={handleCancel} className="form__btn-cancel">
              Cancel
            </button>
            <button type="submit" className="form__btn-active">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default InventoryEditForm;
