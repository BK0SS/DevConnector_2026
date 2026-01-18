import './App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/landing'; // Check if file is Landing.js or landing.js
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    // pass the imported store to the Provider
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Routes>
            <Route path="/" element={<Landing />} />
            
            <Route path="/register" element={
              <section className="container">
                <Register />
              </section>
            } />

            <Route path="/login" element={
              <section className="container">
                <Login />
              </section>
            } />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;