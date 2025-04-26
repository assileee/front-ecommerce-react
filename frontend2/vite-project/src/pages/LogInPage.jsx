import React from 'react'
import LabelComp from "../components/LabelComp"

const LogInPage = () => {
  return (
    <form
      className="card shadow-sm p-4 w-100"
      style={{ maxWidth: "480px", margin: "auto" }}
    >
      <h1 className="text-center">Log In</h1>

      {/* Email input block */}
      <div className="mb-3">
        <LabelComp htmlFor="emailInput" displayText="Give us your email !!" />
        <input
          type="email"
          className="form-control"
          id="emailInput"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" className="form-text">
        </div>
      </div>

      {/* Password input block */}
      <div className="mb-3">
        <LabelComp htmlFor="passwordInput" displayText="Password" />
        <input
          type="password"
          className="form-control"
          id="passwordInput"
          aria-describedby="passwordHelp"
        />
        <div id="passwordHelp" className="form-text">
        </div>
      </div>
    </form>
  )
}

export default LogInPage
