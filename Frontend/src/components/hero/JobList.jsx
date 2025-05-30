import React, { useEffect, useState } from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'

const JobList = () => {
  const [jobs, setJobs] = useState([])
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')

    fetch('http://localhost:4000/job/all', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          setJobs(data.data);
        }
      })
      .catch((error) => console.error('Error fetching jobs:', error));

    fetch('http://localhost:4000/user/myprofile', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          setProfile(data.data);
        }
      })
      .catch((error) => console.error('Error fetching profile:', error));
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-3/4 overflow-y-auto p-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Card
            key={job._id}
            title={job.title}
            description={job.description}
            location={job.location}
            subject={job.subject}
            salary={job.SOffered}
            name={job.userId.name}
            status={job.status}
            jobId={job._id}
          />
        ))}
      </div>


      <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto border-l">
        {profile ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold uppercase">{profile.name}</h2>
                <p className="text-sm text-gray-500">{profile.role}</p>
              </div>
              <button
                className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <Link to={'/edit'}>
                Edit
                </Link>
              </button>
            </div>
            <div className="bg-white">
              <p><strong>Email:</strong> {profile.email}</p>
            </div>
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default JobList
