import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewFacture() {
  const { idPatient, idFacture } = useParams();
  const newFacture = {
    idFacture: null,
    dateFacture: "",
    designation: "",
    montant: "",
  };

  const [facture, setFacture] = useState(newFacture);

  useEffect(() => {
    // Effectue une requête GET pour récupérer les détails du produit spécifique
    axios
      .get(`http://localhost:8080/api/facture/${idFacture}`)
      .then((response) => {
        setFacture(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(`Erreur lors de la récupération: `, error);
      });
  }, [idFacture]);

  return (
    <div className="infos-patient-container mt-5 mb-5">
      <h2 className="mb-5">Compte rendu de facture</h2>
      <div className="card mb-3  dm-details">
        <div className="row g-0">
          <div className="col-md-4 sp-img img-consulter-all">
            <img
              src="../../../img/assurance.jpg"
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
                    <td>{facture.dateFacture}</td>
                  </tr>
                  <tr>
                    <th scope="row">Montant</th>
                    <td>{facture.montant} TND</td>
                  </tr>
                  <tr>
                    <th scope="row">Compte rendu</th>
                    <td>
                      {facture.designation}
                      {/* Le patient a exprimé des inquiétudes concernant son régime
                      alimentaire. Un plan nutritionnel a été élaboré pour
                      soutenir la gestion de son hypertension et de son diabète. */}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="profil-actions">
                <Link
                  to={`/patients/${idPatient}/factures`}
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
