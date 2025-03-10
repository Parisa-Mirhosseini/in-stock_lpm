import closeIcon from "../../Assets/Icons/close-24px.svg";
import "../Delete/Delete.scss";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

function Delete({ setIsDialogOpen, selectedWarehouse, warehouseInfo }) {
  function closeModal() {
    setIsDialogOpen(false);
  }

  async function deleteWarehouse() {
    try {
      const deleted = await axios.delete(
        `${BASE_URL}/api/warehouses/${warehouseInfo.id}`
      );
      setIsDialogOpen(false);
    } catch (error) {
      console.log("error: warehouse could not be deleted");
    }
  }

  return (
    <div className="delete">
      <div className="delete__white-box">
        <img
          className="delete__icon"
          src={closeIcon}
          alt="close icon"
          onClick={closeModal}
        />
        <div className="delete__info-box">
          <h1 className="delete__title">
            Delete {warehouseInfo.warehouse_name} warehouse?
          </h1>
          <p className="delete__description">
            Please confirm that you'd like to delete the{" "}
            {warehouseInfo.warehouse_name} from the list of warehouses. You
            won't be able to undo this action.
          </p>
        </div>
        <div className="delete__btn-box">
          <button className="delete__cancel-btn" onClick={closeModal}>
            Cancel
          </button>
          <button className="delete__delete-btn" onClick={deleteWarehouse}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Delete;
