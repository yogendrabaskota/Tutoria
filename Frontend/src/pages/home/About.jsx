import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-4">
            About Tutoria
          </h2>
          <div className="w-24 h-1 bg-teal-600 mx-auto"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <div className="bg-teal-50 p-8 rounded-xl shadow-sm border border-teal-100">
              <h3 className="text-2xl font-semibold text-teal-700 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 mb-6">
                To bridge the gap between students seeking quality education and
                qualified tutors looking for teaching opportunities. We simplify
                the process of finding and managing tuition arrangements for
                both parties.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-teal-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-gray-600">
                  <span className="font-semibold text-teal-700">5000+</span>{" "}
                  successful tutor-student connections
                </p>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold text-teal-700 mb-4">
              How It Works
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <span className="text-teal-700 font-bold">1</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">
                    Post Your Requirement
                  </h4>
                  <p className="text-gray-600 mt-1">
                    Students or parents can post detailed tuition requirements
                    including subjects, location, budget, and schedule.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <span className="text-teal-700 font-bold">2</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Tutors Apply</h4>
                  <p className="text-gray-600 mt-1">
                    Qualified tutors browse listings and apply to positions that
                    match their expertise and availability.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <span className="text-teal-700 font-bold">3</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Connect & Start</h4>
                  <p className="text-gray-600 mt-1">
                    Students review tutor profiles and connect directly to begin
                    their learning journey.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                to="/register"
                className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-2 rounded-lg transition"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
