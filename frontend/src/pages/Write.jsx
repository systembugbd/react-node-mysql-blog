import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Write() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");

  //Editor DBounce Handler
  const editorHandler = (fn, delay) => {
    let timeId;
    return (...arg) => {
      if (timeId) {
        clearTimeout(timeId);
      }
      timeId = setTimeout(() => {
        fn(arg[0]);
      }, delay);
    };
  };

  const setValueHandler = (value) => {
    setValue(value);
  };
  const dbounce = editorHandler(setValueHandler, 500); //get Anynomous handler

  const handlerInput = (e) => {
    setTitle(e.target.value);
  };
  return (
    <div className="addarticle">
      <div className="content">
        <input
          type="text"
          placeholder="কড়া নিরাপত্তায় এক হলেন শাকিব-বুবলী"
          vlaue={title}
          onChange={handlerInput}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={dbounce}
          />
        </div>
      </div>
      <div className="settings">
        <div className="item">
          <h3>Publish</h3>
          <span>
            <b>Status</b> : Draft
          </span>
          <span>
            <b>Visibility</b> : Public
          </span>
          <input type="file" id="file" style={{ display: "none" }} />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="btn">
            <button className="draft">Save as Draft</button>
            <button className="update">Update</button>
          </div>
        </div>
        <div className="item">
          <h3>Category</h3>
          <label htmlFor="Art">
            <input id="Art" type="radio" name="cat" value="art" /> Art
          </label>
          <label htmlFor="Science">
            <input id="Science" type="radio" name="cat" value="Science" />{" "}
            Science
          </label>
          <label htmlFor="Technology">
            <input id="Technology" type="radio" name="cat" value="Technology" />{" "}
            Technology
          </label>
          <label htmlFor="Cinema">
            <input id="Cinema" type="radio" name="cat" value="Cinema" /> Cinema
          </label>
          <label htmlFor="Design">
            <input id="Design" type="radio" name="cat" value="Design" /> Design
          </label>
          <label htmlFor="Food">
            <input id="Food" type="radio" name="cat" value="Food" /> Food
          </label>
        </div>
      </div>
    </div>
  );
}

export default Write;
