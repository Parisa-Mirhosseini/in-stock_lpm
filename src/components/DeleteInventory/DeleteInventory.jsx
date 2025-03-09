import closeIcon from "../../Assets/Icons/close-24px.svg";
import "../DeleteInventory/DeleteInventory.scss";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

function Delete({ setIsDialogOpen, inventoryInfo }) {
  function closeModal() {
    setIsDialogOpen(false);
  }

  async function deleteInventory() {
    try {
      const deleted = await axios.delete(
        `${BASE_URL}/api/inventories/${inventoryInfo.id}`
      );
      setIsDialogOpen(false);
    } catch (error) {
      console.log("error: inventory item could not be deleted");
    }
  }

  return (
    <div className="delete-inventory">
      <div className="delete-inventory__white-box">
        <img
          className="delete-inventory__icon"
          src={closeIcon}
          alt="close icon"
          onClick={closeModal}
        />
        <div className="delete-inventory__info-box">
          <h1 className="delete-inventory__title">
            Delete {inventoryInfo.item_name} inventory item?
          </h1>
          <p className="delete-inventory__description">
            Please confirm that you'd like to delete the{" "}
            {inventoryInfo.item_name} from the inventory list. You won't be able
            to undo this action.
          </p>
        </div>
        <div className="delete-inventory__btn-box">
          <button className="delete-inventory__cancel-btn" onClick={closeModal}>
            Cancel
          </button>
          <button
            className="delete-inventory__delete-btn"
            onClick={deleteInventory}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Delete;
