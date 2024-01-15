import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewTraitement() {
  const { idPatient, idTraitement } = useParams();
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
      })
      .catch((error) => {
        console.error(`Erreur lors de la récupération: `, error);
      });
  }, [idTraitement]);

  return (
    <div class="container">
      <div class="infos-patient-container mt-5 mb-5">
        <h2 class="mb-5">Traitement</h2>
        <div class="card mb-3 dm-details">
          <div class="row g-0">
            <div class="col-md-4 sp-img img-consulter-all">
              <img
                src="../../../img/traitement.jpg"
                class="img-fluid rounded-start "
                alt="PATIENT"
              />
            </div>
            <div class="col-md-8">
              <div class="card-body ps-2">
                <table class="table">
                  <tbody>
                    <tr>
                      <th scope="row">Médicament</th>
                      <td>{traitement.nomMedicament}</td>
                    </tr>
                    <tr>
                      <th scope="row">Dosage</th>
                      <td>{traitement.dosage + " " + traitement.unite}</td>
                    </tr>
                    <tr>
                      <th scope="row">Fréquence</th>
                      <td>{traitement.frequence} fois par jour</td>
                    </tr>
                    <tr>
                      <th scope="row">Date de début</th>
                      <td>{traitement.dateDebut}</td>
                    </tr>
                    <tr>
                      <th scope="row">Date de fin</th>
                      <td>
                        {traitement.dateFin === ""
                          ? "Non déterminée"
                          : traitement.dateFin}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Statut</th>
                      <td>{traitement.dateFin === "" ? "En cours" : "Fini"}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="profil-actions">
                  <Link
                    to={`/patients/${idPatient}/traitements`}
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
    </div>
  );
}
