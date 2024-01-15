import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function List() {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  // const [totalElements, setTotalElements] = useState(0);
  const [visiblePatients, setVisiblePatients] = useState([]);
  const [keyword, setKeyword] = useState("");

  console.log("Username", sessionStorage.getItem("username"));
  console.log("Password", sessionStorage.getItem("password"));

  useEffect(() => {
    // Faites appel à votre API Spring Boot avec les paramètres de pagination et de recherche
    axios
      .get(
        `http://localhost:8080/api/patient/list?name=${keyword}&page=${currentPage}&size=${pageSize}`
      )
      .then((response) => {
        // Mettez à jour les états liés à la pagination
        setTotalPages(response.data.totalPages);
        setVisiblePatients(response.data.content);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des patients:", error);
      });
  }, [currentPage, pageSize, keyword]);

  const confirmDelete = () => {
    return window.confirm("Êtes-vous sûr de vouloir supprimer ce patient ?");
  };

  const handleDelete = (idPatient) => {
    if (confirmDelete()) {
      axios
        .post(`http://localhost:8080/api/patient/delete/${idPatient}`)
        .then((response) => {
          // window.location.reload();
          // Gérez la réponse de l'API en fonction de vos besoins
          console.log("Supprimé avec succès:", response.data);
        })
        .catch((error) => {
          // Gérez les erreurs en fonction de vos besoins
          console.error("Erreur lors de la suppresion:", error);
        });
      setVisiblePatients(
        visiblePatients.filter((patient) => patient.idPatient !== idPatient)
      );
    }
  };

  return (
    <div className="infos-patient-container mt-5 mb-5">
      <h2 className="mb-5">Liste des patients</h2>
      <div className="search-and-add">
        <div className="search">
          <input
            type="search"
            name="keyword"
            className="form-control form-control-lg"
            id="floatingSearch"
            // value=""
            placeholder="Rechercher..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="add">
          <Link type="button" to="/patients/add" className="btn btn-primary">
            <i className="bi bi-person-plus-fill"></i> Ajouter un patient
          </Link>
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
            {visiblePatients &&
              visiblePatients.map((patient) => (
                <tr key={patient.idPatient}>
                  <th scope="row">{patient.idPatient}</th>
                  <td>{patient.prenom}</td>
                  <td>{patient.nom}</td>
                  <td>{patient.dateNaissance}</td>
                  <td>{patient.sexe}</td>
                  <td>{patient.telephone}</td>
                  <td>
                    <Link
                      to={`/patients/${patient.idPatient}/dossier`}
                      className="link-primary"
                    >
                      <i className="bi bi-folder2-open"></i>
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/patients/edit/${patient.idPatient}`}
                      className="link-success"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={""}
                      onClick={() => handleDelete(patient.idPatient)}
                      className="link-danger"
                    >
                      <i className="bi bi-trash3"></i>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="nav nav-pills mt-3 pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className="btn btn-primary mx-2"
            key={index}
            onClick={() => setCurrentPage(index)}
            disabled={currentPage === index}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
