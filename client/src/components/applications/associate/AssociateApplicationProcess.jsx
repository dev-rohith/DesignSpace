import React from "react";
import { Briefcase, Star, Shield } from "lucide-react";

const AssociateApplicationProcess = () => {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="p-2 md:p-3">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-green-600" />
            <h1 className="text-xl font-semibold text-gray-800">Associate Position</h1>
          </div>

          <div className="bg-white/50 backdrop-blur-md rounded-lg p-3 mt-3 border border-gray-200">
            <p className="text-sm text-gray-700 leading-normal">
              Join our dynamic team as an Associate and be part of something extraordinary. We seek passionate individuals ready to make an impact and grow with us.
            </p>
          </div>

          <div className="mt-5">
            <h2 className="text-base font-medium text-gray-800 flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-violet-500" /> Available Opportunities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="bg-white rounded-lg p-3 shadow-sm border border-violet-100 hover:shadow-md transition">
                <h3 className="text-sm font-medium text-violet-700">Associate Role</h3>
                <p className="text-xs text-gray-600 mt-1">Drive business growth and innovation.</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm border border-indigo-100 opacity-50">
                <h3 className="text-sm font-medium text-indigo-700">Designer Role</h3>
                <p className="text-xs text-gray-600 mt-1">For creative minds (Applications closed).</p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h2 className="text-base font-medium text-gray-800 flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-green-500" /> Important Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-green-500 hover:shadow-md transition">
                <h3 className="text-sm font-medium text-green-700">One-Time Application</h3>
                <p className="text-xs text-gray-600 mt-1">Apply for one role only. Prepare thoroughly before starting.</p>
              </div>

              <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-violet-500 hover:shadow-md transition">
                <h3 className="text-sm font-medium text-violet-700">Three-Step Process</h3>
                <p className="text-xs text-gray-600 mt-1">Complete Cover Letter, Introduction Video, and Role Questions.</p>
              </div>

              <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-indigo-500 hover:shadow-md transition">
                <h3 className="text-sm font-medium text-indigo-700">Time Commitment</h3>
                <p className="text-xs text-gray-600 mt-1">Set aside 30-45 minutes to complete your application.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssociateApplicationProcess;
