import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const tmpUsername = sessionStorage.getItem("username");
  const tmppassword = sessionStorage.getItem("password");

  const [sessionUpdated, setSessionUpdated] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:9090/api/user/${tmpUsername}`)
      .then((response) => {
        if (
          response.data.idUser === undefined ||
          tmppassword !== response.data.password
        ) {
          navigate("/");
        } else if (response.data.prenom === "" || response.data.nom === "") {
          sessionStorage.setItem("username", response.data.username);
          if (response.data.role === "medecin") {
            navigate("/users/edit-medecin");
          } else {
            navigate("/users/edit-secretaire");
          }
        } else {
          sessionStorage.setItem("idUser", response.data.idUser);
          sessionStorage.setItem("prenom", response.data.prenom);
          sessionStorage.setItem("nom", response.data.nom);
          sessionStorage.setItem("username", response.data.username);
          sessionStorage.setItem("userPassword", response.data.password);
          sessionStorage.setItem("userRole", response.data.role);
          setSessionUpdated(true);
        }
      })
      .catch((error) => {
        navigate("/");
        console.error(
          `Erreur lors du chargement du patient ${tmpUsername}`,
          error
        );
      });
  }, [tmpUsername]);

  const role = sessionStorage.getItem("userRole");
  const homeElements = {
    medecin: {
      items: ["Patients", "Rendez-vous"],
      links: ["/patients/list", "/rendez-vous"],
      icons: [
        <i className="bi bi-person-fill"></i>,
        <i className="bi bi-calendar2-date-fill"></i>,
      ],
    },
    secretaire: {
      items: ["Gérer les Rendez-vous", "Gérer les Factures"],
      links: ["/rendez-vous", "/patients/list"],
      icons: [
        <i className="bi bi-calendar2-date-fill"></i>,
        <i className="bi bi-file-earmark-medical-fill"></i>,
      ],
    },
  };

  const home = () => {
    if (!sessionUpdated) {
      return null;
    }
    if (role && role === "medecin") {
      return (
        <ul className="list-group list-group-costume-1">
          {homeElements.medecin.items.map((item, index) => {
            return (
              <li className="list-group-item list-group-item-costume-1">
                <Link to={homeElements.medecin.links[index]}>
                  {homeElements.medecin.icons[index]} &nbsp; {item}
                </Link>
              </li>
            );
          })}
        </ul>
      );
    } else if (role && role === "secretaire") {
      return (
        <ul className="list-group list-group-costume-1">
          {homeElements.secretaire.items.map((item, index) => {
            return (
              <li className="list-group-item list-group-item-costume-1">
                <Link to={homeElements.secretaire.links[index]}>
                  {/* <i className="bi bi-person-fill"></i> {item} */}
                  {homeElements.secretaire.icons[index]} &nbsp; {item}
                </Link>
              </li>
            );
          })}
        </ul>
      );
    } else {
      navigate("/");
      return null;
    }
  };
  return (
    <div className="form-container w-100 mb-5">
      <h2 className="mb-5">Accueil</h2>
      {home()}
    </div>
  );
}
