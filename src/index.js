import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import App from "./App";
import ThankYou from "./pages/thankYou";
import Decline from "./pages/decline";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/decline" element={<Decline />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
