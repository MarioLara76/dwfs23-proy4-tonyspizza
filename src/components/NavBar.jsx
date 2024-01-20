import React from 'react'
import { NavLink } from 'react-router-dom' //Para navegar entre pages

const NavBar = () => {
  return (
    <>
    <nav className="navbar navbar-light bg-light fixed-top">
        <div className="container-fluid">
            <a className="navbar-brand fw-bolder fst-italic" href="#">Tonny's Pizza</a>
            <img src="./assets/images/tonnys_logo.jpg" alt="Tonny\'s Pizza Logo" width="100" height="75" className="d-inline-block align-text-top" />
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                    <img src="./assets/images/tonnys_logo.jpg" alt="Tonny\'s Pizza Logo" width="70" height="70" className="d-inline-block align-text-top" />
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Tonny's Pizza</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li className="nav-item">
                            <NavLink to="/home" className="nav-link" aria-current="page" >Inicio</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about" className="nav-link" aria-current="page" >Nosotros</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/menu" className="nav-link" aria-current="page" >Men&uacute;</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/reservaciones" className="nav-link" aria-current="page" >Reservar</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="offcanvas-footer">
                    @2024 - Omniverse, Inc.
                </div>
            </div>
        </div>
        </nav>
    </>
  )
}

export default NavBar