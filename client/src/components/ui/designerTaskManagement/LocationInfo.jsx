import React from "react";
import { MapPin } from "lucide-react";
import LocationMap from "../../common/LocationMap";

const LocationInfo = ({ address, coordinates }) => {
  const formattedAddress = [
    address.street,
    address.house_number,
    address.city,
    address.state,
    address.postal_code,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="bg-white rounded-lg h-max w-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-3">
        <MapPin className="w-5 h-5 text-gray-500 mr-2" />
        <h2 className="text-lg font-semibold">Location</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-600 mb-2">Address:</p>
          <p className="font-medium">{formattedAddress}</p>
        </div>
        <div>
          <p className="text-gray-600 mb-2">Coordinates:</p>
          <p className="font-mono">
            Lat: {coordinates[0]}, Lng: {coordinates[1]}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <LocationMap 
        locations={[{latitude:coordinates[0], longitude: coordinates[1]}]}
        className="border rounded-lg" height="300px" />
      </div>
    </div>
  );
};

export default LocationInfo;
