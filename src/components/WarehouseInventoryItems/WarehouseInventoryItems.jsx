import "../WarehouseInventoryItems/WarehouseInventoryItems.scss";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TrashIcon from "../../Assets/Icons/delete_outline-24px.svg";
import EditIcon from "../../Assets/Icons/edit-24px.svg";
import ArrowIcon from "../../Assets/Icons/chevron_right-24px.svg";
import DeleteInventory from "../DeleteInventory/DeleteInventory.jsx";

const BASE_URL = import.meta.env.VITE_API_URL;

function WarehouseInventoryItems() {
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
                <h4 className="inventory-details__hidden-icon">INVENTORY ITEM</h4>
                <h4 className="inventory-details__hidden-icon">CATEGORY</h4>
                <h4 className="inventory-details__hidden-icon--status">STATUS</h4>
                <h4 className="inventory-details__hidden-icon">QTY</h4>
                <h4 className="inventory-details__">ACTIONS</h4>
            </section>

            <section className="inventory-details">
                {inventoryDetails.map((item) => (
                    <div className="tablet" key={item.id}>
                        <section key={item.id} className="inventory-details__container-i">
                            <h4 className="inventory-details__items">INVENTORY ITEM</h4>{" "}
                            <NavLink to={`/inventories/${item.id}`} className="column">
                                <h3 className="inventory-details__click-item ">
                                    {item.item_name}
                                    <img src={ArrowIcon} alt="arrow icon" />
                                </h3>
                            </NavLink>
                            <h4 className="inventory-details__items">CATEGORY</h4>
                            <p className="inventory-details__click-item-value-i column">
                                {item.category}
                            </p>
                            <h4 className="inventory-details__items">STATUS</h4>
                            <div className="column">
                                <h3
                                    className={`inventory-details__status ${item.status === "In Stock" ? "in-stock" : "out-of-stock"
                                        }`}
                                >
                                    {item.status}
                                </h3>
                            </div>
                            <h4 className="inventory-details__items">QTY</h4>
                            <p className="inventory-details__quantity-value column">
                                {item.quantity}
                            </p>

                            <section className="inventory-details__icons-box">
                                <div
                                    className="inventory-details__delete"
                                    onClick={() => {
                                        trashClickHander();
                                        trashIdHandler(item);
                                    }}
                                >
                                    <img src={TrashIcon} alt="delete icon" />
                                </div>
                                <Link to={`/inventories/edit/${item.id}`}>
                                    <p className="inventory-details__edit">
                                        <img src={EditIcon} alt="edit icon" />
                                    </p>
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
                                        <img src={ArrowIcon} alt="arrow icon" />
                                    </h3>
                                </NavLink>
                                <h4 className="item_label">CATEGORY</h4>
                                <p className="item_value ">{item.category}</p>
                            </div>
                            <div className="another-wrapper">
                                <h4 className="item_label">STATUS</h4>
                                <div className="column">
                                    <h3
                                        className={`inventory-details__status ${item.status === "In Stock" ? "in-stock" : "out-of-stock"
                                            }`}
                                    >
                                        {item.status}
                                    </h3>
                                </div>
                                <h4 className="item_label">QTY</h4>
                                <p className="item_value ">{item.quantity}</p>

                            </div>
                        </section>
                        <section className="icons-wrapper">
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

export default WarehouseInventoryItems;
