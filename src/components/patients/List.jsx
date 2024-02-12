import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function List() {
  // localStorage.setItem("data", data);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  // const pageSize = 2
  const [pageSize, setPageSize] = useState(5);
  // const [totalElements, setTotalElements] = useState(0);
  const [visiblePatients, setVisiblePatients] = useState([]);
  // const [visiblePatients, setVisiblePatients] = useState(data);
  const [keyword, setKeyword] = useState("");

  // ===========================================
  const username = sessionStorage.getItem("username");
  const role = sessionStorage.getItem("userRole");
  console.log("Username : ", username);
  console.log("Role : ", role);

  // ===========================================

  useEffect(() => {
    axios
      .get(
        `http://localhost:9090/api/patient/list?name=${keyword}&page=${currentPage}&size=${pageSize}`
      )
      .then((response) => {
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
        .post(`http://localhost:9090/api/patient/delete/${idPatient}`)
        .then((response) => {
          // window.location.reload();
          console.log("Supprimé avec succès:", response.data);
        })
        .catch((error) => {
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
          {role === "medecin" ? (
            <Link type="button" to="/patients/add" className="btn btn-primary">
              <i className="bi bi-person-plus-fill"></i> Ajouter un patient
            </Link>
          ) : null}
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
              {role === "medecin" ? (
                <>
                  <th></th>
                  <th></th>
                  <th></th>
                </>
              ) : (
                <th></th>
              )}
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
                  {/* role et non username */}
                  {role === "medecin" ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      <td>
                        <Link
                          // to={`/facture/${patient.idPatient}/add`}
                          onClick={() => {
                            sessionStorage.setItem(
                              "idPatient",
                              patient.idPatient
                            );
                          }}
                          to={`/facture/add`}
                          className="link-primary"
                        >
                          <i className="bi bi-file-earmark-medical-fill"></i>
                        </Link>
                      </td>
                      {/* <td>
                        <Link
                          // to={`/facture/${patient.idPatient}/add`}
                          onClick={() => {
                            sessionStorage.setItem(
                              "idPatient",
                              patient.idPatient
                            );
                          }}
                          to={`/facture/list`}
                          className="link-success"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </Link>
                      </td> */}
                    </>
                  )}
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
