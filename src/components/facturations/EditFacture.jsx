import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function EditFacture() {
  const { idPatient, idFacture } = useParams();
  console.log(idPatient, idFacture);
  const newFacture = {
    dateFacture: "",
    designation: "",
    montant: "",
  };

  const [facture, setFacture] = useState(newFacture);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/facture/${idFacture}`)
      .then((response) => {
        setFacture(response.data);
        
      })
      .catch((error) => {
        console.error(`Erreur lors de la récupération: `, error);
      });
  }, [idFacture]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacture((prevFacture) => ({
      ...prevFacture,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8080/api/facture/update`, facture)
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
        <h2 className="mb-5">Mettre à jour une facture</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3 nom">
            <input
              type="number"
              className="form-control"
              id="montant"
              name="montant"
              value={facture.montant}
              onChange={handleChange}
              placeholder="Montant"
              required
            />
            <label htmlFor="montant">Montant</label>
          </div>
          <div className="form-floating mb-3 nom">
            <input
              type="date"
              className="form-control"
              id="dateFacture"
              name="dateFacture"
              value={facture.dateFacture}
              onChange={handleChange}
              placeholder="Date"
              required
            />
            <label htmlFor="dateFacture">Date</label>
          </div>
          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              placeholder="Designation"
              id="designation"
              name="designation"
              value={facture.designation}
              onChange={handleChange}
              style={{ height: "100px" }}
            ></textarea>
            <label htmlFor="designation">Designation</label>
          </div>
          <div className="submit-goBack">
            <button type="submit" className="btn btn-primary">
              Ajouter
            </button>
            <Link
              to={`/patients/${idPatient}/factures`}
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
