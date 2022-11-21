import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

import App from "./App";
const contanier = document.getElementById("root");
const root = createRoot(contanier);

root.render(<App />);
