Pour créer un champ de recherche permettant de filtrer les patients par nom, vous pouvez suivre ces étapes avec React. Supposons que vous ayez un état `searchTerm` pour stocker le terme de recherche et un état `filteredPatients` pour stocker la liste des patients filtrés.

1. **Ajoutez l'état du terme de recherche et de la liste filtrée**:

   Ajoutez ces deux états dans votre composant :

   ```jsx
   const Lister = ({ patients }) => {
     const [searchTerm, setSearchTerm] = useState('');
     const [filteredPatients, setFilteredPatients] = useState([]);

     // ... rest of the component
   };
   ```

2. **Mettez à jour les patients filtrés lors du changement du terme de recherche**:

   Utilisez `useEffect` pour mettre à jour les patients filtrés chaque fois que le terme de recherche change. Vous pouvez utiliser la fonction `filter` pour filtrer les patients dont le nom contient le terme de recherche.

   ```jsx
   useEffect(() => {
     const filtered = patients.filter(patient =>
       patient.name.toLowerCase().includes(searchTerm.toLowerCase())
     );
     setFilteredPatients(filtered);
   }, [searchTerm, patients]);
   ```

3. **Ajoutez un champ de recherche dans votre rendu**:

   Ajoutez un champ de recherche où les utilisateurs peuvent saisir le terme de recherche. Associez cet élément à la fonction `setSearchTerm` pour mettre à jour l'état du terme de recherche.

   ```jsx
   return (
     <div>
       <h2>Liste des patients</h2>
       <input
         type="text"
         placeholder="Rechercher par nom"
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
       />
       <ul>
         {filteredPatients.map(patient => (
           <li key={patient.id}>{patient.name}</li>
         ))}
       </ul>
     </div>
   );
   ```

   Le champ de recherche est lié à l'état `searchTerm`, de sorte que chaque modification dans le champ mettra à jour cet état, déclenchant ainsi le filtrage des patients.

Cela devrait vous permettre d'ajouter un champ de recherche fonctionnel à votre liste de patients. Les patients affichés seront filtrés en fonction du terme de recherche saisi par l'utilisateur.