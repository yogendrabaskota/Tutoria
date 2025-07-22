import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Form from "./Form";
import {
  clearError,
  registerUser,
  selectAuthError,
  selectAuthStatus,
} from "../../store/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    const result = await dispatch(
      registerUser({ name, email, password, role })
    );
    if (registerUser.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  const fields = [
    {
      label: "Full Name",
      type: "text",
      name: "name",
      value: name,
      onChange: (e) => setName(e.target.value),
      required: true,
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      required: true,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      required: true,
    },
    {
      label: "Role",
      type: "select",
      name: "role",
      value: role,
      onChange: (e) => setRole(e.target.value),
      options: ["Student", "Teacher"],
      required: true,
    },
  ];

  return (
    <Form
      title="Register"
      fields={fields}
      onSubmit={handleRegister}
      error={error}
      isLoading={status === "loading"}
    />
  );
};

export default Register;
