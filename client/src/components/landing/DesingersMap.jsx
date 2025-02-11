import React, { memo, useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { Plus, Minus } from "lucide-react";

const geoUrl =
  "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

const markers = [
  {
    name: "New York",
    coordinates: [-74.006, 40.7128],
    country: "United States of America",
  },
  {
    name: "London",
    coordinates: [-0.1276, 51.5074],
    country: "United Kingdom",
  },
  { name: "Tokyo", coordinates: [139.6503, 35.6762], country: "Japan" },
  { name: "Sydney", coordinates: [151.2093, -33.8688], country: "Australia" },
];

const DesingersMap = () => {
  const [zoom, setZoom] = useState(5);
  const highlightedCountries = useMemo(() => {
    return new Set(markers.map((marker) => marker.country));
  }, []);

  const handleZoomIn = () => {
    if (zoom < 8) setZoom(zoom + 1);
  };

  const handleZoomOut = () => {
    if (zoom > 1) setZoom(zoom - 1);
  };

  return (
    <div className=" w-full md:ml-14 md:max-w-xl mb-6 border h-70 relative bg-gray-50 rounded-xl overflow-hidden">
      {/* Zoom Controls */}
      <div className="absolute right-4 bottom-4 z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors disabled:bg-gray-300"
          disabled={zoom >= 8}
        >
          <Plus size={20} className="text-gray-600" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors disabled:bg-gray-300"
          disabled={zoom <= 1}
        >
          <Minus size={20} className="text-gray-600" />
        </button>
      </div>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 100,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <ZoomableGroup 
          center={[0, 0]} 
          zoom={zoom} 
          minZoom={1} 
          maxZoom={8}
          onMoveEnd={({ zoom }) => setZoom(zoom)}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isHighlighted = highlightedCountries.has(
                  geo.properties.name
                );
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: isHighlighted ? "#676c8b" : "#7e838a",
                        stroke: "#e2e8f0",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      hover: {
                        fill: isHighlighted ? "#1f477b" : "#75ade6",
                        stroke: "#e2e8f0",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      pressed: {
                        fill: isHighlighted ? "#bfdbfe" : "#e2e8f0",
                        stroke: "#e2e8f0",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {markers.map(({ name, coordinates }) => (
            <Marker key={name} coordinates={coordinates}>
              <circle
                r={4}
                fill="#3b82f6"
                stroke="#ffffff"
                strokeWidth={2}
                className="cursor-pointer hover:fill-blue-700 transition-colors"
              />
              <text
                textAnchor="middle"
                y={-10}
                style={{
                  fontFamily: "system-ui",
                  fontSize: "8px",
                  fill: "#1e293b",
                  fontWeight: "500",
                  stroke: "#ffffff",
                  strokeWidth: 0.5,
                  paintOrder: "stroke",
                }}
              >
                {name}
              </text>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default memo(DesingersMap);