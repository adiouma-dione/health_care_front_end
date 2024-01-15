import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function AddFacture() {
  const { idPatient } = useParams();
  //   console.log(idPatient);

  const newFacture = {
    idFacture: null,
    dateFacture: "",
    designation: "",
    montant: "",
  };

  const [facture, setFacture] = useState(newFacture);
  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFacture((prevFacture) => ({
  //       ...prevFacture,
  //       [name]: value,
  //     }));
  //     // console.log(patient);
  //   };

  const handleChange = (e) => {
    const val = e.target.value;
    const name = e.target.name;
    newFacture[name] = val;
    setFacture(newFacture);
    console.log(facture);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Envoyez une requête POST à l'API
    axios
      .post(
        `http://localhost:8080/api/facture/add/${idPatient}`,
        facture
      )
      .then((response) => {
        // Gérez la réponse de l'API en fonction de vos besoins
        console.log("Ajouté avec succès:", response.data);
      })
      .catch((error) => {
        // Gérez les erreurs en fonction de vos besoins
        console.error("Erreur lors de l'ajout:", error);
      });
    //   navigate("/patients/list");
  };

  return (
    <div className="container">
      <div className="form-container mt-5 mb-5">
        <h2 className="mb-5">Ajouter une facture</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3 nom">
            <input
              type="number"
              className="form-control"
              id="montant"
              name="montant"
              // value={value}
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
              // value={value}
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
              // value={value}
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
