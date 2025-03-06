import React from "react";
import { Briefcase, ChevronRight, Star, Shield, Clock } from "lucide-react";

const AssociateApplicationProcess = () => {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-2 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-indigo-600 bg-clip-text text-transparent">
              Associate Position
            </h1>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 mt-4 border border-green-100">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Join our dynamic team as an Associate and be part of something
              extraordinary. We're looking for passionate individuals who are
              ready to make an impact and grow with us.
            </p>
          </div>

          <div className="mt-6 sm:mt-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-violet-500" />
              Available Opportunities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-violet-100 transform hover:scale-[1.02] transition-transform">
                <h3 className="text-base sm:text-lg font-medium text-violet-700">
                  Associate Role
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mt-2">
                  Perfect for those seeking to drive business growth and
                  innovation
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-indigo-100 opacity-50">
                <h3 className="text-base sm:text-lg font-medium text-indigo-700">
                  Designer Role
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mt-2">
                  For creative minds (Applications closed)
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2 mb-3 sm:mb-4">
              <Shield className="w-5 h-5 text-green-500" />
              Important Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border-l-4 border-green-500 transform hover:scale-[1.02] transition-transform">
                <h3 className="text-base sm:text-lg font-medium text-green-700">
                  One-Time Application
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mt-2">
                  You can apply for one role only. Make sure to prepare
                  thoroughly before starting.
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border-l-4 border-violet-500 transform hover:scale-[1.02] transition-transform">
                <h3 className="text-base sm:text-lg font-medium text-violet-700">
                  Three-Step Process
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mt-2">
                  Complete all mandatory steps: Cover Letter, Introduction
                  Video, and Role Questions.
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border-l-4 border-indigo-500 transform hover:scale-[1.02] transition-transform">
                <h3 className="text-base sm:text-lg font-medium text-indigo-700">
                  Time Commitment
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mt-2">
                  Set aside approximately 30-45 minutes to complete your
                  application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssociateApplicationProcess;
