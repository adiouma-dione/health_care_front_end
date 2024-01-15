import React from "react";

export default function Home() {
  return (
      <div className="form-container w-100 mb-5">
        <h2 className="mb-5">Accueil</h2>

        <ul className="list-group list-group-costume-1">
          <li className="list-group-item list-group-item-costume-1">
            <a href="#">
              <i className="bi bi-person-fill"></i> Medecins
            </a>
          </li>
          <li className="list-group-item list-group-item-costume-1">
            <a href="#">
              <i className="bi bi-person-fill"></i> Secretaires
            </a>
          </li>
          <li className="list-group-item list-group-item-costume-1">
            <a href="#">
              <i className="bi bi-person-fill"></i> Patients
            </a>
          </li>
          <li className="list-group-item list-group-item-costume-1">
            <a href="#">
              <i className="bi bi-folder-fill"></i> Dossiers Medicaux
            </a>
          </li>
        </ul>
      </div>
  );
}
