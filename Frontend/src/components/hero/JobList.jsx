import React, { useEffect, useState } from 'react';
import Card from './Card'; 

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
     const token = localStorage.getItem('token')
    // console.log(token)

    fetch('http://localhost:4000/job/all',{
       headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}` 
      }
    })
    
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          setJobs(data.data);
        }
      })
      .catch((error) => console.error('Error fetching jobs:', error));
  }, []);

  return (
    <div className="grid gap-6 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <Card
          key={job._id}
          title={job.title}
          description={job.description}
          location={job.location}
          subject={job.subject}
          salary = {job.SOffered}
          name={job.userId.name}
          status={job.status}
        />
      ))}
    </div>
  );
};

export default JobList;
