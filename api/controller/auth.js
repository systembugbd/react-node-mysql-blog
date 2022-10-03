import { db } from "../db.js";
import bcriptjs from "bcryptjs";

export const registerController = (res, req) => {
  const q = "SELECT * from users WHERE email = ? && username = ?";
  db.query(q, [req.body?.email, req.body?.username], (err, data) => {
    if (err) return req.json(err);
    if (data.length > 0) return req.json("User already exists");
  });

  const salt = bcriptjs.genSaltSync(10);
  const hash = bcriptjs.hashSync(req.body?.password || "Shaheb", salt);

  const q2 = "INSERT INTO users(`username`, `password`, `email`) VALUES(?)";
  const vlaues = [req.body?.username, hash, req.body?.email];
  db.query(q2, [vlaues], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0)
      return res.json("Registration failed, Can't Insert data into database");
    if (data.length > 0)
      return res.status(201).json("Registration Successfull");
  });
};

export const loginController = (res, req) => {
  req.json({ login: "login" });
};

export const logoutController = (res, req) => {
  req.json("Logout is working");
};
