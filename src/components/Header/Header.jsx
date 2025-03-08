import "../Header/Header.scss";
import InStockLogo2x from "../../Assets/Logo/InStock-Logo_2x.png";
import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <>
            <section className="header">
                <div className="header__logo-wrapper">
                    <NavLink to="/" className="header__container--home" >
                        <img href="/"  className="header__container--Logo" src={InStockLogo2x} alt="InStock Logo" />
                    </NavLink>
                </div>
                <div className="header__links">
                    <NavLink className="header__links--warehouses" style={{ textDecoration: "none" }} to="/">
                        Warehouses
                    </NavLink>
                    <NavLink className="header__links--inventory" style={{ textDecoration: "none" }} to="/inventories">
                        Inventory
                    </NavLink>
                </div>
            </section>
        </>
    );
}

export default Header; 