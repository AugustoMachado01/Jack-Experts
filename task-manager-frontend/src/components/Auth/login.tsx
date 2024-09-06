import React, { useState } from "react";
import "./Login.css";  
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); 
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);

      toast.success("Login successful!"); 
      navigate("/tasks");
    } catch (error: any) {
      toast.error("Email ou senha inválida");  
      console.error(error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="loginContainer">
      <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password sd"
              />
            </label>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <ToastContainer />
          <p className="forgot-password">
            <a href="/forgot-password">Forgot password?</a>
            <a href="/register"> Ou Registar-se</a>
          </p>
        </div>
    </div>
  );
};

export default Login;
