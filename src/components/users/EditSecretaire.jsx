import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function EditSecretaire() {
  const navigate = useNavigate();

  const username = sessionStorage.getItem("username");

  const newSecretaire = {
    prenom: "",
    nom: "",
    telephone: "",
    email: username,
  };

  const [secretaire, setSecretaire] = useState(newSecretaire);

  useEffect(() => {
    axios
      .get(`http://localhost:9090/api/secretaire-email/${username}`)
      .then((response) => {
        setSecretaire(response.data);
      })
      .catch((error) => {
        console.error(
          `Erreur lors de la récupération du pattient ${username}:`,
          error
        );
      });
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSecretaire((prevSecretaire) => ({
      ...prevSecretaire,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("========= secretaire : ", secretaire);

    axios
      .put(`http://localhost:9090/api/secretaire/update`, secretaire)
      .then((response) => {
        console.log("Mise à jour avec succès:", response.data);
        if (response.data.prenom !== "" && response.data.nom !== "") {
          navigate("/home");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour:", error);
      });
  };

  return (
    <div className="container">
      <div className="form-container mt-5 mb-5">
        <h2 className="mb-5">
          {secretaire.prenom === "" || secretaire.nom === ""
            ? "Completer vos informations pour pouvoir vous connecter"
            : "Mise à jour "}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3 prenom">
            <input
              type="text"
              className="form-control"
              id="prenom"
              name="prenom"
              value={secretaire.prenom}
              onChange={handleChange}
              placeholder="Prenom"
              required
            />
            <label htmlFor="prenom">Prénom</label>
          </div>
          <div className="form-floating mb-3 nom">
            <input
              type="text"
              className="form-control"
              id="nom"
              name="nom"
              value={secretaire.nom}
              onChange={handleChange}
              placeholder="Nom"
              required
            />
            <label htmlFor="nom">Nom</label>
          </div>
          <div className="telephone-email">
            <div className="form-floating mb-3 telephone">
              <input
                type="tel"
                className="form-control"
                id="telephone"
                name="telephone"
                value={secretaire.telephone}
                onChange={handleChange}
                placeholder="Téléphone"
                required
              />
              <label htmlFor="telephone">Téléphone</label>
            </div>
          </div>

          <div className="submit-goBack">
            <button type="submit" className="btn btn-primary">
              Mettre à jour
            </button>
            <Link
              to={
                secretaire.prenom === "" || secretaire.nom === ""
                  ? "/"
                  : "/home"
              }
              className="btn btn-primary"
            >
              Retour
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
