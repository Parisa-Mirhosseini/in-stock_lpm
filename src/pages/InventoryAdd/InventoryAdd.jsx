import "./InventoryAdd.scss";
import arrowBack from "../../Assets/Icons/arrow_back-24px.svg";
import InventoryAddForm from "../../components/InventoryAddForm/InventoryAddForm";
import { Link } from "react-router-dom";

function InventoryAdd() {
  return (
    <section className="form-page">
      <div className="form-page__container">
        <div className="form-page__wrap">
          <Link to="/inventories">
            <img src={arrowBack} alt="back arrow" className="form-page__icon" />
          </Link>
          <h1 className="form-page__item">Add New Inventory Item</h1>
        </div>

        <InventoryAddForm />
      </div>
    </section>
  );
}
export default InventoryAdd;
