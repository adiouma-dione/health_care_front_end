import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function EditMedecin() {
  const username = sessionStorage.getItem("username");

  const newMedecin = {
    prenom: "",
    nom: "",
    telephone: "",
    email: username,
    specialite: "",
    description: "",
  };

  const [medecin, setMedecin] = useState(newMedecin);

  useEffect(() => {
    axios
      .get(`http://localhost:9090/api/medecin-email/${username}`)
      .then((response) => {
        setMedecin(response.data);
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
    setMedecin((prevMedecin) => ({
      ...prevMedecin,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("========= medecin : ", medecin);

    axios
      .put(`http://localhost:9090/api/medecin/update`, medecin)
      .then((response) => {
        console.log("Mise à jour avec succès:", response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour:", error);
      });
  };

  return (
    <div className="container">
      <div className="form-container mt-5 mb-5">
        <h2 className="mb-5">
          {medecin.prenom === "" || medecin.nom === ""
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
              value={medecin.prenom}
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
              value={medecin.nom}
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
                value={medecin.telephone}
                onChange={handleChange}
                placeholder="Téléphone"
                required
              />
              <label htmlFor="telephone">Téléphone</label>
            </div>
            <div className="form-floating mb-3 dateNaissance">
              <input
                type="text"
                className="form-control"
                id="specialite"
                name="specialite"
                value={medecin.specialite}
                onChange={handleChange}
                placeholder="Specialite"
                required
              />
              <label htmlFor="specialite">Specialite</label>
            </div>
          </div>
          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              placeholder="Description"
              id="description"
              name="description"
              value={medecin.description}
              onChange={handleChange}
              style={{ height: "100px" }}
            ></textarea>
            <label htmlFor="description">Description</label>
          </div>

          <div className="submit-goBack">
            <button type="submit" className="btn btn-primary">
              Mettre à jour
            </button>
            <Link
              to={medecin.prenom === "" || medecin.nom === "" ? "/" : "/home"}
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
