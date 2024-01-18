import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ListTraitement() {
  const { idPatient } = useParams();

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  // const [totalElements, setTotalElements] = useState(0);
  const [visibleTraitements, setVisibleTraitements] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/traitement/list?idDossier=${idPatient}&page=${currentPage}&size=${pageSize}`
      )
      .then((response) => {
        setTotalPages(response.data.totalPages);
        setVisibleTraitements(response.data.content);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des patients:", error);
      });
  }, [currentPage, pageSize, keyword]);

  const confirmDelete = () => {
    return window.confirm("Êtes-vous sûr de vouloir supprimer ?");
  };

  const handleDelete = (idTraitement) => {
    if (confirmDelete()) {
      axios
        .post(`http://localhost:8080/api/traitement/delete/${idTraitement}`)
        .then((response) => {
          // window.location.reload();
          console.log("Supprimé avec succès:", response.data);
        })
        .catch((error) => {
          console.error("Erreur lors de la suppresion:", error);
        });
      setVisibleTraitements(
        visibleTraitements.filter(
          (traitement) => traitement.idTraitement !== idTraitement
        )
      );
    }
  };

  return (
    <div className="infos-patient-container mt-5 mb-5">
      <h2 className="mb-5">Liste des traitements</h2>
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
            to={`/patients/${idPatient}/add-traitement`}
            type="button"
            className="btn btn-primary"
          >
            <i className="bi bi-person-plus-fill"></i> Ajouter un traitement
          </Link>
        </div>
      </div>
      <div className="table-container">
        <table className="table table-hover table-costum px-2">
          <thead className="table-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Medicament</th>
              <th scope="col">Date de début</th>
              <th scope="col">Statut</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {visibleTraitements &&
              visibleTraitements.map((traitement) => (
                <tr key={traitement.idTraitement}>
                  <th scope="row">{traitement.idTraitement}</th>
                  <td>{traitement.nomMedicament}</td>
                  <td>{traitement.dateDebut}</td>
                  <td>
                    {traitement.dateFin === "" ? "En cours" : "Fini"}
                  </td>
                  <td>
                    <Link
                      to={`/patients/${idPatient}/view-traitement/${traitement.idTraitement}`}
                      className="link-primary"
                    >
                      <i className="bi bi-folder2-open"></i>
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/patients/${idPatient}/edit-traitement/${traitement.idTraitement}`}
                      className="link-success"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={""}
                      onClick={() => handleDelete(traitement.idTraitement)}
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
