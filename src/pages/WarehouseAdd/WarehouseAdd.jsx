import "../WarehouseAdd/WarehouseAdd.scss";
import arrowBack from "../../assets/Icons/arrow_back-24px.svg";
import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";


function WarehouseAdd() {
    return (
        <>
            <section className="warehouseadd">
                <div className="warehouseadd__container">
                    <div className="warehouseadd__container--pagelabel">
                        <Link to="/" label="go to homepage">
                            <img className="warehouseadd__container--backarrow" src={arrowBack} alt="backarrow" />
                            <h1>Add New Warehouses</h1>
                        </Link>
                    </div>
                    <section className="warehouseadd__container__form">
                        <div className="warehouseadd__container__form--wrehouse--Details">
                            <h2>Warehouse Details</h2>
                            <form>
                                Warehouse Name
                                <input></input>
                                Street Address
                                <input></input>
                                City
                                <input></input>
                                Country
                                <input></input>
                            </form>
                        </div>
                        <div className="warehouseadd__container__form--contact--Details">
                            <h2>Contact Details</h2>
                            Contact Name
                            <input></input>
                            Position
                            <input></input>
                            Phone Number
                            <input></input>
                            Email
                            <input></input>
                        </div>
                        <section className="warehouseadd__buttons">
                            <button className="warehouseadd__buttons--cancel" type="cancel">Cancel</button>
                            <button className="warehouseadd__buttons--save" type="save">Save</button>
                        </section>

                    </section>
                </div>

            </section>
        </>
    );
}

export default WarehouseAdd; 