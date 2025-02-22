import React, { useState } from 'react';
import { format, formatDistance } from 'date-fns';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
  User,
  Target,
  X,
  CreditCard
} from 'lucide-react';

const ProjectDetailsView = ({ 
  title,
  description,
  address,
  designer,
  status,
  minimumDays,
  budget,
  isPaid,
  completion_percentage,
  beforePrictures = [],
  afterPictures = [],
  createdAt,
  updatedAt
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const hasImages = beforePrictures.length > 0 || afterPictures.length > 0;

  const formatDateTime = (date) => {
    return format(new Date(date), "MMM d, yyyy 'at' h:mm a");
  };

  const getTimeDistance = (date) => {
    return formatDistance(new Date(date), new Date(), { addSuffix: true });
  };

  const ImageGallery = ({ images, title }) => {
    if (!images || images.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-violet-600" />
          {title}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {images.map((image) => (
            <div 
              key={image._id}
              className="relative group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.url}
                alt={title}
                className="w-full h-48 object-cover transform transition-transform group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ImageModal = () => {
    if (!selectedImage) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
        <button
          onClick={() => setSelectedImage(null)}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          <X className="w-8 h-8" />
        </button>
        <img
          src={selectedImage.url}
          alt="Full size"
          className="max-w-full max-h-[90vh] object-contain"
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white shadow p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
              <p className="text-lg text-gray-600">{description}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className={`px-4 py-2 text-sm font-medium ${
                status === 'pending' ? 'bg-amber-500 text-white' :
                status === 'review' ? 'bg-violet-500 text-white' :
                status === 'completed' ? 'bg-green-500 text-white' :
                'bg-blue-500 text-white'
              }`}>
                {status.toUpperCase()}
              </div>
              <div className={`px-4 py-2 text-sm font-medium ${
                isPaid ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}>
                {isPaid ? 'PAID' : 'PAYMENT PENDING'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-gradient-to-r from-violet-50 to-violet-100 p-4">
              <Clock className="w-6 h-6 text-violet-600" />
              <div>
                <p className="text-sm text-gray-500">Timeline</p>
                <p className="font-semibold">{minimumDays} days</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-violet-50 to-violet-100 p-4">
              <DollarSign className="w-6 h-6 text-violet-600" />
              <div>
                <p className="text-sm text-gray-500">Budget</p>
                <p className="font-semibold">${budget.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-violet-50 to-violet-100 p-4">
              <Target className="w-6 h-6 text-violet-600" />
              <div>
                <p className="text-sm text-gray-500">Progress</p>
                <p className="font-semibold">{completion_percentage}% Complete</p>
              </div>
            </div>
          </div>

          {status === 'pending' && !isPaid && (
            <div className="mt-6">
              <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-violet-600 to-violet-800 text-white font-medium hover:from-violet-700 hover:to-violet-900 flex items-center justify-center gap-2">
                <CreditCard className="w-5 h-5" />
                Make Payment to Process
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className={`${hasImages ? 'lg:col-span-2' : ''} space-y-6`}>
            {/* Progress Bar */}
            <div className="bg-white shadow p-6">
              <h2 className="text-2xl font-semibold mb-6">Project Progress</h2>
              <div className="space-y-4">
                <div className="h-4 bg-gray-100">
                  <div 
                    className="h-full bg-gradient-to-r from-violet-500 to-violet-600 transition-all duration-500"
                    style={{ width: `${completion_percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Start</span>
                  <span>{completion_percentage}% Completed</span>
                </div>
              </div>
            </div>

            {/* Image Galleries - Only render if images exist */}
            {hasImages && (
              <div className="bg-white shadow p-6">
                <ImageGallery images={beforePrictures} title="Before Images" />
                <ImageGallery images={afterPictures} title="After Images" />
              </div>
            )}
          </div>

          {/* Side Details */}
          <div className="space-y-6">
            {/* Designer Info */}
            <div className="bg-white shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Designer</h2>
              <div className="flex items-center gap-4 bg-gradient-to-r from-violet-50 to-violet-100 p-4">
                <img
                  src={designer.profilePicture}
                  alt={`${designer.firstName} ${designer.lastName}`}
                  className="w-16 h-16 object-cover"
                />
                <div>
                  <p className="font-semibold text-lg">
                    {designer.firstName} {designer.lastName}
                  </p>
                  <p className="text-gray-600">Project Designer</p>
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className="bg-white shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="flex items-start gap-3 bg-gradient-to-r from-violet-50 to-violet-100 p-4">
                <MapPin className="w-5 h-5 text-violet-600 mt-1" />
                <div>
                  <p className="font-medium">{address.street}</p>
                  <p className="text-gray-600">{address.city}, {address.state}</p>
                  <p className="text-gray-600">{address.country} - {address.postal_code}</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Timeline</h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-violet-50 to-violet-100 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-violet-600 mt-2" />
                    <div>
                      <p className="font-medium">Project Created</p>
                      <p className="text-sm text-gray-600">{formatDateTime(createdAt)}</p>
                      <p className="text-sm text-violet-600">{getTimeDistance(createdAt)}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-violet-50 to-violet-100 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-violet-600 mt-2" />
                    <div>
                      <p className="font-medium">Last Updated</p>
                      <p className="text-sm text-gray-600">{formatDateTime(updatedAt)}</p>
                      <p className="text-sm text-violet-600">{getTimeDistance(updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ImageModal />
    </div>
  );
};

export default ProjectDetailsView;