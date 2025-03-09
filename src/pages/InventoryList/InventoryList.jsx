import "./InventoryList.scss";
import Inventory from "../../components/Inventory/Inventory.jsx";
import { Link } from "react-router-dom";
import searchIcon from "../../Assets/Icons/search-24px.svg";

function InventoryList() {
  return (
    <>
      <div className="inventoryList">
        <div className="inventoryList__card">
          <div className="inventoryList__inventory">
            <header className="inventoryList__header">
              <h1 className="inventoryList__title">Inventory</h1>
              <div className="inventoryList__search-box">
                <input
                  type="text"
                  className="inventoryList__search"
                  placeholder="Search..."
                  disabled
                ></input>
                <img
                  className="inventoryList__search-icon"
                  src={searchIcon}
                  alt="search icon"
                />
                <Link
                  to={"/inventories/add"}
                  className="inventoryList__container-add-btn"
                >
                  <button className="inventoryList__button">
                    + Add New Item
                  </button>
                </Link>
              </div>
            </header>
          </div>
          <Inventory />
        </div>
      </div>
    </>
  );
}

export default InventoryList;
