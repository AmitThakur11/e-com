import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./context/auth/index";
import DataProvider from "./context/data/index";
import UserProvider from "./context/user/index";
import ScrollToTop from "./utils/scrollToTop"
ReactDOM.render(
  <React.StrictMode>
    <Router>
    <ScrollToTop/>
      <AuthProvider>
        <UserProvider>
          <DataProvider>
            <App />
          </DataProvider>
        </UserProvider>
      </AuthProvider>
      
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
