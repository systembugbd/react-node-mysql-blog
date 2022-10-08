import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/posts.js";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(cors());
app.use(
  "http://localhost:8800/api/",
  createProxyMiddleware({
    target: "http://localhost:3000/", //original url
    changeOrigin: true,
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    },
  })
);

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.listen(8800, () => {
  console.log("port listning... 8800");
});
