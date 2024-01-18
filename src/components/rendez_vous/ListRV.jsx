import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ListRV() {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [totalElements, setTotalElements] = useState(0);
  const [visibleRendezVouss, setVisibleRendezVouss] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/rendezVous/list?date=${keyword}&page=${currentPage}&size=${pageSize}`
      )
      .then((response) => {
        setTotalPages(response.data.totalPages);
        setVisibleRendezVouss(response.data.content);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des rendezVouss:", error);
      });
  }, [currentPage, pageSize, keyword]);

  const confirmDelete = () => {
    return window.confirm("Êtes-vous sûr de vouloir supprimer ce rendezVous ?");
  };

  const handleDelete = (idRendezVous) => {
    if (confirmDelete()) {
      axios
        .post(`http://localhost:8080/api/rendezVous/delete/${idRendezVous}`)
        .then((response) => {
          // window.location.reload();
          console.log("Supprimé avec succès:", response.data);
        })
        .catch((error) => {
          console.error("Erreur lors de la suppresion:", error);
        });
      setVisibleRendezVouss(
        visibleRendezVouss.filter(
          (rendezVous) => rendezVous.idRendezVous !== idRendezVous
        )
      );
    }
  };

  return (
    <div className="infos-patient-container mt-5 mb-5">
      <h2 className="mb-5">Liste des rendez Vous</h2>
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
          <Link type="button" to="/rendezVouss/add" className="btn btn-primary">
            <i className="bi bi-person-plus-fill"></i> Ajouter un rendezVous
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
              <th scope="col">Date</th>
              <th scope="col">Heure</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {visibleRendezVouss &&
              visibleRendezVouss.map((rendezVous) => (
                <tr key={rendezVous.idRendezVous}>
                  <th scope="row">{rendezVous.idRendezVous}</th>
                  <td>{rendezVous.prenom}</td>
                  <td>{rendezVous.nom}</td>
                  <td>{rendezVous.date}</td>
                  <td>{rendezVous.heure}</td>
                  <td>
                    <Link
                      to={`/rendezVouss/${rendezVous.idRendezVous}/dossier`}
                      className="link-primary"
                    >
                      <i className="bi bi-folder2-open"></i>
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/rendezVouss/edit/${rendezVous.idRendezVous}`}
                      className="link-success"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={""}
                      onClick={() => handleDelete(rendezVous.idRendezVous)}
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
