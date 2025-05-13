import React, { useState } from 'react';
import Form from './Form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

     if (res.status === 200 || res.ok) {
        localStorage.setItem('token', data.token);
        window.location.reload()
        navigate('/');
      } else {
        alert(data.message || 'Login failed.');
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const fields = [
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      label: 'Password',
      type: 'password',
      name: 'password',
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
  ];

  return <Form title="Login" fields={fields} onSubmit={handleLogin} />;
};

export default Login;
