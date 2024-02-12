import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function EditRV() {
  const navigate = useNavigate();

  let newRV = {
    dateRendezVous: "",
    heureRendezVous: "",
    objet: "",
    isConfirmed: false,
  };
  const idRendezVous = sessionStorage.getItem("idRendezVous");

  const [rendezVous, setRendezVous] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:9090/api/rendezVous/${idRendezVous}`)
      .then((response) => {
        setRendezVous(response.data);
        console.log("========= rendez-vous : ", rendezVous);
      })
      .catch((error) => {
        console.error(
          `Erreur lors de la récupération du pattient ${idRendezVous}:`,
          error
        );
      });
  }, [idRendezVous]);
  // const [toggleCheck, setToggleCheck] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRendezVous((prevRendezVous) => ({
      ...prevRendezVous,
      [name]: value,
    }));
    console.log("========= rendez-vous : ", rendezVous);
  };

  const handleToggle = (e) => {
    newRV = rendezVous;
    newRV.isConfirmed = e.target.checked;
    setRendezVous(newRV);
    console.log("========= rendez-vous : ", rendezVous);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:9090/api/rendezVous/update`, rendezVous)
      .then((response) => {
        console.log("Mise à jour avec succès:", response.data);
        navigate("/rendez-vous");
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour:", error);
      });
  };

  return (
    <div className="container">
      <div className="form-container-login mt-5 mb-5">
        <h2 className="mb-5">Confirmer un Rendez-vous</h2>
        <form onSubmit={handleSubmit}>
          <div className="dateNaissance-sexe">
            <div className="form-floating mb-3 dateNaissance">
              <input
                type="date"
                className="form-control"
                id="dateRendezVous"
                name="dateRendezVous"
                value={rendezVous?.dateRendezVous}
                onChange={handleChange}
                placeholder="dateRendezVous"
                required
              />
              <label htmlFor="dateRendezVous">Date de Rendez Vous</label>
            </div>
            <div className="form-floating mb-3 sexe">
              <input
                type="time"
                className="form-control"
                id="heureRendezVous"
                name="heureRendezVous"
                value={rendezVous?.heureRendezVous}
                onChange={handleChange}
                placeholder="heureRendezVous"
                required
              />
              <label htmlFor="heureRendezVous">Date de Rendez Vous</label>
            </div>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="objet"
              name="objet"
              value={rendezVous?.objet}
              onChange={handleChange}
              placeholder="Objet"
              required
            />
            <label htmlFor="objet">Objet</label>
          </div>
          <div className="telephone-email">
            <div className="form-check form-switch form-check-reverse ps-0 mt-3 mb-3">
              <input
                type="checkbox"
                className="form-check-input me-2"
                name="isConfirmed"
                id="isConfirmed"
                value={rendezVous?.isConfirmed}
                onChange={handleToggle}
                autoComplete="off"
              />
              <label htmlFor="isConfirmed" className="form-check-label me-3">
                Confirmation
              </label>
            </div>
          </div>

          <div className="submit-goBack">
            <button type="submit" className="btn btn-primary">
              Mettre à jour
            </button>
            <Link to={`/rendez-vous`} className="btn btn-primary">
              Retour
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
