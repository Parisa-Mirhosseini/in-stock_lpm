import closeIcon from "../../Assets/Icons/close-24px.svg";
import "../Delete/Delete.scss";
import axios from "axios";

function Delete({ setIsDialogOpen, selectedWarehouse }) {
  function closeModal() {
    setIsDialogOpen(false);
  }

  async function deleteWarehouse() {
    try {
      const deleted = await axios.delete(
        `http://localhost:8080/api/warehouses/${selectedWarehouse.id}`
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
            Delete {selectedWarehouse.warehouse_name} warehouse?
          </h1>
          <p className="delete__description">
            Please confirm that you'd like to delete the{" "}
            {selectedWarehouse.warehouse_name} from the list of warehouses. You
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
