import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ jobId,title, description, location, subject, name, salary, status }) => {
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate(`/detail/${jobId}`);
  };

  // Choose badge color
  const statusClass = {
    open: 'bg-green-400',
    closed: 'bg-red-400',
    hired: 'bg-yellow-400 text-black',
  }[status] || 'bg-gray-400';

  return (
    <article className="rounded-xl border-2 border-gray-100 bg-white">
      <div className="flex items-start justify-between p-4 sm:p-6 lg:p-8">
        <div className="flex gap-4">
          <a href="#" className="block shrink-0">
            <img
              alt=""
              src="https://th.bing.com/th/id/OIP.PQBB04bCR16-GpVggW1ZDgAAAA?rs=1&pid=ImgDetMain"
              className="size-14 rounded-lg object-cover"
            />
          </a>

          <div>
            <h3 className="font-medium sm:text-lg">
              <a href="#" className="hover:underline">{title}</a>
            </h3>

            <p className="line-clamp-2 text-sm text-gray-700">{description}</p>
            <p className="line-clamp-2 text-sm text-gray-700">Location: {location}</p>
            <p className="line-clamp-2 text-sm text-gray-700">Subject: {subject}</p>

            <div className="mt-2 sm:flex sm:items-center sm:gap-2">
              <div className="flex items-center gap-1 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
                <p className="text-xs">Application</p>
              </div>

              <span className="hidden sm:block" aria-hidden="true">&middot;</span>

              <p className="hidden sm:block sm:text-xs sm:text-gray-500">
                Posted by <a href="#" className="font-medium underline hover:text-gray-700">{name}</a>
              </p>
            </div>
          </div>
        </div>

        {/* Salary on right */}
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-800">Salary</p>
          <p className="text-lg text-green-700 font-bold">{salary}</p>
        </div>
      </div>

      {/* Status + Apply button row */}
      <div className="flex justify-between items-center px-4 pb-4">
        <strong
          className={`inline-flex items-center gap-1 rounded-ss-xl rounded-ee-xl px-3 py-1.5 text-white text-xs sm:text-sm ${statusClass}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
          <span className="capitalize">{status}</span>
        </strong>

<button
  onClick={handleDetail}
  className="inline-flex items-center gap-1 rounded-ss-xl rounded-ee-xl px-3 py-1.5 text-white text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-700 cursor-pointer transition"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="size-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 5l7 7-7 7"
    />
  </svg>
  Detail
</button>


      </div>
    </article>
  );
};

export default Card;
