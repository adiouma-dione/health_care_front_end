import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

const clearSession = () => {
  sessionStorage.clear();
}
  const newUser = {
    username: "",
    password: "",
  };

  const [user, setUser] = useState(newUser);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    newUser[name] = value;
    setUser(newUser);
    console.log(user);
  };

  const handleSubmit = () => {
    sessionStorage.setItem("username", user.username);
    sessionStorage.setItem("password", user.password);
    const newUser = {
      username: "",
      password: "",
    };
    setUser(newUser);
    navigate("/home");
  };

  return (
    <div className="form-container-login w-100 mb-5">
      {clearSession()}
      <h2 className="mb-5">Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3 prenom">
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            onChange={handleChange}
            placeholder="Entrer votre nom d'utilisateur"
            required
          />
          <label htmlFor="username">Email</label>
        </div>
        <div className="form-floating mb-3 prenom">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleChange}
            placeholder="Entrer votre mot de passe"
            required
          />
          <label htmlFor="password">Mot de passe</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Se connecter
        </button>
        <p className="mt-3">
          <span>Mot de passe oublié ?</span> <a href="#">Cliquez ici</a>
        </p>
      </form>
    </div>
  );
}
