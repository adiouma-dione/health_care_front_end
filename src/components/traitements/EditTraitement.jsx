import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function EditTraitement() {
  const { idPatient, idTraitement } = useParams();
  console.log(idPatient, idTraitement);
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

  useEffect(() => {
    // Effectue une requête GET pour récupérer les détails du produit spécifique
    axios
      .get(`http://localhost:8080/api/traitement/${idTraitement}`)
      .then((response) => {
        setTraitement(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(`Erreur lors de la récupération: `, error);
      });
  }, [idTraitement]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTraitement((prevTraitement) => ({
      ...prevTraitement,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8080/api/traitement/update`, traitement)
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
        <h2 className="mb-5">Mettre à jour une traitement</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3 w-75">
            <input
              type="text"
              className="form-control"
              id="nomMedicament"
              name="nomMedicament"
              value={traitement.nomMedicament}
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
                value={traitement.dosage}
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
                value={traitement.unite}
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
                value={traitement.frequence}
                onChange={handleChange}
                className="form-select form-select mb-3"
              >
                <option>Sélectionner</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="1O">1O</option>
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
                value={traitement.dateDebut}
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
                value={traitement.dateFin}
                onChange={handleChange}
                placeholder="Date de fin"
              />
              <label htmlFor="dateFin">Date de fin</label>
            </div>
          </div>

          <div className="submit-goBack">
            <button type="submit" className="btn btn-primary">
              Modifier
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
    </div>
  );
}
