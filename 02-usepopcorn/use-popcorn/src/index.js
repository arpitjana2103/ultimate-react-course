import reactDom from "react-dom/client";
import App from "./App";
import "./styles.css";

const rootEl = document.getElementById("root");
const root = reactDom.createRoot(rootEl);

root.render(<App />);
