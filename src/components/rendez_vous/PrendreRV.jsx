import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function PrendreRV() {
  const { idPatient } = useParams();
  //   console.log(idPatient);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  // const [totalElements, setTotalElements] = useState(0);
  const [visiblePatients, setVisiblePatients] = useState([]);
  const [keyword, setKeyword] = useState("");

  const newRendezVous = {
    idRendezVous: null,
    dateRendezVous: "",
    heureRendezVous: "",
    motif: "",
    status: "",
  };

  const [rendezVous, setRendezVous] = useState(newRendezVous);
  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setRendezVous((prevRendezVous) => ({
  //       ...prevRendezVous,
  //       [name]: value,
  //     }));
  //     // console.log(patient);
  //   };

  const handleChange = (e) => {
    const val = e.target.value;
    const name = e.target.name;
    newRendezVous[name] = val;
    setRendezVous(newRendezVous);
    console.log(rendezVous);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Envoyez une requête POST à l'API
    axios
      .post(`http://localhost:8080/api/rendezVous/add/${idPatient}`, rendezVous)
      .then((response) => {
        // Gérez la réponse de l'API en fonction de vos besoins
        console.log("Ajouté avec succès:", response.data);
      })
      .catch((error) => {
        // Gérez les erreurs en fonction de vos besoins
        console.error("Erreur lors de l'ajout:", error);
      });
    //   navigate("/patients/list");
  };

  useEffect(() => {
    // Faites appel à votre API Spring Boot avec les paramètres de pagination et de recherche
    axios
      .get(
        `http://localhost:8080/api/patient/list?name=${keyword}&page=${currentPage}&size=${pageSize}`
      )
      .then((response) => {
        // Mettez à jour les états liés à la pagination
        setTotalPages(response.data.totalPages);
        setVisiblePatients(response.data.content);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des patients:", error);
      });
  }, [currentPage, pageSize, keyword]);

  const imgMedecins = [
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
    setSelectedImageIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const customStyles = {
    content: {
      width: "25%", // Ajustez la largeur comme nécessaire
      margin: "auto", // Centrez le modal horizontalement
      // Autres styles personnalisés
      backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)", // Fond semi-transparent
    },
  };

  // ====================================

  return (
    <div className="infos-patient-container mt-5 mb-5">
      <h2 className="mb-5">Prendre rendez-vous</h2>
      <div className="row g-4">
        {imgMedecins.map((imgMedecin, index) => (
          <div className="dr-frofil-container" key={index}>
            <div className="card dr-frofil">
              <div
                className="card-img"
                style={{ backgroundImage: `url("/img/${imgMedecin}")` }}
              ></div>
              <div className="card-body text-center">
                <h5 className="card-title fw-semibold">Dr Médecin</h5>
                <p className="card-text">Specialité</p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => openModal(index)}
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
          contentLabel="Example Modal"
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
                  backgroundImage: `url("/img/${imgMedecins[selectedImageIndex]}")`,
                }}
              ></div>
              <div className="card-body">
                <h5 className="card-title fw-semibold text-center">
                  Dr Médecin
                </h5>
                <p className="card-text text-center">Specialité</p>
                <p className="mb-5 mt-3">
                  <h6 className=" fw-semibold">Description :</h6>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reiciendis debitis officia placeat cupiditate. Sed autem
                  reiciendis ex, illo neque laboriosam earum aperiam dolor
                  doloremque provident quidem sint cumque, enim laudantium.
                </p>
                <div className="text-center">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={closeModal}
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
