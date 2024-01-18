import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewConsultation() {
  const { idPatient, idConsultation } = useParams();
  const newConsultation = {
    date: "",
    compteRendu: "",
  };

  const [consultation, setConsultation] = useState(newConsultation);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/consultation/${idConsultation}`)
      .then((response) => {
        setConsultation(response.data);
      })
      .catch((error) => {
        console.error(`Erreur lors de la récupération: `, error);
      });
  }, [idConsultation]);

  return (
    <div className="infos-patient-container mt-5 mb-5">
      <h2 className="mb-5">Compte rendu de consultation</h2>
      <div className="card mb-3  dm-details">
        <div className="row g-0">
          <div className="col-md-4 sp-img img-consulter-all">
            <img
              src="../../../img/cr-consultation.jpg"
              className="img-fluid rounded-start "
              alt="PATIENT"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body ps-2">
              <table className="table">
                <tbody>
                  <tr>
                    <th scope="row">Date</th>
                    <td
                    >
                      {consultation.date}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Compte rendu</th>
                    <td
                    >
                      {consultation.compteRendu}
                      {/* Le patient a exprimé des inquiétudes concernant son régime
                      alimentaire. Un plan nutritionnel a été élaboré pour
                      soutenir la gestion de son hypertension et de son diabète. */}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="profil-actions">
                <Link
                  to={`/patients/${idPatient}/consultations`}
                  className="btn btn-primary"
                >
                  Retour
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
