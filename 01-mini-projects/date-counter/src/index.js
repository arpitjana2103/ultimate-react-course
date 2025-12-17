import reactDom from "react-dom/client";
import App from "./App.jsx";

const rootEle = document.getElementById("root");
const root = reactDom.createRoot(rootEle);

root.render(<App />);
