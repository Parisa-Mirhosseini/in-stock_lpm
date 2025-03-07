import "./Warehouse.scss";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TrashIcon from "../../Assets/Icons/delete_outline-24px.svg";
import EditIcon from "../../Assets/Icons/edit-24px.svg";
import ArrowIcon from "../../Assets/Icons/chevron_right-24px.svg";
import SortIcon from "../../Assets/Icons/sort-24px.svg";

function Warehouse() {
  const [warehouseDetails, setWarehouseDetails] = useState([]);
  const [warehouseInfo, setWarehouseInfo] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function trashClickHandler() {
    setIsDialogOpen(true);
  }
  function trashIdHandler(warehouse) {
    setWarehouseInfo(warehouse);
  }

  const getWarehouses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/warehouses");
      setWarehouseDetails(response.data);
    } catch (error) {
      console.error("Error fetching warehouse data", error);
    }
  };
  
  useEffect(() => {
    getWarehouses();
  }, [isDialogOpen]);

  return (
    <>
      <section className="warehouse-details__hidden">
        <h4 className="warehouse-details__hidden-icon">WAREHOUSE</h4>
        <h4 className="warehouse-details__hidden-icon">ADDRESS</h4>
        <h4 className="warehouse-details__hidden-icon">CONTACT NAME</h4>
        <h4 className="warehouse-details__hidden-icon">CONTACT INFO</h4>
        <h4 className="warehouse-details__hidden-icon">ACTIONS</h4>
      </section>

      <section className="warehouse-details">
        {warehouseDetails.map((warehouse) => (
          <div className="tablet" key={warehouse.id}>
            <section key={warehouse.id} className="warehouse-details__container-i">
              <h4 className="warehouse-details__items">WAREHOUSE</h4>
              <NavLink to={`/warehouses/${warehouse.id}`} className="column">
                <h3 className="warehouse-details__click-item">
                  {/* {warehouse.name} */}
                  {warehouse.warehouse_name}
                  <img src={ArrowIcon} alt="arrow icon" />
                </h3>
              </NavLink>
              <h4 className="warehouse-details__items">ADDRESS</h4>
              <p className="warehouse-details__click-item-value-i column">
                {warehouse.address}
              </p>
              <h4 className="warehouse-details__items">CONTACT NAME</h4>
              <p className="warehouse-details__click-item-value-i column">
                {warehouse.contact_name}
              </p>
              <h4 className="warehouse-details__items">CONTACT INFO</h4>
              <p className="warehouse-details__click-item-value-i column">
                {/* {warehouse.contact_info} */}
                {warehouse.contact_phone} <br />
                {warehouse.contact_email}
              </p>

              <section className="warehouse-details__icons-box">
                <div
                  className="warehouse-details__delete"
                  onClick={() => {
                    trashClickHandler();
                    trashIdHandler(warehouse);
                  }}
                >
                  <img src={TrashIcon} alt="delete icon" />
                </div>
                <Link to={`/warehouses/edit/${warehouse.id}`}>
                  <p className="warehouse-details__edit">
                    <img src={EditIcon} alt="edit icon" />
                  </p>
                </Link>
              </section>
            </section>
          </div>
        ))}
        {warehouseDetails.map((warehouse) => (
          <div className="mobile" key={warehouse.id}>
            <section key={warehouse.id} className="warehouse-details__mobile">
              <div className="test-wrapper">
                <h4 className="item_label">WAREHOUSE</h4>
                <NavLink to={`/warehouses/${warehouse.id}`}>
                  <h3 className="warehouse-details__click-item">
                  {warehouse.warehouse_name}
                    <img src={ArrowIcon} alt="arrow icon" />
                  </h3>
                </NavLink>
                <h4 className="item_label">ADDRESS</h4>
                <p className="item_value">{warehouse.address}</p>
              </div>
              <div className="another-wrapper">
                <h4 className="item_label">CONTACT NAME</h4>
                <p className="item_value">{warehouse.contact_name}</p>
                <h4 className="item_label">CONTACT INFO</h4>
                <p className="item_value"> {warehouse.contact_phone} <br />
                {warehouse.contact_email}</p>
              </div>
            </section>
            <section className="icons-wrapper">
              <div
                className="warehouse-details__delete"
                onClick={() => {
                  trashClickHandler();
                  trashIdHandler(warehouse);
                }}
              >
                <img src={TrashIcon} alt="trash icon" />
              </div>
              <Link to={`/warehouses/edit/${warehouse.id}`}>
                <p className="warehouse-details__edit">
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

export default Warehouse;