import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { selectCurrentUser, selectIsAuthenticated } from "../store/authSlice";

const Dashboard = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  console.log("isAUrhj", isAuthenticated);
  const user = useSelector(selectCurrentUser);
  console.log("userr", user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null; // or loading spinner

  return (
    <div className="min-h-screen bg-teal-50">
      {/* Dashboard Header */}
      <header className="bg-teal-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-teal-200 mt-1">
                {user.role === "tutor" ? "Tutor" : "Student"} Dashboard
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="bg-teal-700 hover:bg-teal-600 px-4 py-2 rounded-md text-sm font-medium transition"
              >
                My Profile
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {user?.role === "tutor" ? (
            <>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-teal-500">
                <h3 className="text-lg font-medium text-gray-700">
                  Total Students
                </h3>
                <p className="text-3xl font-bold text-teal-800 mt-2">24</p>
                <p className="text-teal-600 text-sm mt-1">+3 this month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-teal-500">
                <h3 className="text-lg font-medium text-gray-700">
                  Upcoming Sessions
                </h3>
                <p className="text-3xl font-bold text-teal-800 mt-2">5</p>
                <p className="text-teal-600 text-sm mt-1">Next: Tomorrow</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-teal-500">
                <h3 className="text-lg font-medium text-gray-700">
                  Earnings This Month
                </h3>
                <p className="text-3xl font-bold text-teal-800 mt-2">$1,250</p>
                <p className="text-teal-600 text-sm mt-1">
                  +15% from last month
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-teal-500">
                <h3 className="text-lg font-medium text-gray-700">Rating</h3>
                <p className="text-3xl font-bold text-teal-800 mt-2">4.8</p>
                <p className="text-teal-600 text-sm mt-1">
                  Based on 42 reviews
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-teal-500">
                <h3 className="text-lg font-medium text-gray-700">
                  Active Tutors
                </h3>
                <p className="text-3xl font-bold text-teal-800 mt-2">3</p>
                <p className="text-teal-600 text-sm mt-1">
                  Currently learning with
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-teal-500">
                <h3 className="text-lg font-medium text-gray-700">
                  Upcoming Sessions
                </h3>
                <p className="text-3xl font-bold text-teal-800 mt-2">2</p>
                <p className="text-teal-600 text-sm mt-1">Next: Tomorrow</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-teal-500">
                <h3 className="text-lg font-medium text-gray-700">Subjects</h3>
                <p className="text-3xl font-bold text-teal-800 mt-2">4</p>
                <p className="text-teal-600 text-sm mt-1">Currently studying</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-teal-500">
                <h3 className="text-lg font-medium text-gray-700">
                  Hours This Month
                </h3>
                <p className="text-3xl font-bold text-teal-800 mt-2">12</p>
                <p className="text-teal-600 text-sm mt-1">+3 from last month</p>
              </div>
            </>
          )}
        </div>

        {/* Recent Activity and Upcoming Sessions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {user?.role === "tutor" ? (
                <>
                  <div className="border-l-4 border-teal-500 pl-4 py-2">
                    <p className="text-gray-700">
                      You completed a session with{" "}
                      <span className="font-medium">Alex Johnson</span> in{" "}
                      <span className="font-medium">Calculus</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">2 hours ago</p>
                  </div>
                  <div className="border-l-4 border-teal-500 pl-4 py-2">
                    <p className="text-gray-700">
                      <span className="font-medium">Sarah Williams</span> booked
                      a new session for{" "}
                      <span className="font-medium">Chemistry</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">1 day ago</p>
                  </div>
                  <div className="border-l-4 border-teal-500 pl-4 py-2">
                    <p className="text-gray-700">
                      You received a 5-star rating from{" "}
                      <span className="font-medium">Michael Brown</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">2 days ago</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="border-l-4 border-teal-500 pl-4 py-2">
                    <p className="text-gray-700">
                      You completed a{" "}
                      <span className="font-medium">Mathematics</span> session
                      with <span className="font-medium">Dr. Smith</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Yesterday</p>
                  </div>
                  <div className="border-l-4 border-teal-500 pl-4 py-2">
                    <p className="text-gray-700">
                      <span className="font-medium">Prof. Johnson</span> shared
                      new study materials for your{" "}
                      <span className="font-medium">Physics</span> course
                    </p>
                    <p className="text-sm text-gray-500 mt-1">3 days ago</p>
                  </div>
                  <div className="border-l-4 border-teal-500 pl-4 py-2">
                    <p className="text-gray-700">
                      You booked a new session with{" "}
                      <span className="font-medium">Ms. Davis</span> for{" "}
                      <span className="font-medium">English Literature</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">5 days ago</p>
                  </div>
                </>
              )}
            </div>
            <Link
              to={
                user?.role === "tutor" ? "/tutor/activity" : "/student/activity"
              }
              className="inline-block mt-4 text-teal-600 hover:text-teal-800 font-medium text-sm"
            >
              View all activity →
            </Link>
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Upcoming Sessions
            </h2>
            <div className="space-y-4">
              {user?.role === "tutor" ? (
                <>
                  <div className="border-l-4 border-teal-500 pl-4 py-2">
                    <p className="font-medium text-gray-800">Calculus Review</p>
                    <p className="text-gray-600">With Alex Johnson</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Tomorrow, 3:00 PM - 4:30 PM
                    </p>
                    <div className="mt-2 flex space-x-2">
                      <button className="bg-teal-100 text-teal-800 px-3 py-1 rounded text-xs font-medium">
                        Details
                      </button>
                      <button className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-xs font-medium">
                        Reschedule
                      </button>
                    </div>
                  </div>
                  <div className="border-l-4 border-teal-500 pl-4 py-2">
                    <p className="font-medium text-gray-800">
                      Chemistry Lab Help
                    </p>
                    <p className="text-gray-600">With Sarah Williams</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Friday, 10:00 AM - 11:00 AM
                    </p>
                    <div className="mt-2 flex space-x-2">
                      <button className="bg-teal-100 text-teal-800 px-3 py-1 rounded text-xs font-medium">
                        Details
                      </button>
                      <button className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-xs font-medium">
                        Reschedule
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="border-l-4 border-teal-500 pl-4 py-2">
                    <p className="font-medium text-gray-800">Algebra II</p>
                    <p className="text-gray-600">With Dr. Smith</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Tomorrow, 4:00 PM - 5:00 PM
                    </p>
                    <div className="mt-2 flex space-x-2">
                      <button className="bg-teal-100 text-teal-800 px-3 py-1 rounded text-xs font-medium">
                        Details
                      </button>
                      <button className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-xs font-medium">
                        Reschedule
                      </button>
                    </div>
                  </div>
                  <div className="border-l-4 border-teal-500 pl-4 py-2">
                    <p className="font-medium text-gray-800">
                      English Essay Review
                    </p>
                    <p className="text-gray-600">With Ms. Davis</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Thursday, 2:00 PM - 3:00 PM
                    </p>
                    <div className="mt-2 flex space-x-2">
                      <button className="bg-teal-100 text-teal-800 px-3 py-1 rounded text-xs font-medium">
                        Details
                      </button>
                      <button className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-xs font-medium">
                        Prepare
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <Link
              to={
                user?.role === "tutor" ? "/tutor/schedule" : "/student/schedule"
              }
              className="inline-block mt-4 text-teal-600 hover:text-teal-800 font-medium text-sm"
            >
              View full schedule →
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {user?.role === "tutor" ? (
              <>
                <Link
                  to="/tutor/schedule/new"
                  className="bg-teal-100 hover:bg-teal-200 text-teal-800 p-4 rounded-lg text-center transition"
                >
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-6 h-6 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span className="text-sm font-medium">
                      Add Availability
                    </span>
                  </div>
                </Link>
                <Link
                  to="/tutor/sessions"
                  className="bg-teal-100 hover:bg-teal-200 text-teal-800 p-4 rounded-lg text-center transition"
                >
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-6 h-6 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm font-medium">Manage Sessions</span>
                  </div>
                </Link>
                <Link
                  to="/tutor/resources"
                  className="bg-teal-100 hover:bg-teal-200 text-teal-800 p-4 rounded-lg text-center transition"
                >
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-6 h-6 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="text-sm font-medium">Add Resources</span>
                  </div>
                </Link>
                <Link
                  to="/tutor/profile/edit"
                  className="bg-teal-100 hover:bg-teal-200 text-teal-800 p-4 rounded-lg text-center transition"
                >
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-6 h-6 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <span className="text-sm font-medium">Edit Profile</span>
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/student/find-tutor"
                  className="bg-teal-100 hover:bg-teal-200 text-teal-800 p-4 rounded-lg text-center transition"
                >
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-6 h-6 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <span className="text-sm font-medium">Find a Tutor</span>
                  </div>
                </Link>
                <Link
                  to="/student/schedule/new"
                  className="bg-teal-100 hover:bg-teal-200 text-teal-800 p-4 rounded-lg text-center transition"
                >
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-6 h-6 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm font-medium">Book Session</span>
                  </div>
                </Link>
                <Link
                  to="/student/resources"
                  className="bg-teal-100 hover:bg-teal-200 text-teal-800 p-4 rounded-lg text-center transition"
                >
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-6 h-6 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="text-sm font-medium">Study Materials</span>
                  </div>
                </Link>
                <Link
                  to="/student/profile/edit"
                  className="bg-teal-100 hover:bg-teal-200 text-teal-800 p-4 rounded-lg text-center transition"
                >
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-6 h-6 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <span className="text-sm font-medium">Edit Profile</span>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
