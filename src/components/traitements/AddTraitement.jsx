import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function AddTraitement() {
  const { idPatient } = useParams();
  //   console.log(idPatient);

  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const newTraitement = {
    idTraitement: null,
    nomMedicament: "",
    dosage: "",
    unite: "",
    frequence: "",
    dateDebut: "",
    dateFin: "",
  };

  const [traitement, setTraitement] = useState(newTraitement);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    newTraitement[name] = value;
    setTraitement(newTraitement);
    console.log(traitement);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:9090/api/traitement/add/${idPatient}`, traitement)
      .then((response) => {
        console.log("Ajouté avec succès:", response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout:", error);
      });
    //   navigate("/patients/list");
  };

  return (
    <div className="form-container mt-5 mb-5">
      <h2 className="mb-5">Ajouter un compte rendu de traitement</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3 w-75">
          <input
            type="text"
            className="form-control"
            id="nomMedicament"
            name="nomMedicament"
            onChange={handleChange}
            placeholder="Médicament"
            required
          />
          <label htmlFor="nomMedicament">Médicament</label>
        </div>
        <div className="row g-2 mtd-select-costume">
          <div className="form-floating mb-3 col-auto">
            <input
              type="text"
              className="form-control"
              id="dosage"
              name="dosage"
              onChange={handleChange}
              placeholder="Dosage"
              required
            />
            <label htmlFor="dosage">Dosage</label>
          </div>
          <div className="col-auto">
            <select
              id="unite"
              name="unite"
              onChange={handleChange}
              className="form-select form-select-lg mb-3"
            >
              <option>unité</option>
              <option value="ml">ml</option>
              <option value="mg">mg</option>
            </select>
          </div>
        </div>
        <div className="row g-3 mtf-select-costume">
          <div className="col-auto me-3">
            <label htmlFor="frequence" className="col-form-label">
              Fréquence
            </label>
          </div>
          <div className="col-auto">
            <select
              id="frequence"
              name="frequence"
              onChange={handleChange}
              className="form-select form-select mb-3"
            >
              <option>Sélectionner</option>
              {options.map(option => (
                <option value={option}>{option}</option>                
              ))}
            </select>
          </div>
          <div className="col-auto">
            <span id="frequence" className="form-text">
              fois par jour
            </span>
          </div>
        </div>
        <div className="row g-2 mtf-select-costume">
          <div className="form-floating mb-3 col-auto">
            <input
              type="date"
              className="form-control"
              id="dateDebut"
              name="dateDebut"
              onChange={handleChange}
              placeholder="Date de début"
              required
            />
            <label htmlFor="dateDebut">Date de début</label>
          </div>
          <div className="form-floating mb-3 col-auto">
            <input
              type="date"
              className="form-control"
              id="dateFin"
              name="dateFin"
              onChange={handleChange}
              placeholder="Date de fin"
            />
            <label htmlFor="dateFin">Date de fin</label>
          </div>
        </div>

        <div className="submit-goBack">
          <button type="submit" className="btn btn-primary">
            Ajouter
          </button>
          <Link
            to={`/patients/${idPatient}/traitements`}
            className="btn btn-primary"
          >
            Retour
          </Link>
        </div>
      </form>
    </div>
  );
}
