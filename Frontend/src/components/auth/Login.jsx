import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { loginUser, clearError } from "../../features/auth/authSlice";
import Form from "./Form";
import {
  clearError,
  loginUser,
  selectAuthError,
  selectAuthStatus,
} from "../../store/authSlice";
// import { selectAuthError, selectAuthStatus } from "../../store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      navigate("/dashboard");
    }
  };

  const fields = [
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
  ];

  return (
    <Form
      title="Login"
      fields={fields}
      onSubmit={handleLogin}
      error={error}
      isLoading={status === "loading"}
    />
  );
};

export default Login;
