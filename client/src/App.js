import "./App.css";
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Landing from "./components/layout/landing"; // Check if file is Landing.js or landing.js
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Provider } from "react-redux";
import store from "./store";
import Alert from "../src/components/layout/Alert";
import { loadUser } from "./actions/auth";
import setAuthToken from "./ustils/setAuthToken";

if(localStorage.token){
        setAuthToken(localStorage.token);
    }

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  return (
    // pass the imported store to the Provider
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Routes>
            <Route path="/" element={<Landing />} />

            {/* Wrap all other routes in a container */}
            <Route
              path="/*"
              element={
                <section className="container">
                  <Alert />
                  <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                  </Routes>
                </section>
              }
            />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
