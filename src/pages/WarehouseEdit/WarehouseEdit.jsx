import React, { useState } from "react";
import "../WarehouseEdit/WarehouseEdit.scss";
import WarehouseEditForm from "../../components/WarehouseEditForm/WarehouseEditForm";
import arrowBack from "../../Assets/Icons/arrow_back-24px.svg";
import { Link } from "react-router-dom";


function WarehouseEdit() {
  return (
    <>
      <section className="form-page">
        <div className="form-page__container">
          <div className="form-page__wrap">
            <Link to="/warehouses">
              <img className="form-page__icon" src={arrowBack} alt="backarrow" />
              <h1 className="form-page__item">Edit Warehouse</h1>
            </Link>
          </div>
          <WarehouseEditForm />
        </div>
      </section>
    </>
  );
}

export default WarehouseEdit;