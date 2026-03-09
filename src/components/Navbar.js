import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ setUser }) {
  const navigate = useNavigate();
  const [user, setLocalUser] = useState(JSON.parse(localStorage.getItem("loggedInUser")));

  // Update Navbar when loggedInUser changes in localStorage
  useEffect(() => {
    setLocalUser(JSON.parse(localStorage.getItem("loggedInUser")));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // remove user from localStorage
    setUser(null); // update App.js state
    setLocalUser(null); // update Navbar state
    navigate("/login"); // redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <span className="navbar-brand">WaterTracker</span>
        {user && (
          <div className="ml-auto d-flex align-items-center">
            <span className="text-white mr-3">{user.email}</span>
            <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}

        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink to="/intake" className="nav-link">Add Water</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/list" className="nav-link">Water List</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/filter" className="nav-link">Date Diff</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
