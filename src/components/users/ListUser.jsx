import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ListUser() {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const [visibleUsers, setVisibleUsers] = useState([]);
  const [keyword, setKeyword] = useState("");

  // ===========================================
  const role = sessionStorage.getItem("userRole");

  // ===========================================

  useEffect(() => {
    axios
      .get(
        `http://localhost:9090/api/users?username=${keyword}&page=${currentPage}&size=${pageSize}`
      )
      .then((response) => {
        setTotalPages(response.data.totalPages);
        setVisibleUsers(response.data.content);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des users:", error);
      });
  }, [currentPage, pageSize, keyword]);

  const confirmDelete = () => {
    return window.confirm("Êtes-vous sûr de vouloir supprimer ce user ?");
  };

  const handleDelete = (idUser) => {
    if (confirmDelete()) {
      axios
        .post(`http://localhost:9090/api/user/delete/${idUser}`)
        .then((response) => {
          // window.location.reload();
          console.log("Supprimé avec succès:", response.data);
        })
        .catch((error) => {
          console.error("Erreur lors de la suppresion:", error);
        });
      setVisibleUsers(visibleUsers.filter((user) => user.idUser !== idUser));
    }
  };

  return (
    <div className="infos-patient-container mt-5 mb-5">
      <h2 className="mb-5">Liste des users</h2>
      <div className="search-and-add">
        <div className="search">
          <input
            type="search"
            name="keyword"
            className="form-control form-control-lg"
            id="floatingSearch"
            placeholder="Rechercher..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div className="add">
          <Link type="button" to="/users/add" className="btn btn-primary">
            <i className="bi bi-person-plus-fill"></i> Ajouter un user
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
              <th scope="col">Role</th>
              <th scope="col">Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {visibleUsers &&
              visibleUsers.map((user) => (
                <tr key={user.idUser}>
                  <th scope="row">{user.idUser}</th>
                  <td>{user.prenom}</td>
                  <td>{user.nom}</td>
                  <td>{user.role}</td>
                  <td>{user.username}</td>
                  <td>
                    <Link
                      to={""}
                      onClick={() => handleDelete(user.idUser)}
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
