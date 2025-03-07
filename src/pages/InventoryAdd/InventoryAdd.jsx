import "./InventoryAdd.scss";
import ArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import InventoryAddForm from "../../components/InventoryAddForm/InventoryAddForm";
import { NavLink } from "react-router-dom";

function InventoryAdd() {
  return (
    <section className="form-page">
      <div className="form-page__container">
        <div className="form-page__wrap">
          <NavLink to="/inventories">
            <img src={ArrowIcon} alt="back arrow" className="form-page__icon" />
          </NavLink>
          <h1 className="form-page__item">Add New Inventory Item</h1>
        </div>

        <InventoryAddForm />
      </div>
    </section>
  );
}
export default InventoryAdd;
