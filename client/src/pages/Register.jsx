import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [file, setFile] = useState(null);
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

  //return image name with unique current date in milisecond with original image name
  const uploadUserImg = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("/uploaduserimg", formData);
      console.log(res.data);
      return res.data;
    } catch (error) {
      toast(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/register", {
        ...input,
        userImg: await uploadUserImg(),
      });

      if (res.status > 400) {
        setErr(res.response.data);
        setSuccess("");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        // fn();
      } else {
        setErr("");
        setSuccess(res.data.msg);
        toast(res.data.msg);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      setSuccess("");
      setErr(error.response.data);
      toast(error.response.data);
      // fn();
    }
  };
  return (
    <div className="auth">
      <div className="registerForm">
        <ToastContainer />
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
          <div className="input-group">
            <input
              type="file"
              name="file"
              id="file"
              required
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label className="file" htmlFor="file">
              <div
                style={{ fontWeight: "normal", textDecoration: "underline" }}
              >
                Upload Image
              </div>{" "}
              {file && <div className="imagename">{file.name}</div>}
            </label>
          </div>
          <div className="input-group btn">
            <button>Register</button>
          </div>
        </form>
        <p className={err ? "error" : "success"}>
          {(err && err) || (success && success)}
        </p>

        <Link className="link" to="/login">
          Already Registered?
        </Link>
      </div>
    </div>
  );
}

export default Register;
