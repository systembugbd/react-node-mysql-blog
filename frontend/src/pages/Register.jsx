import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState(); //"Please fill all the field" default err msg which will show on submit
  const [success, setSuccess] = useState("");
  // const [fn, setFn] = useState();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //for showing message in toast not working perfectly.
  // const messageHandler = () => {
  //   const msg = success ? success : err;
  //   setFn(() => toast(msg));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/register", input);

      if (res.status > 400) {
        setErr(res.response.data);
        setSuccess("");
        // fn();
      } else {
        setErr("");
        setSuccess(res.data.msg);
        // fn();
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      setSuccess("");
      setErr(error.response.data);
      // fn();
    }
  };
  return (
    <div className="auth">
      <div className="registerForm">
        <h3>Register</h3>
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
              type="text"
              name="email"
              required
              onChange={handleInputChange}
            />
            <span>Email</span>
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
            <button>Register</button>
          </div>
        </form>
        <p className={err ? "error" : "success"}>
          {(err && err) || (success && success)}
        </p>
        <ToastContainer />
        <Link className="link" to="/login">
          Already Registered?
        </Link>
      </div>
    </div>
  );
}

export default Register;
