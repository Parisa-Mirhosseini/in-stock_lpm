import "../Header/Header.scss";
import InStockLogo2x from "../../Assets/Logo/InStock-Logo_2x.png";
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <section className="header">
                <div className="header__container">
                <Link to="/" label="go to homepage">
                    <img className="header__Logo" src={InStockLogo2x} alt="InStock Logo" />
                </Link>
                </div>
                <div className="header__links">
                    <Link className="header__links--warehouses" style={{ textDecoration: "none" }} to="/">
                        Warehouses
                    </Link>
                    <Link className="header__links--inventory" style={{ textDecoration: "none" }} to="/inventories">
                        Inventory
                    </Link>
                </div>
            </section>
        </>
    );
}

export default Header; 