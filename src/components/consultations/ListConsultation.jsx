import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ListConsultation() {
  const { idPatient } = useParams();

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  // const [totalElements, setTotalElements] = useState(0);
  const [visibleConsultations, setVisibleConsultations] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    // Faites appel à votre API Spring Boot avec les paramètres de pagination et de recherche
    axios
      .get(
        `http://localhost:8080/api/consultation/list?date=&idDossier=${idPatient}&page=${currentPage}&size=${pageSize}`
      )
      .then((response) => {
        // Mettez à jour les états liés à la pagination
        setTotalPages(response.data.totalPages);
        setVisibleConsultations(response.data.content);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des patients:", error);
      });
  }, [currentPage, pageSize, keyword]);

  const confirmDelete = () => {
    return window.confirm("Êtes-vous sûr de vouloir supprimer ?");
  };

  const handleDelete = (idConsultation) => {
    if (confirmDelete()) {
      axios
        .post(`http://localhost:8080/api/consultation/delete/${idConsultation}`)
        .then((response) => {
          // window.location.reload();
          console.log("Supprimé avec succès:", response.data);
        })
        .catch((error) => {
          console.error("Erreur lors de la suppresion:", error);
        });
      setVisibleConsultations(
        visibleConsultations.filter(
          (consultation) => consultation.idConsultation !== idConsultation
        )
      );
    }
  };

  return (
    <div className="infos-patient-container mt-5 mb-5">
      <h2 className="mb-5">Liste des consultations</h2>
      <div className="search-and-add">
        <div className="search">
          <Link
            to={`/patients/${idPatient}/dossier`}
            type="button"
            className="btn btn-primary"
          >
            <i className="bi bi-folder2-open"></i> Retour au dossier
          </Link>
        </div>
        <div className="add">
          <Link
            to={`/patients/${idPatient}/add-consultation`}
            type="button"
            className="btn btn-primary"
          >
            <i className="bi bi-person-plus-fill"></i> Ajouter une consultation
          </Link>
        </div>
      </div>
      <div className="table-container">
        <table className="table table-hover table-costum px-2">
          <thead className="table-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {visibleConsultations &&
              visibleConsultations.map((consultation) => (
                <tr key={consultation.idConsultation}>
                  <th scope="row">{consultation.idConsultation}</th>
                  <td>{consultation.date}</td>
                  <td>
                    <Link
                      to={`/patients/${idPatient}/view-consultation/${consultation.idConsultation}`}
                      className="link-primary"
                    >
                      <i className="bi bi-folder2-open"></i>
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/patients/${idPatient}/edit-consultation/${consultation.idConsultation}`}
                      className="link-success"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={""}
                      onClick={() => handleDelete(consultation.idConsultation)}
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
      <div className="nav nav-pills mt-3">
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
