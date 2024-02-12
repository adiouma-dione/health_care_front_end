import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function PrendreRV() {
  const newRendezVous = {
    idRendezVous: null,
    dateRendezVous: "",
    heureRendezVous: "",
    motif: "",
    status: "",
  };

  const [rendezVous, setRendezVous] = useState(newRendezVous);

  const { idPatient } = useParams();
  const [idMedecin, setIdMedecin] = useState(null);
  // let idMedecin = 0;
  //   console.log(idPatient);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  // const [totalElements, setTotalElements] = useState(0);
  const [visibleMedecins, setVisibleMedecins] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [currentProfile, setCurrentProfile] = useState();

  const handleChange = (e) => {
    const val = e.target.value;
    const name = e.target.name;
    newRendezVous[name] = val;
    setRendezVous(newRendezVous);
    console.log(rendezVous);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // setIdMedecin(selectedImageIndex + 1);
    // console.log(`index: ${index}`);
    console.log(`idMedecin: ${idMedecin}`);

    axios
      .post(
        `http://localhost:9090/api/rendezVous/add/${idMedecin}/${idMedecin}`,
        rendezVous
      )
      .then((response) => {
        console.log("Ajouté avec succès:", response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout:", error);
      });
      // navigate("/patients/list");
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:9090/api/medecin/list?name=${keyword}&page=${currentPage}&size=${pageSize}`
      )
      .then((response) => {
        setTotalPages(response.data.totalPages);
        setVisibleMedecins(response.data.content);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération : ", error);
      });
  }, [currentPage, pageSize, keyword]);

  const medecins = [
    "m9.png",
    "m2.png",
    "m3.png",
    "m4.png",
    "m10.png",
    "m6.png",
    "m7.png",
    "m8.png",
  ];
  // =====================================

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openModal = (index) => {
    // console.log("idMedecin in openModal : " + idMedecin);
    setSelectedImageIndex(index);
    // setCurrentProfile(visibleMedecins(index));
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const customStyles = {
    content: {
      width: "25%",
      margin: "auto",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  };

  // ====================================

  return (
    <div className="infos-patient-container mt-5 mb-5">
      <h2 className="mb-5">Prendre rendez-vous</h2>
      <div className="row g-4">
        {visibleMedecins.map((medecin, index) => (
          <div className="dr-frofil-container" key={index}>
            <div className="card dr-frofil">
              <div
                className="card-img"
                style={{ backgroundImage: `url("/img/${medecin}")` }}
              ></div>
              <div className="card-body text-center">
                <h5 className="card-title fw-semibold">
                  Dr {medecin.prenom} {medecin.nom}
                </h5>
                <p className="card-text"> {medecin.specialite}</p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    openModal(index);
                    setCurrentProfile(medecin);
                    setIdMedecin(medecin.idMedecin)
                  }}
                >
                  Voir plus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="nav nav-pills mt-3 pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className="btn btn-primary mx-2"
            key={index}
            onClick={() => setCurrentPage(index)}
            disabled={currentPage === index}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Modal"
          style={customStyles}
        >
          {selectedImageIndex !== null && (
            <>
              <div className="text-end mb-3">
                <button className="btn btn-danger btn-sm" onClick={closeModal}>
                  Fermer
                </button>
              </div>
              <div
                className="card-img-modal"
                style={{
                  backgroundImage: `url("/img/${medecins[selectedImageIndex]}")`,
                }}
              ></div>
              <div className="card-body">
                <h5 className="card-title fw-semibold text-center">
                  Dr {currentProfile.prenom} {currentProfile.nom}
                </h5>
                <p className="card-text text-center">
                  {currentProfile.specialite}
                </p>
                <div className="mb-5 mt-3">
                  <h6 className=" fw-semibold">Description :</h6>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reiciendis debitis officia placeat cupiditate. Sed autem
                  reiciendis ex, illo neque laboriosam earum aperiam dolor
                  doloremque provident quidem sint cumque, enim laudantium.
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleSubmit}
                  >
                    Demander un Rendez-vous
                  </button>
                </div>
              </div>
            </>
          )}
        </Modal>
      </div>
    </div>
  );
}
