import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function AddConsultation() {
  const { idPatient } = useParams();
  //   console.log(idPatient);

  const newConsultation = {
    idConsultation: null,
    date: "",
    compteRendu: "",
  };

  const [consultation, setConsultation] = useState(newConsultation);

  const handleChange = (e) => {
    const val = e.target.value;
    const name = e.target.name;
    newConsultation[name] = val;
    setConsultation(newConsultation);
    console.log(consultation);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(`Debug 1: ${consultation.date}`);

    // setConsultation(newConsultation);

    axios
      .post(
        `http://localhost:9090/api/consultation/add/${idPatient}`,
        consultation
      )
      .then((response) => {
        console.log(`Debug 2: ${consultation.date}`);

        console.log("Ajouté avec succès:", response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout:", error);
      });
    //   navigate("/patients/list");
  };

  return (
    <div className="form-container mt-5 mb-5">
      <h2 className="mb-5">Ajouter un compte rendu de consultation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3 nom">
          <input
            type="date"
            className="form-control"
            id="dateConsultation"
            name="date"
            // value={value}
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
            // value={value}
            onChange={handleChange}
            style={{ height: "100px" }}
          ></textarea>
          <label htmlFor="compteRendu">Compte rendu</label>
        </div>
        <div className="submit-goBack">
          <button type="submit" className="btn btn-primary">
            Ajouter
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
  );
}
