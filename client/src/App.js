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
import DashBoard from "./components/dashboard/DashBoard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExpirience from "./components/profile-forms/AddExperience";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";


if(localStorage.token){
    setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Routes>
            <Route path="/" element={<Landing />} />

            {/* The '/*' path matches everything else and wraps it in the container */}
            <Route
              path="/*"
              element={
                <section className="container">
                  <Alert />
                  <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    
                    {/* FIXED: PrivateRoute is now a wrapper inside the element prop */}
                    <Route 
                      path="/dashboard" 
                      element={
                        <PrivateRoute>
                          <DashBoard />
                        </PrivateRoute>
                      } 
                    />
                    {/* create profile route*/}
                    <Route 
                      path="/create-profile" 
                      element={
                        <PrivateRoute>
                          <CreateProfile />
                        </PrivateRoute>
                      } 
                    />
                     {/* edit profile route*/}
                    <Route 
                      path="/edit-profile" 
                      element={
                        <PrivateRoute>
                          <EditProfile />
                        </PrivateRoute>
                      } 
                    />
                    {/*add expirience */}
                    <Route 
                      path="/add-experience" 
                      element={
                        <PrivateRoute>
                          <AddExpirience />
                        </PrivateRoute>
                      } 
                    />

                    <Route 
                      path="/add-education" 
                      element={
                        <PrivateRoute>
                          <AddEducation />
                        </PrivateRoute>
                      } 
                    />

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