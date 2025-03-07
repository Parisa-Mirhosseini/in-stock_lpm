import "./WarehouseDetailsComponent.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import BackArrowIcon from "../../assets/icons/back-arrow.svg";
import EditIcon from "../../assets/Icons/edit-24px.svg";
import axios from "axios";
import BackarrowIcon from "../../assets/Icons/arrow_back-24px.svg";

const BASE_URL = import.meta.env.VITE_API_URL;

function WarehouseDetailsComponent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [warehouseDetails, setWarehouseDetails] = useState({});

  // Get warehouse details from the API based on id
  async function getWarehouseDetails() {
    try {
      const response = await axios.get(`${BASE_URL}/api/warehouses/${id}`);
      setWarehouseDetails(response.data);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 404) {
        navigate("/notfound");
      }
    }
  }

  useEffect(() => {
    getWarehouseDetails();
  }, [id]);

  return (
    <>
      <section className="warehouse-details">
        <section className="warehouse-details__info">
          <Link to={"/"} className="warehouse-details__arrow">
            <img
              src={BackarrowIcon}
              alt="Back"
              className="warehouse-details__icon"
            />
          </Link>
          <h1 className="warehouse-details__city">
            {warehouseDetails.warehouse_name}
          </h1>
          <Link
            to={`/warehouses/edit/${id}`}
            className="warehouse-details__edit"
          >
            <img
              src={EditIcon}
              alt="Edit"
              className="warehouse-details__icon--white"
            />
          </Link>

          <Link
            to={`/warehouses/edit/${id}`}
            className="warehouse-details__edit--hidden"
          >
            <img
              src={EditIcon}
              alt="Edit"
              className="warehouse-details__icon--white"
            />
            Edit
          </Link>
        </section>

        <div className="warehouse-details__container">
          <section className="warehouse-details__address">
            <h4 className="warehouse-details__subtitle">WAREHOUSE ADDRESS:</h4>
            <p className="warehouse-details__address-info">{`${warehouseDetails.address}, ${warehouseDetails.city}, ${warehouseDetails.country}`}</p>
          </section>
          <section className="warehouse-details__contact">
            <div className="warehouse-details__name">
              <h4 className="warehouse-details__subtitle">CONTACT NAME:</h4>
              <p className="warehouse-details__first-last-name">
                {warehouseDetails.contact_name}
              </p>
              <p className="warehouse-details__job-title">
                {warehouseDetails.contact_position}
              </p>
            </div>

            <div className="warehouse-details__information">
              <h4 className="warehouse-details__subtitle">
                CONTACT INFORMATION:
              </h4>
              <p className="warehouse-details__number">
                {warehouseDetails.contact_phone}
              </p>
              <p className="warehouse-details__email">
                {warehouseDetails.contact_email}
              </p>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default WarehouseDetailsComponent;
