import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function EditConsultation() {
  const { idPatient, idConsultation } = useParams();
  console.log(idPatient, idConsultation);
  const newConsultation = {
    date: "",
    compteRendu: "",
  };

  const [consultation, setConsultation] = useState(newConsultation);

  useEffect(() => {
    // Effectue une requête GET pour récupérer les détails du produit spécifique
    axios
      .get(`http://localhost:8080/api/consultation/${idConsultation}`)
      .then((response) => {
        setConsultation(response.data);
        
      })
      .catch((error) => {
        console.error(`Erreur lors de la récupération: `, error);
      });
  }, [idConsultation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsultation((prevConsultation) => ({
      ...prevConsultation,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Effectue une requête PUT pour mettre à jour le consultation
    axios
      .put(`http://localhost:8080/api/consultation/update`, consultation)
      .then((response) => {
        console.log("Mise à jour avec succès:", response.data);
        // Ajoutez un code pour gérer la réussite de la mise à jour
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour:", error);
        // Ajoutez un code pour gérer les erreurs de mise à jour
      });
  };

  return (
    <div className="container">
      <div className="form-container mt-5 mb-5">
        <h2 className="mb-5">Mettre à jour une consultation</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3 nom">
            <input
              type="date"
              className="form-control"
              id="dateConsultation"
              name="date"
              value={consultation.date}
              onChange={handleChange}
              placeholder="Date de consultation"
              required
            />
            <label htmlFor="dateConsultation">Date de consultation</label>
          </div>
          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              placeholder="Compte rendu"
              id="compteRendu"
              name="compteRendu"
              value={consultation.compteRendu}
              onChange={handleChange}
              style={{ height: "100px" }}
            ></textarea>
            <label htmlFor="compteRendu">Compte rendu</label>
          </div>
          <div className="submit-goBack">
            <button type="submit" className="btn btn-primary">
              Mettre à jour
            </button>
            <Link
              to={`/patients/${idPatient}/consultations`}
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
