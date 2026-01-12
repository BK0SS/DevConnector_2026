import './App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // 1. Switch -> Routes
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const App = () => {
  return (
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
  );
}

export default App;
