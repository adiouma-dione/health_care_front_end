import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  const navigate = useNavigate();

  const newPerson = {
    prenom: "",
    nom: "",
    email: "",
    role: "",
  };

  const [personne, setPersonne] = useState(newPerson);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonne((prevPersonne) => ({
      ...prevPersonne,
      [name]: value,
    }));
    // console.log(personne);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setPersonne(newPerson);

    if (personne.role === "medecin") {
      axios
        .post("http://localhost:9090/api/medecin/add", personne)
        .then((response) => {
          console.log("Ajouté avec succès:", response.data);
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout:", error);
        });
    } else if (personne.role === "secretaire") {
      axios
        .post("http://localhost:9090/api/secretaire/add", personne)
        .then((response) => {
          console.log("Ajouté avec succès:", response.data);
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout:", error);
        });
    }

    navigate("/users");
  };

  return (
    <div className="container">
      <div className="form-container mt-5 mb-5">
        <h2 className="mb-5">Nouvel utilisateur</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={personne.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="dateNaissance-sexe">
            <div className="form-floating mb-3 sexe">
              <select
                className="form-select"
                id="role"
                name="role"
                value={personne.role}
                onChange={handleChange}
                placeholder="Role"
              >
                <option defaultValue value=""></option>
                <option value="medecin">Medecin</option>
                <option value="secretaire">Secretaire</option>
              </select>
              <label htmlFor="role">Role</label>
            </div>
          </div>

          <div className="submit-goBack">
            <button type="submit" className="btn btn-primary">
              Ajouter
            </button>
            <Link to={"/users"} className="btn btn-primary">
              Retour
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
