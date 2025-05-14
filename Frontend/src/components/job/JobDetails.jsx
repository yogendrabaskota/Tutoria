/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Back from '../Back';

const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/job/single/${jobId}`, {
          headers: {
            Authorization: token,
          },
        });
        setJob(res.data.data);
      } catch (err) {
        setError('Failed to load job details.');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleApply = () => {
    navigate(`/apply/${jobId}`);
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-2xl rounded-2xl border border-gray-200">
        <Back />
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <img
          src="https://th.bing.com/th/id/OIP.PQBB04bCR16-GpVggW1ZDgAAAA?rs=1&pid=ImgDetMain"
          alt="Job"
          className="w-32 h-32 object-cover rounded-lg shadow"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h1>
          <p className="text-gray-600 mb-4">{job.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <p><span className="font-semibold">Location:</span> {job.location}</p>
            <p><span className="font-semibold">Subject:</span> {job.subject}</p>
            <p><span className="font-semibold">Salary Offered:</span> <span className="text-green-600 font-bold">{job.SOffered}</span></p>
            <p><span className="font-semibold">Status:</span> 
              <span className={`ml-2 inline-block px-2 py-1 rounded text-white text-xs ${
                job.status === 'open' ? 'bg-green-600' :
                job.status === 'closed' ? 'bg-red-600' :
                job.status === 'hired' ? 'bg-yellow-500 text-black' : 'bg-gray-400'
              }`}>
                {job.status}
              </span>
            </p>
            <p><span className="font-semibold">Preferred Time:</span> {job.time}</p>
            <p><span className="font-semibold">No. of Students:</span> {job.NoS}</p>
            <p><span className="font-semibold">Posted By:</span><Link to={`/userdetails/${job.userId._id}`} > {job.userId?.name} </Link></p>
          </div>


          {job.status === 'open' && (
  <div className="mt-6 flex justify-end">
    <button
      onClick={handleApply}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow font-medium transition"
    >
      Apply Now
    </button>
  </div>
)}


        
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
