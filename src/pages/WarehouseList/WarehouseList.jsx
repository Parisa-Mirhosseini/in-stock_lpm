import "./WarehouseList.scss";
import Warehouse from "../../components/Warehouse/Warehouse.jsx";
import { Link } from "react-router-dom";

function WarehouseList() {
  return (
    <>
      <div className="warehouseList">
        <div className="warehouseList__card">
          <div className="warehouseList__warehouse">
            <header className="warehouses__header">
              <h1 className="warehouseList__title">Warehouses</h1>
              <div className="warehouseList__search-box">
                <input
                  type="text"
                  className="warehouseList__search"
                  placeholder="Search..."
                  disabled
                ></input>
                <Link
                  to={"/warehouses/add"}
                  className="warehouseList__container-add-btn"
                >
                  <button className="warehouseList__button">
                    + Add New Warehouse
                  </button>
                </Link>
              </div>
            </header>
          </div>
          <Warehouse />
        </div>
      </div>
    </>
  );
}

export default WarehouseList;