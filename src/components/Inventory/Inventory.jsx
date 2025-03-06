import "./Inventory.scss";
import { Link, NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteInventory from "../DeleteInventory/DeleteInventory";

function Inventory() {
  const [inventoryDetails, setInventoryDetails] = useState([]);
  const [inventoryInfo, setInventoryInfo] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
}

function trashClickHander() {
  setIsDialogOpen(true);
}
function trashIdHandler(inventory) {
  setInventoryInfo(inventory);
}

async function getWarehouseInventory() {
  const response = await axios.get(`http://localhost:8080/api/inventories`);
  setInventoryDetails(response.data);
}

useEffect(() => {
  getWarehouseInventory();
}, [isDialogOpen]);

return (
  <>
    {/* {isModalOpen ? <DeleteInventory setIsModalOpen={setIsDialogOpen} inventoryInfo={inventoryInfo}/>: ""} */}
    <section className="inventory-details__hidden">
      <h4 className="inventory-details__hidden-icon">INVENTORY ITEM</h4>
      <h4 className="inventory-details__hidden-icon">CATEGORY</h4>
      <h4 className="inventory-details__hidden-icon--status">STATUS</h4>
      <h4 className="inventory-details__hidden-icon">QTY</h4>
      <h4 className="inventory-details__hidden-icon">WAREHOUSE</h4>
      <h4>ACTIONS</h4>
    </section>

    <section className="inventory-details">
      {inventoryDetails.map((item) => (
        <div className="tablet" key={item.id}>
          <section key={item.id} className="inventory-details__container-i">
            <h4 className="inventory-details__items">INVENTORY ITEM:</h4>
            <NavLink to={`/inventories/${item.id}`} className="column">
              <h3 className="inventory-details__click-item ">
                {item.item_name}
              </h3>
            </NavLink>
            <h4 className="inventory-details__items">CATEGORY:</h4>
            <p className="inventory-details__click-item-value-i column">
              {item.category}
            </p>
            <h4 className="inventory-details__items">STATUS:</h4>
            <div className="column">
              <h3
                className={`inventory-details__status ${
                  item.status === "In Stock" ? "in-stock" : "out-of-stock"
                }`}
              >
                {item.status}
              </h3>
            </div>
            <h4 className="inventory-details__items">QTY:</h4>
            <p className="inventory-details__quantity-value column">
              {item.quantity}
            </p>
            <h4 className="inventory-details__items">WAREHOUSE:</h4>
            <p className="inventory-details__quantity-value column">
              {item.warehouse_name}
            </p>

            <section className="inventory-details__icons-i">
              <div
                className="inventory-details__delete"
                onClick={() => {
                  trashClickHander();
                  trashIdHandler(item);
                }}
              ></div>
              <Link to={`/inventories/edit/${item.id}`}>
                <p className="inventory-details__edit"></p>
              </Link>
            </section>
          </section>
        </div>
      ))}
      {inventoryDetails.map((item) => (
        <div className="mobile" key={item.id}>
          <section key={item.id} className="inventory-details__mobile">
            <div className="test-wrapper">
              <h4 className="item_label">INVENTORY ITEM</h4>
              <NavLink to={`/inventories/${item.id}`}>
                <h3 className="inventory-details__click-item ">
                  {item.item_name}
                </h3>
              </NavLink>
              <h4 className="item_label">CATEGORY</h4>
              <p className="item_value ">{item.category}</p>
            </div>
            <div className="another-wrapper">
              <h4 className="item_label">STATUS</h4>
              <div className="column">
                <h3
                  className={`inventory-details__status ${
                    item.status === "In Stock" ? "in-stock" : "out-of-stock"
                  }`}
                >
                  {item.status}
                </h3>
              </div>
              <h4 className="item_label">QTY</h4>
              <p className="item_value ">{item.quantity}</p>
              <h4 className="item_label">WAREHOUSE</h4>
              <p className="item_value">{item.warehouse_name}</p>
            </div>
          </section>
          <section className="icons-wrapper">
            <div
              className="inventory-details__delete"
              onClick={() => {
                trashClickHander();
                trashIdHandler(item);
              }}
            ></div>
            <Link to={`/inventories/edit/${item.id}`}>
              <p className="inventory-details__edit"></p>
            </Link>
          </section>
        </div>
      ))}
    </section>
  </>
);

export default Inventory;
