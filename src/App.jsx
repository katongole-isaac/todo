import React from "react";
import "./app.css";
import data from "./data.toml";

export default function () {
  return (
    <>
      <div>
        <h2>Welcome to react</h2>
      </div>
      <div className="footer">
        <p>Developed by {data.name} </p>
      </div>
    </>
  );
}
