import React, { useState } from "react";
import "./Register.css";  
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); 
    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);

      toast.success("Register successful!"); // Toast notification on success
      navigate("/tasks");
    } catch (error: any) {
      console.log(error);
      
      toast.error(error.response.data.error); // Toast notification on error
      console.error(error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="RegisterContainer">
      <div className="Register-form">
          <h2>Cadastrar-se</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Nome:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Coloque o seu Nome"
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Coloque o seu Email"
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Coloque a sua Palavra Passe"
              />
            </label>
            <button type="submit" disabled={isLoading} className="button">
              {isLoading ? "Logging in..." : "Cadastrar-se"}
            </button>
          </form>
          <ToastContainer />
          <p className="forgot-password">
            <a href="/forgot-password">Esqueceu a PalavraPasse?</a>
            <a href="/"> Ou Entrar</a>
          </p>
        </div>
    </div>
  );
};

export default Register;
