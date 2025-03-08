import "./InventoryEdit.scss";
import arrowIcon from "../../assets/icons/arrow_back-24px.svg";
import InventoryEditForm from "../../components/InventoryEditForm/InventoryEditForm";
import { NavLink } from "react-router-dom";

function InventoryEdit() {
  return (
    <section className="form-page">
      <div className="form-page__containerr">
        <div className="form-page__wrap">
          <NavLink className="form-page__icon" to="/inventories">
            <img src={arrowIcon} alt="back arrow" />
          </NavLink>

          <h1 className="form-page__item">Edit Inventory Item</h1>
        </div>

        <InventoryEditForm />
      </div>
    </section>
  );
}
export default InventoryEdit;
