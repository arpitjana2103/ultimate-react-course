import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import "./index.css";

const rootEl = document.getElementById("root");
const root = ReactDom.createRoot(rootEl);

root.render(<App />);
