import "./WarehouseMobile.scss";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// import DeleteWarehouse from "../DeleteWarehouse/DeleteWarehouse";

function WarehouseMobile() {
  const [warehouseList, setWarehouseList] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState({});

  const openDeleteDialog = () => setIsDialogOpen(true);
  const assignWarehouse = (warehouse) => setSelectedWarehouse(warehouse);

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/warehouses");
      setWarehouseList(response.data);
    } catch (error) {
      console.error("Failed to fetch warehouses", error);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, [isDialogOpen]);

  return (
    <>
      {/* {isDialogOpen && (
        <DeleteWarehouse setIsDialogOpen={setIsDialogOpen} selectedWarehouse={selectedWarehouse} />
      )} */}

      <section className="warehouse-details">
        {warehouseList.map((warehouse) => (
          <div className="warehouse-card" key={warehouse.id}>
            <section className="warehouse-details__mobile">
              <div className="warehouse-info">
                <h4 className="warehouse-label">Warehouse Name</h4>
                <NavLink to={`/warehouses/${warehouse.id}`}>
                  <h3 className="warehouse-details__clickable">
                    {warehouse.warehouse_name}
                    <svg
                      className="warehouse-details__arrow"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.99997 6L8.58997 7.41L13.17 12L8.58997 16.59L9.99997 18L16 12L9.99997 6Z"
                        fill="#2E66E6"
                      />
                    </svg>
                  </h3>
                </NavLink>
                <h4 className="warehouse-label">Address</h4>
                <p className="warehouse-value">{warehouse.address}</p>
              </div>

              <div className="warehouse-contact">
                <h4 className="warehouse-label">Contact Name</h4>
                <p className="warehouse-value">{warehouse.contact_name}</p>
                <h4 className="warehouse-label">Warehouse</h4>
                <p className="warehouse-value">{warehouse.warehouse_name}</p>
              </div>
            </section>

            <section className="warehouse-actions">
              <div
                className="warehouse-details__delete"
                onClick={() => {
                  openDeleteDialog();
                  assignWarehouse(warehouse);
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z"
                    fill="#C94515"
                  />
                </svg>
              </div>
              <Link to={`/warehouses/edit/${warehouse.id}`}>
                <p className="warehouse-details__edit">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z"
                      fill="#2E66E6"
                    />
                  </svg>
                </p>
              </Link>
            </section>
          </div>
        ))}
      </section>
    </>
  );
}

export default WarehouseMobile;
