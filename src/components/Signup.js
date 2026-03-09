import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleSignup = (e) => {
  e.preventDefault();
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    alert("User already exists");
    return;
  }
 users.push({ email, password, name: email.split("@")[0] }); // optional name

  localStorage.setItem("users", JSON.stringify(users));
  alert("Signup successful");
  navigate("/login");
};


  return (
    <form onSubmit={handleSignup}>
      <h1>Signup</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
