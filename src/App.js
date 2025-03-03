import React from "react";
import {Route, Routes } from "react-router-dom";
import Login from "./Pages/LoginPage/Login";
import Home from "./Pages/Home/Home";
import Signup from "./Pages/Signup/Signup";

function App() {
  return (
  
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    
  );
}

export default App;
