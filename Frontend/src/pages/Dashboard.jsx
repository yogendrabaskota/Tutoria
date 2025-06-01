import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserJobs = async () => {
    const token = localStorage.getItem('token');
    console.log(token);

    try {
      const res = await axios.get('http://localhost:4000/job/your', {
        headers: {
          Authorization: token, // sending raw token (no Bearer)
        },
      });
      setJobs(res.data.data || []);
      console.log('dats', res.data.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserJobs();

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-teal-600 mb-6">Dashboard</h2>

      {/* Jobs Section */}
      <div className="bg-white shadow-md rounded p-4">
        <h3 className="text-xl font-semibold mb-4">Your Jobs</h3>
        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length > 0 ? (
          <ul className="space-y-3">
            {jobs.map((job) => (
              <li
                key={job._id}
                className="border p-4 rounded shadow-sm flex justify-between items-start"
              >
                <div>
                  <h4 className="text-lg font-bold">{job.title}</h4>
                  <p>{job.description}</p>
                  <p className="text-sm text-gray-600">
                    Location: {job.location}
                  </p>
                </div>
                <div>
                  <span
                    className={`text-sm font-semibold px-2 py-1 rounded ${
                      job.status === 'open'
                        ? 'bg-green-100 text-green-700'
                        : job.status === 'hired'
                        ? 'bg-yellow-100 text-yellow-700'
                        : job.status === 'closed'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {job.status || 'Unknown'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
