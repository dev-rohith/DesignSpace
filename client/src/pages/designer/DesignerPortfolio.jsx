import React, { useEffect } from "react";
import {
  Plus,
  Image as ImageIcon,
  AlertCircle,
  Edit2,
  Trash2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPortfolio } from "../../features/actions/designerActions";
import { ErrorState, Spinner } from "../../components";

const DesignerPortfolio = () => {
  const {portfolio, isLoading} = useSelector(store=>store.designer)
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const actionResult = await dispatch(getMyPortfolio());
      if (getMyPortfolio.rejected.match(actionResult)) {
        console.log(actionResult.payload);
      }
    })();
  }, []);
  const portfolios = portfolio

  if (isLoading) return <Spinner />;

  if(!portfolio) return <ErrorState error="Failed to Load Data" />

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Portfolio
              </h1>
              <p className="text-gray-600 mt-1">
                Showcase your best work to potential clients
              </p>
            </div>
            <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 flex items-center disabled:opacity-50 disabled:cursor-not-allowed">
              <Plus className="w-4 h-4 mr-2" />
              Add Portfolio
            </button>
          </div>
        </div>
      </div>

      {/* Portfolio Info Banner */}
      <div className="bg-violet-50 border-b border-violet-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-violet-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-violet-900">
                Portfolio Guidelines
              </h3>
              <p className="text-sm text-violet-700 mt-1">
                Your portfolio will be featured on the landing page showcase.
                Maintain a maximum of 5 high-quality portfolios to highlight
                your best work. Each portfolio should include relevant images
                and detailed descriptions to attract potential clients.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolios.map((portfolio, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden group"
              >
                {/* Portfolio Images Preview */}
                <div className="relative h-48 bg-gray-100">
                  {portfolio.images[0] ? (
                    <img
                      src={portfolio.images[0].url}
                      alt={portfolio.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
                    <div className="absolute inset-0 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button className="p-2 bg-white rounded-full text-gray-700 hover:text-violet-600">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-white rounded-full text-gray-700 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-white/90 rounded-full text-xs font-medium text-gray-700">
                      {portfolio.images.length} images
                    </span>
                  </div>
                </div>

                {/* Portfolio Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 capitalize">
                        {portfolio.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {portfolio.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-sm">
                      {portfolio.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(portfolio.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Portfolio Card */}
            {portfolios.length < 5 && (
              <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center h-[300px] cursor-pointer hover:border-violet-300 hover:bg-violet-50 transition-colors group">
                <div className="text-center">
                  <Plus className="w-8 h-8 mx-auto text-gray-400 group-hover:text-violet-500" />
                  <p className="mt-2 text-sm font-medium text-gray-500 group-hover:text-violet-600">
                    Add New Portfolio
                  </p>
                  <p className="mt-1 text-xs text-gray-400 group-hover:text-violet-400">
                    {5 - portfolios.length} slots remaining
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignerPortfolio;
