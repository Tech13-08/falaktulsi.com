import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const basename = import.meta.env.BASE_URL;
const redirectPath = new URLSearchParams(window.location.search).get("redirect");

if (redirectPath) {
  let pathWithoutBase = redirectPath.startsWith(basename) 
    ? redirectPath.substring(basename.length) 
    : redirectPath;
  
  if (!pathWithoutBase.startsWith('/')) {
    pathWithoutBase = '/' + pathWithoutBase;
  }
  
  const finalPath = basename === '/' ? pathWithoutBase : basename.replace(/\/$/, '') + pathWithoutBase;
  window.history.replaceState({}, "", finalPath);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
