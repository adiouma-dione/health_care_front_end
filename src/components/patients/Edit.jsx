import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Edit() {

  const {idPatient} = useParams()

  const newPatient = {
    prenom: "",
    nom: "",
    dateNaissance: null,
    sexe: "",
    adresse: "",
    telephone: "",
    email: "",
  };

  const [patient, setPatient] = useState(newPatient);

  useEffect(() => {
    axios
      .get(`http://localhost:9090/api/patient/${idPatient}`)
      .then((response) => {
        setPatient(response.data);
      })
      .catch((error) => {
        console.error(
          `Erreur lors de la récupération du pattient ${idPatient}:`,
          error
        );
      });
  }, [idPatient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:9090/api/patient/update`, patient)
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
        <h2 className="mb-5">Mettre à jour un patient</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3 prenom">
            <input
              type="text"
              className="form-control"
              id="prenom"
              name="prenom"
              value={patient.prenom}
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
              value={patient.nom}
              onChange={handleChange}
              placeholder="Nom"
              required
            />
            <label htmlFor="nom">Nom</label>
          </div>
          <div className="dateNaissance-sexe">
            <div className="form-floating mb-3 dateNaissance">
              <input
                type="date"
                className="form-control"
                id="dateNaissance"
                name="dateNaissance"
                value={patient.dateNaissance}
                onChange={handleChange}
                placeholder="dateNaissance"
                required
              />
              <label htmlFor="dateNaissance">Date de naissance</label>
            </div>
            <div className="form-floating mb-3 sexe">
              <select
                className="form-select"
                id="sexe"
                name="sexe"
                value={patient.sexe}
                onChange={handleChange}
                placeholder="Sexe"
              >
                <option defaultValue value="Homme">
                  Masculin
                </option>
                <option value="Femme">Féminin</option>
              </select>
              <label htmlFor="sexe">Sexe</label>
            </div>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="adresse"
              name="adresse"
              value={patient.adresse}
              onChange={handleChange}
              placeholder="Adresse"
              required
            />
            <label htmlFor="adresse">Adresse</label>
          </div>
          <div className="telephone-email">
            <div className="form-floating mb-3 telephone">
              <input
                type="tel"
                className="form-control"
                id="telephone"
                name="telephone"
                value={patient.telephone}
                onChange={handleChange}
                placeholder="Téléphone"
                required
              />
              <label htmlFor="telephone">Téléphone</label>
            </div>
            <div className="form-floating mb-3 email">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={patient.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Mettre à jour
          </button>
        </form>
      </div>
    </div>
  );
}
