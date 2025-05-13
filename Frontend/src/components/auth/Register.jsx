import React, { useState } from 'react';
import Form from './Form';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
       if (res.status === 200 || res.ok) {
 
        navigate('/login');
      } else {

        alert(data.message || 'Registration failed.');
      }
     
    } catch (err) {
      alert('Something went wrong. Please try again later.')
      console.error('Registration failed:', err);
    }
  };

  const fields = [
    {
      label: 'Username',
      type: 'text',
      name: 'name',
      value: name,
      onChange: (e) => setName(e.target.value),
    },
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
   {
    label: 'Role',
    type: 'select', 
    name: 'role',
    value: role,
    onChange: (e) => setRole(e.target.value),
    options: ['User', 'Teacher'], 
  },
  ];

  return <Form title="Register" fields={fields} onSubmit={handleRegister} />;
};

export default Register;
