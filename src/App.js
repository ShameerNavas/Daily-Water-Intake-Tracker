import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import WaterIntake from "./components/WaterIntake";
import WaterList from "./components/WaterList";
import WaterFilter from "./components/WaterFilter";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("loggedInUser")));
  const [waterEntries, setWaterEntries] = useState(
    JSON.parse(localStorage.getItem("waterEntries")) || []
  );


  return (
    <Router>
      {/* Navbar shows only if user is logged in */}
      {user && <Navbar setUser={setUser} />}
      <div className="container mt-4">
        <Routes>
          {/* Redirect to /intake if logged in, else /signup */}
          <Route
            path="/"
            element={user ? <Navigate to="/intake" /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          {/* Pass setUser to Login so it can update global user state */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          {/* Protected routes */}
          <Route
  path="/intake"
  element={user ? <WaterIntake waterEntries={waterEntries} setWaterEntries={setWaterEntries} /> : <Navigate to="/login" />}
/>
<Route
  path="/list"
  element={user ? <WaterList waterEntries={waterEntries} setWaterEntries={setWaterEntries} /> : <Navigate to="/login" />}
/>

          <Route path="/filter" element={user ? <WaterFilter /> : <Navigate to="/login" />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
