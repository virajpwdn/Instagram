import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ToggleDarkMode from "./components/ui/ToggleDarkMode.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
      <App />
    </StrictMode>
);
