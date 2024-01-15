import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Lister() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/patient/list?name=&page=0&size=10")
      .then((response) => {
        console.log("Réponse de l'API:", response.data);
        setPatients(response.data.content);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des produits:", error);
      });
  }, []);

  return (
    <div className="infos-patient-container mt-5 mb-5">
      <h2 className="mb-5">Liste des patients</h2>
      <div className="search-and-add">
        <div className="search">
          <form action="" method="get">
            <input
              type="text"
              name="keyword"
              className="form-control form-control-lg"
              id="floatingSearch"
              value=""
              placeholder="Rechercher..."
            />
            <button type="submit" className="btn btn-primary">
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>
        <div className="add">
          <a type="button" href="" className="btn btn-primary">
            <i className="bi bi-person-plus-fill"></i> Ajouter un patient
          </a>
        </div>
      </div>
      <div className="table-container">
        <table className="table table-hover table-costum px-2">
          <thead className="table-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Prénom</th>
              <th scope="col">Nom</th>
              <th scope="col">Date Naissance</th>
              <th scope="col">Sexe</th>
              <th scope="col">Téléphone</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {patients &&
              patients.map((patient) => (
                <tr key={patient.idPatient}>
                  <th scope="row">{patient.idPatient}</th>
                  <td>{patient.prenom}</td>
                  <td>{patient.nom}</td>
                  <td>{patient.dateNaissance}</td>
                  <td>{patient.sexe}</td>
                  <td>{patient.telephone}</td>
                  <td>
                    <a className="link-primary">
                      <i className="bi bi-folder2-open"></i>
                    </a>
                  </td>
                  <td>
                    <a className="link-success">
                      <i className="bi bi-pencil-square"></i>
                    </a>
                  </td>
                  <td>
                    <a className="link-danger">
                      <i className="bi bi-trash3"></i>
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div>
        <ul className="nav nav-pills mt-3">
          <li>
            <a className="btn btn-primary">1</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
