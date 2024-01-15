import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Test() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Effectue une requête GET pour récupérer la liste des produits
    axios
      .get("http://localhost:8080/api/patient/list?name=&page=0&size=3")
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des produits:", error);
      });
  }, []); // Le tableau vide indique que cet effet ne s'exécute qu'une fois lors du montage du composant

  console.log(patients.content);

  return <div>test</div>;
}
