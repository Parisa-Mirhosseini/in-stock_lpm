import "./InventoryDetails.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from "../../assets/Icons/edit-24px.svg";
import BackarrowIcon from "../../assets/Icons/arrow_back-24px.svg";

const BASE_URL = import.meta.env.VITE_API_URL;

function InventoryDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [InventoryDetails, setInventoryDetails] = useState({});

  // Get warehouse details from the API based on id

  async function getInventoryDetails() {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/inventories/${params.id}`
      );
      setInventoryDetails(response.data);
    } catch (error) {
      console.log(
        `Error: api call was not able to retrieve desired inventory item with id:${params.id}`
      );
      navigate("notfound");
    }
  }

  useEffect(() => {
    getInventoryDetails();
  }, [params.id]);

  return (
    <>
      <div className="inventory-details__container">
        <section className="items">
          <section className="items__header">
            <Link to={"/inventories"} className="items__arrow">
              <img src={BackarrowIcon} alt="Back" className="items__icon" />
            </Link>

            <h1 className="items__item">{InventoryDetails.item_name}</h1>
            <Link to={`/inventories/edit/${params.id}`} className="items__edit">
              <img src={EditIcon} alt="Edit" className="items__icon--white" />
            </Link>
            <Link
              to={`/inventories/edit/${params.id}`}
              className="items__edit--hidden"
            >
              <img src={EditIcon} alt="Edit" className="items__icon--white" />
              <h3>Edit</h3>
            </Link>
          </section>
          <section className="items__container">
            <section className="items__description-category">
              <div className="items__description">
                <h4 className="items__subtitle">ITEM DESCRIPTION:</h4>
                <p className="items__text--mod">{`${InventoryDetails.description}`}</p>
              </div>
              <div className="items__category">
                <h4 className="items__subtitle">CATEGORY:</h4>
                <p className="items__text">{`${InventoryDetails.category}`}</p>
              </div>
            </section>
            <section className="items__additional-info">
              <div className="items__status-quantity">
                <div className="items__status">
                  <h4 className="items__subtitle">STATUS:</h4>
                  {InventoryDetails.status === "In Stock" ? (
                    <p className="items__stock">IN STOCK</p>
                  ) : (
                    <p className="items__stock--not">OUT OF STOCK</p>
                  )}
                </div>
                <div className="items__quantity">
                  <h4 className="items__subtitle">QUANTITY:</h4>
                  <p className="items__text--mod">{`${InventoryDetails.quantity}`}</p>
                </div>
              </div>
              <div className="items__Status">
                <h4 className="items__subtitle">WAREHOUSE:</h4>
                <p className="items__text">{`${InventoryDetails.warehouse_name}`}</p>
              </div>
            </section>
          </section>
        </section>
      </div>
    </>
  );
}

export default InventoryDetails;
