import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(""); //"Please fill all the field" default err msg which will show on submit
  const [success, setSuccess] = useState("");
  //Context Api for Authentication
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(input);
      navigate("/");

      if (res.response.status > 400) {
        setErr(res.response.data);
        setSuccess("");
      } else {
        setSuccess(res.data);
        setErr("");
      }

      setSuccess("Login Successfull");
    } catch (error) {
      setErr(error?.response?.data);
      setSuccess("");
    }
  };

  return (
    <div className="auth">
      <div className="loginForm">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="username"
              required
              autoComplete="off"
              autoFocus
              onChange={handleInputChange}
            />
            <span>Username</span>
            <i></i>
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              required
              onChange={handleInputChange}
            />
            <span>Password</span>
            <i></i>
          </div>
          <div className="input-group btn">
            <button>Login</button>
          </div>
        </form>
        <p className={err ? "error" : "success"}>
          {(err && err) || (success && success)}
        </p>
        <Link className="link" to="/register">
          Do not have an account?
        </Link>
      </div>
    </div>
  );
}

export default Login;
