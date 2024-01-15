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

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container container-home">
          <Routes>
            <Route path="/" element={<Login />} />
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
              <Route path="take" element={<PrendreRV />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
