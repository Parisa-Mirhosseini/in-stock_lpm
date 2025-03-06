import closeIcon from "../../Assets/Icons/close-24px.svg";
import "../Delete/Delete.scss";
import axios from "axios";

function Delete({ setIsDialogOpen, warehouseData }) {
  function closeModal() {
    setIsDialogOpen(false);
  }

  async function deleteWarehouse() {
    try {
      const deleted = await axios.delete(
        `http://localhost:8080/api/warehouses/${warehouseData.id}`
      );
      setIsDialogOpen(false);
    } catch (error) {
      console.log("error: warehouse could not be deleted");
    }
  }

  return (
    <div className="delete">
      <div className="delete__white-box">
        <img src={closeIcon} alt="close icon" onClick={closeModal} />
        <h1 className="delete__title">
          Delete {warehouseData.warehouse_name} warehouse?
        </h1>
        <p className="delete__description">
          Please confirm that you'd like to delete the{" "}
          {warehouseData.warehouse_name} from the list of warehouses. You won't
          be able to undo this action.
        </p>
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
