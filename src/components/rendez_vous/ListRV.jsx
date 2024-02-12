import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ListRV() {
  // const { username } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [totalElements, setTotalElements] = useState(0);
  const [visibleRendezVouss, setVisibleRendezVouss] = useState([]);
  const [keyword, setKeyword] = useState("");

  const username = sessionStorage.getItem("username");
  console.log("============= username : ", username);
  const [medecin, setMedecin] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:9090/api/medecin-email/${username}`)
      .then((response) => {
        setMedecin(response?.data);
        console.log("medecin : ", medecin);
      })
      .catch((error) => {
        console.error(
          `Erreur lors de la récupération du pattient ${username}:`,
          error
        );
      });
  }, [username]);

  useEffect(() => {
    // if (!isNaN(medecin.idMedecin)) {
    //   axios
    //     .get(
    //       `http://localhost:9090/api/rendezVous/medecin?idMedecin=${medecin.idMedecin}&page=${currentPage}&size=${pageSize}`
    //     )
    //     .then((response) => {
    //       setTotalPages(response.data.totalPages);
    //       setVisibleRendezVouss(response.data.content);
    //       console.log(response.data);
    //     })
    //     .catch((error) => {
    //       console.error(
    //         "Erreur lors de la récupération des rendezVouss:",
    //         error
    //       );
    //     });
    // }
    axios
      .get(
        medecin && !isNaN(medecin.idMedecin)
          ? `http://localhost:9090/api/rendezVous/medecin?idMedecin=${medecin.idMedecin}&page=${currentPage}&size=${pageSize}`
          : `http://localhost:9090/api/rendezVous/list?date=${keyword}&page=${currentPage}&size=${pageSize}`
      )
      .then((response) => {
        setTotalPages(response.data.totalPages);
        setVisibleRendezVouss(response.data.content);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des rendezVouss:", error);
      });
    // }
  }, [currentPage, pageSize, keyword, medecin]);

  const confirmDelete = () => {
    return window.confirm("Êtes-vous sûr de vouloir supprimer ce rendezVous ?");
  };

  const handleDelete = (idRendezVous) => {
    if (confirmDelete()) {
      axios
        .post(`http://localhost:9090/api/rendezVous/delete/${idRendezVous}`)
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
        <div className="search me-auto">
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
        {/* <div className="add">
          <Link type="button" to="/rendezVouss/add" className="btn btn-primary">
            <i className="bi bi-person-plus-fill"></i> Ajouter un rendezVous
          </Link>
        </div> */}
      </div>
      <div className="table-container">
        <table className="table table-hover table-costum px-2">
          <thead className="table-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Patient</th>
              <th scope="col">Médecin</th>
              <th scope="col">Statut</th>
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
                  <td>
                    {rendezVous.patient.prenom} {rendezVous.patient.nom}
                  </td>
                  <td>
                    Dr {rendezVous.medecin.prenom} {rendezVous.medecin.nom}
                  </td>
                  <td>
                    {rendezVous.isConfirmed ? (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        confirmé
                      </span>
                    ) : (
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        Non confirmé
                      </span>
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/rendezVouss/${rendezVous.idRendezVous}`}
                      className="link-primary"
                    >
                      <i className="bi bi-folder2-open"></i>
                    </Link>
                  </td>
                  <td>
                    <Link
                      // to={`/rendezVouss/edit/${rendezVous.idRendezVous}`}
                      onClick={() => {
                        sessionStorage.setItem(
                          "idRendezVous",
                          rendezVous.idRendezVous
                        );
                      }}
                      to={"/rendez-vous/edit"}
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
