import React from "react";
import {
  Palette,
  ChevronRight,
  Star,
  Shield,
  Globe,
  Banknote,
  Laptop,
  Briefcase,
} from "lucide-react";

const DesignerApplicationProcess = () => {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="p-2">
        <div className="flex items-center gap-3">
          <Palette className="w-8 h-8 text-violet-600" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-indigo-600 bg-clip-text text-transparent">
            Designer Position
          </h1>
        </div>

        {/* Introduction Card */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 mt-4 border border-violet-100">
          <p className="text-lg text-gray-700 leading-relaxed">
            Shape the future of design with us. We're seeking creative minds who
            can transform ideas into stunning visuals. Join our global design
            community and work on exciting projects while maintaining your
            creative freedom.
          </p>
        </div>

        {/* Available Roles */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Star className="w-5 h-5 text-violet-500" />
            Current Opportunities
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100 opacity-50">
              <h3 className="text-lg font-medium text-indigo-700">
                Associate Role
              </h3>
              <p className="text-gray-600 mt-2">
                Business development focused (Applications closed)
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-violet-100 transform hover:scale-[1.02] transition-transform">
              <h3 className="text-lg font-medium text-violet-700">
                Designer Role
              </h3>
              <p className="text-gray-600 mt-2">
                For creative professionals with a passion for innovative design
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-violet-500" />
            Why Join Our Design Space?
          </h2>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-violet-100">
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-violet-600 mt-1" />
                <div>
                  <h3 className="font-medium text-violet-700">
                    Remote Freedom
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Work from anywhere in the world while collaborating with
                    global clients
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-violet-100">
              <div className="flex items-start gap-3">
                <Banknote className="w-5 h-5 text-violet-600 mt-1" />
                <div>
                  <h3 className="font-medium text-violet-700">
                    Competitive Pay
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Earn based on your contributions with project-based
                    compensation
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-violet-100">
              <div className="flex items-start gap-3">
                <Laptop className="w-5 h-5 text-violet-600 mt-1" />
                <div>
                  <h3 className="font-medium text-violet-700">
                    Creative Freedom
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Express your unique style while working on diverse projects
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-violet-100">
              <div className="flex items-start gap-3">
                <Star className="w-5 h-5 text-violet-600 mt-1" />
                <div>
                  <h3 className="font-medium text-violet-700">
                    Growth Opportunities
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Access to learning resources and mentorship from senior
                    designers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Requirements */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Shield className="w-5 h-5 text-violet-500" />
            Application Process
          </h2>

          <div className="grid gap-3 mt-3">
            <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-violet-500 transform hover:scale-[1.02] transition-transform">
              <h3 className="text-lg font-medium text-violet-700">
                Professional Resume
              </h3>
              <p className="text-gray-600 mt-1">
                Submit your portfolio and resume highlighting your design
                experience, tools proficiency, and past projects.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-indigo-500 transform hover:scale-[1.02] transition-transform">
              <h3 className="text-lg font-medium text-indigo-700">
                Introduction Video
              </h3>
              <p className="text-gray-600 mt-1">
                Share a brief video about yourself, your design journey, and
                what drives your creative process.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500 transform hover:scale-[1.02] transition-transform">
              <h3 className="text-lg font-medium text-green-700">
                Design Philosophy
              </h3>
              <p className="text-gray-600 mt-1">
                Write about your approach to design, problem-solving
                methodology, and how you stay current with design trends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignerApplicationProcess;
