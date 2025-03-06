import "./InventoryList.scss";
import axios from "axios";
import Inventory from "../../components/Inventory/Inventory.jsx";

function InventoryList() {
  return (
    <>
      <div className="inventoryList">
        <div className="inventoryList__card">
          <div className="inventoryList__inventory">
            <header className="inventories__header">
              <h1 className="inventoryList__title">Inventory</h1>
              <div className="inventoryList__search-box">
                <input
                  type="text"
                  className="inventoryList__search"
                  placeholder="Search..."
                  disabled
                ></input>
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
