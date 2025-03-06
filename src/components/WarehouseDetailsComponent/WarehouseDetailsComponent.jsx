import "./WarehouseDetailsComponent.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function WarehouseDetailsComponent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [warehouseDetails, setWarehouseDetails] = useState({});

  // Get warehouse details from the API based on id
  async function getWarehouseDetails() {
    try {
      const response = await axios.get(`http://localhost:8080/api/warehouses/${id}`);
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#2E66E6" />
            </svg>
          </Link>

          <h1 className="warehouse-details__city">{warehouseDetails.warehouse_name}</h1>
          <Link to={`/warehouses/edit/${id}`} className="warehouse-details__edit">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z" fill="#FFFFFF" />
            </svg>
          </Link>

          <Link to={`/warehouses/edit/${id}`} className="warehouse-details__edit--hidden">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z" fill="#FFFFFF" />
            </svg>
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
              <p className="warehouse-details__first-last-name">{warehouseDetails.contact_name}</p>
              <p className="warehouse-details__job-title">{warehouseDetails.contact_position}</p>
            </div>

            <div className="warehouse-details__information">
              <h4 className="warehouse-details__subtitle">CONTACT INFORMATION:</h4>
              <p className="warehouse-details__number">{warehouseDetails.contact_phone}</p>
              <p className="warehouse-details__email">{warehouseDetails.contact_email}</p>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default WarehouseDetailsComponent;