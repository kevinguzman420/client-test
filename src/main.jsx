import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App.jsx";
import "./index.css";

// axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.baseURL = 'https://servertest-7be1e94c801c.herokuapp.com/'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className=" dark text-foreground h-screen bg-background box-border ">
        <App />
      </main>
    </NextUIProvider>
  </React.StrictMode>
);
