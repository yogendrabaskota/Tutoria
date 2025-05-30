/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import Back from '../Back';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await fetch('http://localhost:4000/user/myprofile', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });

        const data = await res.json();

        if (res.status !== 200) {
          alert(data.message || 'Failed to fetch profile.');
          setLoading(false);
          return;
        }

        if (data?.data) {
          const { name, email, _id } = data.data;
          setFormData({ name, email });
          setUserId(_id);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('An error occurred while fetching your profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`http://localhost:4000/user/myprofile/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status !== 200) {
        alert(data.message || 'Failed to update profile.');
        return;
      }

      navigate('/');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating your profile.');
    }
  };

  if (loading) return <p>Loading...</p>;

  const fields = [
    {
      label: 'Name',
      type: 'text',
      name: 'name',
      value: formData.name,
      onChange: handleChange,
    },
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      value: formData.email,
      onChange: handleChange,
    },
  ];

  return(
    <>
    
    <Form title="Edit Profile" fields={fields} onSubmit={handleSubmit} />

    </>

  ) 
};

export default EditProfile;
