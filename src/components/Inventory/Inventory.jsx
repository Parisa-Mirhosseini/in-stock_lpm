import "./Inventory.scss";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TrashIcon from "../../Assets/Icons/delete_outline-24px.svg";
import EditIcon from "../../Assets/Icons/edit-24px.svg";
import ArrowIcon from "../../Assets/Icons/chevron_right-24px.svg";
import SortIcon from "../../Assets/Icons/sort-24px.svg";
import DeleteInventory from "../DeleteInventory/DeleteInventory.jsx";

const BASE_URL = import.meta.env.VITE_API_URL;

function Inventory() {
  const [inventoryDetails, setInventoryDetails] = useState([]);
  const [inventoryInfo, setInventoryInfo] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function trashClickHander() {
    setIsDialogOpen(true);
  }
  function trashIdHandler(inventory) {
    setInventoryInfo(inventory);
  }

  const getWarehouseInventory = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/inventories`);
      setInventoryDetails(response.data);
    } catch (error) {
      console.error("Error fetching inventory data", error);
    }
  };
  useEffect(() => {
    getWarehouseInventory();
  }, [isDialogOpen]);

  return (
    <>
      {isDialogOpen && (
        <DeleteInventory
          setIsDialogOpen={setIsDialogOpen}
          inventoryDetails={inventoryDetails}
          inventoryInfo={inventoryInfo}
        />
      )}
      <section className="inventory-details__hidden">
        <h4 className="inventory-details__hidden-icon">
          INVENTORY ITEM <img src={SortIcon} alt="sort icon" />
        </h4>
        <h4 className="inventory-details__hidden-icon">
          CATEGORY <img src={SortIcon} alt="sort icon" />
        </h4>
        <h4 className="inventory-details__hidden-icon inventory-details__hidden-icon--status">
          STATUS <img src={SortIcon} alt="sort icon" />
        </h4>
        <h4 className="inventory-details__hidden-icon">
          QTY
          <img src={SortIcon} alt="sort icon" />
        </h4>
        <h4 className="inventory-details__hidden-icon">
          WAREHOUSE
          <img src={SortIcon} alt="sort icon" />
        </h4>
        <h4 className="inventory-details__hidden-icon">
          ACTIONS
          <img src={SortIcon} alt="sort icon" />
        </h4>
      </section>

      <section className="inventory-details">
        {inventoryDetails.map((item) => (
          <div className="tablet" key={item.id}>
            <section key={item.id} className="inventory-details__container-i">
              <h4 className="inventory-details__items">INVENTORY ITEM</h4>
              <NavLink
                to={`/inventories/${item.id}`}
                className="inventory-details__link-box"
              >
                <h3 className="inventory-details__click-item ">
                  {item.item_name}
                  <img src={ArrowIcon} alt="arrow icon" />
                </h3>
              </NavLink>
              <h4 className="inventory-details__items">CATEGORY</h4>
              <p className="inventory-details__click-item-value">
                {item.category}
              </p>
              <h4 className="inventory-details__items">STATUS</h4>
              <h3
                className={`inventory-details__status ${
                  item.status === "In Stock" ? "in-stock" : "out-of-stock"
                }`}
              >
                {item.status}
              </h3>
              <h4 className="inventory-details__items">QTY</h4>
              <p className="inventory-details__quantity-value">
                {item.quantity}
              </p>
              <h4 className="inventory-details__items">WAREHOUSE</h4>
              <p className="inventory-details__warehouse">
                {item.warehouse_name}
              </p>
              <section className="inventory-details__icons-box">
                <div
                  className="inventory-details__delete"
                  onClick={() => {
                    trashClickHander();
                    trashIdHandler(item);
                  }}
                >
                  <img
                    className="inventory-details__icon"
                    src={TrashIcon}
                    alt="delete icon"
                  />
                </div>
                <Link to={`/inventories/edit/${item.id}`}>
                  <p className="inventory-details__edit">
                    <img
                      inventory-details__icon
                      src={EditIcon}
                      alt="edit icon"
                    />
                  </p>
                </Link>
              </section>
            </section>
          </div>
        ))}
        {inventoryDetails.map((item) => (
          <div className="inventory-details__mobile-container" key={item.id}>
            <section key={item.id} className="inventory-details__mobile">
              <div className="inventory-details__test-wrapper">
                <h4 className="inventory-details__item_label">
                  INVENTORY ITEM
                </h4>
                <NavLink to={`/inventories/${item.id}`}>
                  <h3 className="inventory-details__click-item">
                    {item.item_name}
                    <img src={ArrowIcon} alt="arrow icon" />
                  </h3>
                </NavLink>
                <h4 className="inventory-details__item_label">CATEGORY</h4>
                <p className="inventory-details__item_value ">
                  {item.category}
                </p>
              </div>
              <div className="inventory-details__another-wrapper">
                <h4 className="inventory-details__item_label">STATUS</h4>
                <h3
                  className={`inventory-details__status ${
                    item.status === "In Stock" ? "in-stock" : "out-of-stock"
                  }`}
                >
                  {item.status}
                </h3>
                <h4 className="inventory-details__item_label">QTY</h4>
                <p className="inventory-details__item_value ">
                  {item.quantity}
                </p>
                <h4 className="inventory-details__item_label">WAREHOUSE</h4>
                <p className="inventory-details__item_value">
                  {item.warehouse_name}
                </p>
              </div>
            </section>
            <section className="inventory-details__icons-wrapper">
              <div
                className="inventory-details__delete"
                onClick={() => {
                  trashClickHander();
                  trashIdHandler(item);
                }}
              >
                <img src={TrashIcon} alt="trash icon" />
              </div>
              <Link to={`/inventories/edit/${item.id}`}>
                <p className="inventory-details__edit">
                  <img src={EditIcon} alt="edit icon" />
                </p>
              </Link>
            </section>
          </div>
        ))}
      </section>
    </>
  );
}

export default Inventory;
