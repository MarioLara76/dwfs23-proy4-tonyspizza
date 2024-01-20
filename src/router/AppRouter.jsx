import React, {
    useState,
    useEffect
  } from 'react';
  import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Link,
    Outlet
  } from "react-router-dom";
 
  import NavBar from "../components/NavBar";
  import Footer from "../components/Footer";
  import ReservacionesPage from "../pages/ReservacionesPage";
  import HomePage from "../pages/HomePage";
  import AboutPage from "../pages/AboutPage";
  import MenuPage from '../pages/MenuPage';
  import '../assets/css/styles.css';
  
  const AppRouter = () => {

    useEffect(() => {
        console.log('AppRouter: useEffect');
    });

    return (
      <Router>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/reservaciones" element={<ReservacionesPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    );
  };
  
  export default AppRouter;