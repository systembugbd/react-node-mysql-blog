import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import moment from "moment";
import { useLocation } from "react-router-dom";

function Write() {
  const state = useLocation().state;

  const [title, setTitle] = useState(state?.title || "");
  const [desc, setDesc] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  //Editor DBounce Handler
  // const editorHandler = (fn, delay) => {
  //   let timeId;
  //   return (...arg) => {
  //     if (timeId) {
  //       clearTimeout(timeId);
  //     }
  //     timeId = setTimeout(() => {
  //       fn(arg[0]);
  //     }, delay);
  //   };
  // };

  // const setValueHandler = (value) => {
  //   setValue(value);
  // };
  // const dbounce = editorHandler(setValueHandler, 500); //get Anynomous handler

  const handleUploadImage = () => {};

  const handleSubmit = async (e) => {
    const data = {
      title,
      desc,
      file: Date.now() + "_" + file.name,
      date: moment("YYYY MM DD HH:MM:SS").fromNow(),
      cat,
    };
    console.log(data);
    const res = await axios.post("/posts/", data);
    console.log(res);
  };
  return (
    <div className="addarticle">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={desc}
            placeholder="Description"
            onChange={(e) => setDesc(e)}
          />
        </div>
      </div>
      <div className="settings">
        <div className="item">
          <h3>Publish</h3>
          <span>
            <b>Status</b> : publish
          </span>
          <span>
            <b>Visibility</b> : Public
          </span>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            <span style={{ fontWeight: "normal", textDecoration: "underline" }}>
              Upload Image
            </span>{" "}
            {file && <span className="imagename">{file.name}</span>}
          </label>

          <div className="btn">
            <button className="draft" onClick={handleSubmit}>
              Save as Draft
            </button>
            <button className="update" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </div>
        <div className="item">
          <h3>Category</h3>
          <label htmlFor="Art">
            <input
              id="Art"
              type="radio"
              name="cat"
              checked={cat == "art"}
              value="art"
              onChange={(e) => setCat(e.target.value)}
            />{" "}
            Art
          </label>
          <label htmlFor="Science">
            <input
              id="Science"
              type="radio"
              name="cat"
              checked={cat == "science"}
              value="science"
              onChange={(e) => setCat(e.target.value)}
            />{" "}
            Science
          </label>

          <label htmlFor="Technology">
            <input
              id="Technology"
              type="radio"
              name="cat"
              checked={cat == "technology"}
              value="technology"
              onChange={(e) => setCat(e.target.value)}
            />{" "}
            Technology
          </label>
          <label htmlFor="Cinema">
            <input
              id="Cinema"
              type="radio"
              name="cat"
              checked={cat == "cinema"}
              value="cinema"
              onChange={(e) => setCat(e.target.value)}
            />{" "}
            Cinema
          </label>
          <label htmlFor="Design">
            <input
              id="Design"
              type="radio"
              name="cat"
              checked={cat == "design"}
              value="design"
              onChange={(e) => setCat(e.target.value)}
            />{" "}
            Design
          </label>
          <label htmlFor="Food">
            <input
              id="Food"
              type="radio"
              name="cat"
              checked={cat == "food"}
              value="food"
              onChange={(e) => setCat(e.target.value)}
            />{" "}
            Food
          </label>
        </div>
      </div>
    </div>
  );
}

export default Write;
