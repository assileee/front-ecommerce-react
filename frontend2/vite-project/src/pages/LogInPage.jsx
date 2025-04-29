import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ⬅️ Import this
import LabelComp from "../components/LabelComp";
import InputForm from "../components/InputForm";
import AlertComp from "../components/AlertComp";
import { checkEmail } from "../utils/checkFormErrors.js";

const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!checkEmail.checkEmpty(email)) throw Error("This is empty!");
      if (!checkEmail.checkFormat(email)) throw Error("Email bad !!!");

      setError("");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const serverData = await response.json();

      if (response.status === 401) {
        setError("Invalid credentials, please check your email and password.");
        return;
      }
      if (!response.ok) {
        setError(serverData?.message || "Login failed, try again.");
        return;
      }

      // Save token and role
      if (serverData.token) {
        localStorage.setItem("token", serverData.token);
        if (serverData.role) {
          localStorage.setItem("role", serverData.role);
          localStorage.setItem("avatar", serverData.imageUrl || "");
          navigate("/");
        }
         
      }
    } catch (error) {
      setError(error.message || "Something went wrong. Try again.");
    }
  };

  return (
    <form
      className="card shadow-sm p-4 w-100"
      style={{ maxWidth: "480px", margin: "auto" }}
      onSubmit={handleSubmit}
    >
      <h1 className="text-center">Log In</h1>
      <div className="mb-3">
        <LabelComp htmlFor="emailInput" displayText="Email" />
        <InputForm
          type="email"
          id="emailInput"
          aria-describedby="emailHelp"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <LabelComp htmlFor="passwordInput" displayText="Password" />
        <InputForm
          type="password"
          id="passwordInput"
          aria-describedby="passwordHelp"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      {error && (
        <AlertComp alertType="alert-danger" text={error} />
      )}
      <button type="submit" className="btn btn-primary w-100">
        Log In
      </button>
    </form>
  );
};

export default LogInPage;
