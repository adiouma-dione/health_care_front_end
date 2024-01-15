import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ListFacture() {
  const { idPatient } = useParams();

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  // const [totalElements, setTotalElements] = useState(0);
  const [visibleFactures, setVisibleFactures] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    // Faites appel à votre API Spring Boot avec les paramètres de pagination et de recherche
    axios
      .get(
        `http://localhost:8080/api/facture/list?date=&idDossier=${idPatient}&page=${currentPage}&size=${pageSize}`
      )
      .then((response) => {
        // Mettez à jour les états liés à la pagination
        setTotalPages(response.data.totalPages);
        setVisibleFactures(response.data.content);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des patients:", error);
      });
  }, [currentPage, pageSize, keyword]);

  const confirmDelete = () => {
    return window.confirm("Êtes-vous sûr de vouloir supprimer ?");
  };

  const handleDelete = (idFacture) => {
    if (confirmDelete()) {
      axios
        .post(`http://localhost:8080/api/facture/delete/${idFacture}`)
        .then((response) => {
          // window.location.reload();
          // Gérez la réponse de l'API en fonction de vos besoins
          console.log("Supprimé avec succès:", response.data);
        })
        .catch((error) => {
          // Gérez les erreurs en fonction de vos besoins
          console.error("Erreur lors de la suppresion:", error);
        });
      setVisibleFactures(
        visibleFactures.filter(
          (facture) => facture.idFacture !== idFacture
        )
      );
    }
  };

  return (
    <div className="infos-patient-container mt-5 mb-5">
      <h2 className="mb-5">Liste des factures</h2>
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
            to={`/patients/${idPatient}/add-facture`}
            type="button"
            className="btn btn-primary"
          >
            <i className="bi bi-person-plus-fill"></i> Ajouter une facture
          </Link>
        </div>
      </div>
      <div className="table-container">
        <table className="table table-hover table-costum px-2">
          <thead className="table-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Montant</th>
              <th scope="col">Date</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {visibleFactures &&
              visibleFactures.map((facture) => (
                <tr key={facture.idFacture}>
                  <th scope="row">{facture.idFacture}</th>
                  <td>{facture.montant} TND</td>
                  <td>{facture.dateFacture}</td>
                  <td>
                    <Link
                      to={`/patients/${idPatient}/view-facture/${facture.idFacture}`}
                      className="link-primary"
                    >
                      <i className="bi bi-folder2-open"></i>
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/patients/${idPatient}/edit-facture/${facture.idFacture}`}
                      className="link-success"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={""}
                      onClick={() => handleDelete(facture.idFacture)}
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
