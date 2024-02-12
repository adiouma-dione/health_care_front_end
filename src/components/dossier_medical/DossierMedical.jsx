import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function DossierMedical() {
  const { idPatient } = useParams();
  const [patient, setPatient] = useState({});
  const [dossierMedical, setDossierMedical] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:9090/api/patient/${idPatient}`)
      .then((response) => {
        setPatient(response.data);
        setDossierMedical(response.data.dossierMedical);
        // console.log(response.data);
        // console.log(response.data.dossierMedical);
      })
      .catch((error) => {
        console.error(
          `Erreur lors du chargement du patient ${idPatient}`,
          error
        );
      });
  }, [idPatient]);

  return (
    <div className="infos-patient-container mt-5 mb-5">
      <h2 className="mb-5">Dossier Medical du patient</h2>
      <div className="card mb-3 dm-details">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src="../../img/patient.jpg"
              className="img-fluid rounded-start"
              alt="PATIENT"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body ps-2">
              <table className="table">
                <tbody>
                  <tr>
                    <th scope="row">Prénom</th>
                    <td>{patient.prenom}</td>
                  </tr>
                  <tr>
                    <th scope="row">Nom</th>
                    <td>{patient.nom}</td>
                  </tr>
                  <tr>
                    <th scope="row">Date de naissance</th>
                    <td>{patient.dateNaissance}</td>
                  </tr>
                  <tr>
                    <th scope="row">Sexe</th>
                    <td>{patient.sexe}</td>
                  </tr>
                  <tr>
                    <th scope="row">Adresse</th>
                    <td>{patient.adresse}</td>
                  </tr>
                  <tr>
                    <th scope="row">Téléphone</th>
                    <td>{patient.telephone}</td>
                  </tr>
                  <tr>
                    <th scope="row">Email</th>
                    <td>{patient.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="voir-plus">
        <div className="card mb-3 fonctionnaalites">
          <Link
            to={`/patients/${idPatient}/consultations`}
            className="fonctionnalites-links"
          >
            <div className="row g-0 row-g-0-costume">
              <div className="col-md-4 img-dm-icons img-dm-icon-1">
              </div>
              <div className="col-md-8 card-body-container">
                <p className="card-text card-text-costum">Consultations</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="card mb-3 fonctionnaalites">
          <Link
            to={`/patients/${idPatient}/traitements`}
            className="fonctionnalites-links"
          >
            <div className="row g-0 row-g-0-costume">
              <div className="col-md-4 img-dm-icons img-dm-icon-2">
              </div>
              <div className="col-md-8 card-body-container">
                <p className="card-text card-text-costum">Traitements</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
