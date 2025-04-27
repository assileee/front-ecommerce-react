import React, { useState } from "react";
import LabelComp from "../components/LabelComp";
import InputForm from "../components/InputForm";
import AlertComp from "../components/AlertComp";
import { checkEmail } from "../utils/checkFormErrors.js";

const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // <-- success state

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");    // clear previous errors
    setSuccess("");  // clear previous success

    try {
      if (!checkEmail.checkEmpty(email)) throw Error("This is empty!");
      if (!checkEmail.checkFormat(email)) throw Error("Email bad !!!");

      // Try to log in to the server
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Handle 401 Unauthorized error
      if (response.status === 401) {
        setError("Invalid credentials, please check your email and password.");
        return;
      }

      const serverData = await response.json();

      // If the server sends a general error message in the body
      if (!response.ok) {
        setError(serverData?.error || "Login failed, try again.");
        return;
      }

      // Success! (save token, show success message, redirect, etc)
      if (serverData.token) {
        localStorage.setItem("token", serverData.token);
        window.location.href = "/"; // <-- Show success
        // Optional: Redirect after login (uncomment if you want)
        // window.location.href = "/";
      } else {
        setError("No token received from server.");
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

      {/* Error Alert */}
      {error && (
        <AlertComp alertType="alert-danger" text={error} />
      )}

      {/* Success Alert */}
      {success && (
        <AlertComp alertType="alert-success" text={success} />
      )}

      <button type="submit" className="btn btn-primary w-100">
        Log In
      </button>
    </form>
  );
};

export default LogInPage;
