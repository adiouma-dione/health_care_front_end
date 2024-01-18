import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item me-5">
                <Link to="patients/list" className="nav-link nav-items-custom">
                  <i className="bi bi-person-fill"></i>
                  <span>&nbsp;Dr Medcin</span>
                </Link>
              </li>
              <li className="nav-item me-5 px-3">
                <Link to="patients/list" className="nav-link nav-items-custom">
                  <i className="bi bi-list-ol"></i>
                  <span>&nbsp;Liste des patients</span>
                </Link>
              </li>
              <li className="nav-item me-5 px-3">
                <Link to="patients/add" className="nav-link nav-items-custom">
                  <i className="bi bi-person-add"></i>
                  <span>&nbsp;Nouveau patient</span>
                </Link>
              </li>
            </ul>
          </div>

          <span className="nav-item deconnexion">
            <Link to={"/"} className="nav-link  nav-items-custom">
              Déconnexion&nbsp;<i className="bi bi-box-arrow-right"></i>
            </Link>
          </span>
        </div>
      </nav>
    </header>
  );
}
