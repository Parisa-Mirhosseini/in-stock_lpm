import React, { useEffect, useState } from "react";
import "./WarehouseList.scss";
import TrashIcon from "../../assets/Icons/delete_outline-24px.svg";
import EditIcon from "../../assets/Icons/edit-24px.svg";
import ArrowIcon from "../../assets/Icons/chevron_right-24px.svg";
import SortIcon from "../../assets/Icons/sort-24px.svg";
import axios from "axios";
import { Link } from "react-router-dom";
// import DeleteWarehouse from "../../components/DeleteWarehouse/DeleteWarehouse.jsx";
import WarehouseMobile from "../../components/WarehouseMobile/WarehouseMobile.jsx";

function WarehouseList() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [warehouseData, setWarehouseData] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState({});
  const [sortedBy, setSortedBy] = useState(null);
  const [isAscending, setIsAscending] = useState(true);

  const openDeleteDialog = () => setIsDialogOpen(true);
  const assignWarehouse = (warehouse) => setSelectedWarehouse(warehouse);

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/warehouses");
      setWarehouseData(response.data);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  };

  const sortWarehouseData = (field, ascending) => {
    const sortedList = [...warehouseData].sort((a, b) => {
      const valA = a[field]?.toString().toLowerCase();
      const valB = b[field]?.toString().toLowerCase();
      return ascending ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
    setWarehouseData(sortedList);
    setSortedBy(field);
    setIsAscending(ascending);
  };

  useEffect(() => {
    fetchWarehouses();
  }, [isDialogOpen]);

  return (
    <>
      {/* {isDialogOpen && (
        <DeleteWarehouse setIsDialogOpen={setIsDialogOpen} selectedWarehouse={selectedWarehouse} />
      )} */}

      <div className="warehouse-container">
        <div className="warehouse-wrapper">
          <header className="warehouse__header">
            <h1 className="warehouse__title">Warehouses</h1>
            <div className="warehouse__controls">
              <input type="text" className="warehouse__search" placeholder="Search..." disabled />
              <Link to={"/warehouses/add"} className="warehouse__button-container">
                <button className="warehouse__add-button">+ Add New Warehouse</button>
              </Link>
            </div>
          </header>

          <WarehouseMobile />

          <table className="warehouse__table">
            <thead>
              <tr>
                <th onClick={() => sortWarehouseData("warehouse_name", !isAscending)}>
                  Name
                  <img
                    className={`warehouse__icon ${sortedBy === "warehouse_name" && isAscending ? "ascending" : ""}`}
                    src={SortIcon}
                    alt="Sort"
                  />
                </th>
                <th onClick={() => sortWarehouseData("address", !isAscending)}>
                  Location
                  <img
                    className={`warehouse__icon ${sortedBy === "address" && isAscending ? "ascending" : ""}`}
                    src={SortIcon}
                    alt="Sort"
                  />
                </th>
                <th onClick={() => sortWarehouseData("contact_name", !isAscending)}>
                  Contact
                  <img
                    className={`warehouse__icon ${sortedBy === "contact_name" && isAscending ? "ascending" : ""}`}
                    src={SortIcon}
                    alt="Sort"
                  />
                </th>
                <th onClick={() => sortWarehouseData("contact_phone", !isAscending)}>
                  Contact Info
                  <img
                    className={`warehouse__icon ${sortedBy === "contact_phone" && isAscending ? "ascending" : ""}`}
                    src={SortIcon}
                    alt="Sort"
                  />
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {warehouseData.map((warehouse) => (
                <tr key={warehouse.id} className="warehouse__row">
                  <td>
                    <div className="warehouse__details">
                      <Link className="warehouse__link" to={`/warehouses/${warehouse.id}`}>
                        {warehouse.warehouse_name}
                      </Link>
                      <img className="warehouse__arrow" src={ArrowIcon} alt="Details" />
                    </div>
                  </td>
                  <td>{`${warehouse.address}, ${warehouse.city}, ${warehouse.country}`}</td>
                  <td>{warehouse.contact_name}</td>
                  <td>
                    {warehouse.contact_phone}
                    <br />
                    {warehouse.contact_email}
                  </td>
                  <td>
                    <img
                      className="warehouse__icon"
                      src={TrashIcon}
                      alt="Delete"
                      onClick={() => {
                        openDeleteDialog();
                        assignWarehouse(warehouse);
                      }}
                    />
                    <Link to={`/warehouses/edit/${warehouse.id}`}>
                      <img className="warehouse__icon" src={EditIcon} alt="Edit" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default WarehouseList;
