Pour gérer la navigation entre différents composants dans React, vous pouvez utiliser la bibliothèque `react-router-dom`. Voici comment vous pouvez le faire avec vos composants `ProductList` et `AddProductForm` :

1. **Installation de `react-router-dom`**:

   Assurez-vous d'installer la bibliothèque `react-router-dom` en utilisant la commande suivante :

   ```bash
   npm install react-router-dom
   ```

2. **Configuration des routes**:

   Dans votre composant principal (généralement `App.js`), configurez les routes pour vos différents composants.

   ```jsx
   // App.js

   import React from 'react';
   import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
   import ProductList from './ProductList';
   import AddProductForm from './AddProductForm';

   const App = () => {
     return (
       <Router>
         <div>
           <nav>
             <ul>
               <li>
                 <Link to="/">Accueil</Link>
               </li>
               <li>
                 <Link to="/products">Liste des produits</Link>
               </li>
               <li>
                 <Link to="/add-product">Ajouter un produit</Link>
               </li>
             </ul>
           </nav>

           <Routes>
             <Route path="/products" element={<ProductList />} />
             <Route path="/add-product" element={<AddProductForm />} />
             {/* Ajoutez d'autres routes au besoin */}
           </Routes>
         </div>
       </Router>
     );
   };

   export default App;
   ```

   Dans cet exemple, les liens de navigation sont rendus à l'aide de la balise `Link` de `react-router-dom`, et les routes sont définies avec la balise `Route`. La balise `Switch` assure que seule la première route correspondante est rendue.

3. **Utilisation des liens dans vos composants**:

   Dans vos composants `ProductList` et `AddProductForm`, vous pouvez utiliser les liens pour naviguer entre les pages.

   ```jsx
   // ProductList.js

   import React from 'react';
   import { Link } from 'react-router-dom';

   const ProductList = () => {
     return (
       <div>
         <h2>Liste des produits</h2>
         {/* Affichez la liste des produits ici */}

         {/* Utilisez le lien pour naviguer vers le formulaire d'ajout */}
         <Link to="/add-product">Ajouter un produit</Link>
       </div>
     );
   };

   export default ProductList;
   ```

   ```jsx
   // AddProductForm.js

   import React from 'react';
   import { Link } from 'react-router-dom';

   const AddProductForm = () => {
     // Votre formulaire d'ajout ici

     return (
       <div>
         <h2>Formulaire d'ajout de produit</h2>
         {/* Votre formulaire d'ajout ici */}

         {/* Utilisez le lien pour naviguer vers la liste des produits */}
         <Link to="/products">Retour à la liste des produits</Link>
       </div>
     );
   };

   export default AddProductForm;
   ```

Avec ces configurations, vous devriez pouvoir naviguer entre les différentes pages de votre application React en utilisant les liens et les routes définies avec `react-router-dom`.