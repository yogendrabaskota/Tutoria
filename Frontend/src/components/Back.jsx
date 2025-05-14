import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; 

const Back = ({ label = 'Back' }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-4 hover:cursor-pointer transition"
    >
      <ArrowLeft size={25} />
      {label}
    </button>
  );
};

export default Back;
