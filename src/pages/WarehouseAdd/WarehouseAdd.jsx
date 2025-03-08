import React, { useState } from "react";
import "../WarehouseAdd/WarehouseAdd.scss";
import WarehouseAddForm from "../../components/WarehouseAddForm/WarehouseAddForm"
import arrowBack from "../../Assets/Icons/arrow_back-24px.svg";
import { Link } from "react-router-dom";

function WarehouseAdd() {
  return (
    <>
      <section className="form-page">
        <div className="form-page__container">
          <div className="form-page__wrap">
            <Link to="/" label="go to homepage">
              <img className="form-page__icon" src={arrowBack} alt="backarrow" />
              <h1 className="form-page__item">Add New Warehouse</h1>
            </Link>
          </div>
        </div>
      </section>
      <WarehouseAddForm />
    </>
  );
}

export default WarehouseAdd;