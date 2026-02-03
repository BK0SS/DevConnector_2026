import "./App.css";
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Landing from "./components/layout/Landing"; 
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert"; // Removed '../src/' redundancy
import { loadUser } from "./actions/auth";
import setAuthToken from "./ustils/setAuthToken"; // Fixed typo: 'ustils' -> 'utils'
import DashBoard from "./components/dashboard/DashBoard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience"; // Fixed typo import
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Routes>
            {/* Landing Page (No Container) */}
            <Route path="/" element={<Landing />} />

            {/* Container Routes (Wrapped in container class) */}
            <Route
              path="/*"
              element={
                <section className="container">
                  <Alert />
                  <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profiles" element={<Profiles />} />
                    <Route path="/profile/:id" element={<Profile />} />

                    {/* Private Routes */}
                    <Route
                      path="/dashboard"
                      element={
                        <PrivateRoute>
                          <DashBoard />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/create-profile"
                      element={
                        <PrivateRoute>
                          <CreateProfile />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/edit-profile"
                      element={
                        <PrivateRoute>
                          <EditProfile />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/add-experience"
                      element={
                        <PrivateRoute>
                          <AddExperience />
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
                    <Route
                      path="/posts"
                      element={
                        <PrivateRoute>
                          <Posts />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/posts/:id"
                      element={
                        <PrivateRoute>
                          <Post />
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