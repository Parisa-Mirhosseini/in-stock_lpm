import "../Header/Header.scss";
import InStockLogo1x from "../../Assets/Logo/InStock-Logo_1x.png";
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <section className="header">
                <Link to="/" label="go to homepage">
                    <img className="header__Logo" src={InStockLogo1x} alt="InStock Logo" />
                </Link>
                <div className="header__links">
                    <Link className="header__links--warehouses" style={{ textDecoration: "none" }} to="/">
                        Warehouses
                    </Link>
                    <Link className="header__links--inventory" style={{ textDecoration: "none" }} to="/inventory">
                        Inventory
                    </Link>
                </div>
            </section>
        </>
    );
}

export default Header; 