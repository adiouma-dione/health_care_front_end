import React from "react";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
// import "../node_modules/bootstrap/dist/js/bootstrap";
import "./App.css";
import Navbar from "./components/Navbar";
import Add from "./components/patients/Add";
import List from "./components/patients/List";
import Edit from "./components/patients/Edit";
import DossierMedical from "./components/dossier_medical/DossierMedical";
import ListConsultation from "./components/consultations/ListConsultation";
import AddConsultation from "./components/consultations/AddConsultation";
import EditConsultation from "./components/consultations/EditConsultation";
import ViewConsultation from "./components/consultations/ViewConsultation";
import AddTraitement from "./components/traitements/AddTraitement";
import ListTraitement from "./components/traitements/ListTraitement";
import EditTraitement from "./components/traitements/EditTraitement";
import ViewTraitement from "./components/traitements/ViewTraitement";
import Login from "./components/Login";
import AddFacture from "./components/facturations/AddFacture";
import EditFacture from "./components/facturations/EditFacture";
import ListFacture from "./components/facturations/ListFacture";
import ViewFacture from "./components/facturations/ViewFacture";
import ListRV from "./components/rendez_vous/ListRV";
import PrendreRV from "./components/rendez_vous/PrendreRV";
import Home from "./components/Home";
import EditRV from "./components/rendez_vous/EditRV";
import AddUser from "./components/users/AddUser";
import ListUser from "./components/users/ListUser";
import EditMedecin from "./components/users/EditMedecin";
import EditSecretaire from "./components/users/EditSecretaire";

// =====================================================================

// import Keycloak from "keycloak-js";
// import { httpClient } from "./HttpClient";
// // import httpClient from
// /*
//   Init Options
// */
// let initOptions = {
//   url: "http://localhost:8080/",
//   realm: "health-care",
//   clientId: "health-care-front",
// };

// let kc = new Keycloak(initOptions);

// kc.init({
//   onLoad: "login-required", // Supported values: 'check-sso' , 'login-required'
//   checkLoginIframe: true,
//   pkceMethod: "S256",
// }).then(
//   (auth) => {
//     if (!auth) {
//       window.location.reload();
//     } else {
//       /* Remove below logs if you are using this on production */
//       console.info("Authenticated");
//       console.log("auth", auth);
//       console.log("Keycloak", kc);
//       console.log("Access Token", kc.token);

//       /* http client will use this header in every request it sends */
//       httpClient.defaults.headers.common[
//         "Authorization"
//       ] = `Bearer ${kc.token}`;

//       kc.onTokenExpired = () => {
//         console.log("token expired");
//       };
//     }
//   },
//   () => {
//     /* Notify the user if necessary */
//     console.error("Authentication Failed");
//   }
// );

// ====================================================================

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container container-home">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
          <Routes>
            <Route path="/patients" element={<Outlet />}>
              <Route path="list" element={<List />} />
              <Route path="add" element={<Add />} />
              <Route path="edit/:idPatient" element={<Edit />} />
              <Route path=":idPatient/dossier" element={<DossierMedical />} />
              <Route
                path=":idPatient/consultations"
                element={<ListConsultation />}
              />
              <Route
                path=":idPatient/add-consultation"
                element={<AddConsultation />}
              />
              <Route
                path=":idPatient/edit-consultation/:idConsultation"
                element={<EditConsultation />}
              />
              <Route
                path=":idPatient/view-consultation/:idConsultation"
                element={<ViewConsultation />}
              />
              <Route
                path=":idPatient/traitements"
                element={<ListTraitement />}
              />
              <Route
                path=":idPatient/add-traitement"
                element={<AddTraitement />}
              />
              <Route
                path=":idPatient/edit-traitement/:idTraitement"
                element={<EditTraitement />}
              />
              <Route
                path=":idPatient/view-traitement/:idTraitement"
                element={<ViewTraitement />}
              />
              <Route path=":idPatient/factures" element={<ListFacture />} />
              <Route
                path=":idPatient/view-facture/:idFacture"
                element={<ViewFacture />}
              />
              <Route path=":idPatient/add-facture" element={<AddFacture />} />
              <Route path=":idPatient/edit-facture" element={<EditFacture />} />
            </Route>
            <Route path="/rendez-vous" element={<Outlet />}>
              <Route path="" element={<ListRV />} />
              <Route path=":username" element={<ListRV />} />
              <Route path="edit" element={<EditRV />} />
            </Route>

            <Route path="facture/add" element={<AddFacture />} />

            <Route path="/users" element={<Outlet />}>
              <Route path="" element={<ListUser />} />
              <Route path="add" element={<AddUser />} />
              <Route path="edit-medecin" element={<EditMedecin />} />
              <Route path="edit-secretaire" element={<EditSecretaire />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
