import React from "react";
import {Route, Routes } from "react-router-dom";
import Login from "./Pages/LoginPage/Login";
import Home from "./Pages/Home/Home";

function App() {
  return (
  
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    
  );
}

export default App;
