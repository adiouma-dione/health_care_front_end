import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const username = sessionStorage.getItem("username");
  const prenom = sessionStorage.getItem("prenom");
  const nom = sessionStorage.getItem("nom");
  const role = sessionStorage.getItem("userRole");

  const shouldDisplayNavbar = () => {
    return (
      location.pathname !== "/" && username !== undefined && username !== ""
    );
  };

  const handleDisconnect = () => {
    sessionStorage.clear();
  };

  if (!shouldDisplayNavbar()) {
    return null;
  }

  const editUserPath = () => {
    if (role === "medecin") {
      return "/users/edit-medecin";
    } else if (role === "secretaire") {
      return "/users/edit-secretaire";
    }
  };

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
            <ul className="navbar-nav w-100 mb-2 mb-lg-0">
              <li className="nav-item me-5">
                <Link to={editUserPath()} className="nav-link nav-items-custom">
                  <i className="bi bi-person-fill"></i>
                  {role === "medecin" ? (
                    <span>&nbsp; Dr {prenom + " " + nom}</span>
                  ) : (
                    <span>&nbsp; {prenom + " " + nom}</span>
                  )}
                </Link>
              </li>
              <li className="nav-item ms-auto px-3">
                <Link to="home" className="nav-link nav-items-custom">
                  <i className="bi bi-house-door-fill"></i>
                  {/* <span>&nbsp;Liste des patients</span> */}
                </Link>
              </li>
            </ul>
          </div>

          <span className="nav-item deconnexion">
            <Link
              onClick={handleDisconnect}
              to={"/"}
              className="nav-items-custom"
            >
              {/* Déconnexion&nbsp; */}
              {/* <i className="bi bi-box-arrow-right"></i> */}
              <i className="bi bi-arrow-right-square-fill"></i>
            </Link>
          </span>
        </div>
      </nav>
    </header>
  );
}
