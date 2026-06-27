import React from "react";
import ReactDOM from "react-dom/client";
import { Portfolio } from "./components/portfolio/Portfolio";
import "./styles.css";

const rootEl = document.getElementById("root");
if (rootEl) {
    ReactDOM.createRoot(rootEl).render(
        <React.StrictMode>
            <Portfolio />
        </React.StrictMode>
    );
}
