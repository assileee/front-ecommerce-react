import React, { useState } from "react";
import LabelComp from "../components/LabelComp";
import InputForm from "../components/InputForm";

const fieldConfig = [
  { name: "firstName", label: "First Name", type: "text", id: "firstNameInput" },
  { name: "lastName", label: "Last Name", type: "text", id: "lastNameInput" },
  { name: "email", label: "Email", type: "email", id: "emailInput" },
  { name: "password", label: "Password", type: "password", id: "passwordInput" },
  { name: "role", label: "Role", type: "text", id: "roleInput" },
  // Avatar/file input will be handled separately
];

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const [avatar, setAvatar] = useState(null);

  // General handler for all text fields
  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  // File handler for avatar
  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  // SUBMIT HANDLER
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (avatar) {
      data.append("avatar", avatar); // file field name must match Multer config
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/signup", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      if (response.ok) {
        alert("User created!");
        // redirect or clear form
      } else {
        alert(result.message || "Sign-up failed.");
      }
    } catch (error) {
      alert("Something went wrong.");
    }
  };

  return (
    <form
      className="card shadow-sm p-4 w-100"
      style={{ maxWidth: "480px", margin: "auto" }}
      onSubmit={handleSubmit}
    >
      <h1 className="text-center">Sign up</h1>
      {fieldConfig.map(({ name, label, type, id }) => (
        <div className="mb-3" key={name}>
          <LabelComp htmlFor={id} displayText={label} />
          <InputForm
            id={id}
            type={type}
            value={formData[name]}
            onChange={handleChange(name)}
            aria-describedby={`${id}Help`}
          />
        </div>
      ))}
      <div className="mb-3" key="avatar">
        <LabelComp htmlFor="avatarInput" displayText="Avatar" />
        <input
          id="avatarInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Sign up
      </button>
    </form>
  );
};

export default SignUpPage;
