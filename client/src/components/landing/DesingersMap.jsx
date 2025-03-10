import React, { memo, useState } from "react";
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

const DesignersMap = ({ locations }) => {
  const [zoom, setZoom] = useState(2);
  const [center, setCenter] = useState([77.5, 12.9]);

  const handleZoomIn = () => {
    if (zoom < 8) setZoom(zoom + 1);
  };

  const handleZoomOut = () => {
    if (zoom > 1) setZoom(zoom - 1);
  };

  return (
    <div className="w-xl md:max-w-2xl  h-80 relative ring-3 ring-offset-3 ring-gray-400 border-2 border-violet-500 overflow-hidden shadow-md">
      <div className="absolute right-4 bottom-4 z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="p-2 bg-white rounded-lg shadow-md hover:bg-violet-50 transition-colors disabled:bg-violet-100 disabled:opacity-50"
          disabled={zoom > 8}
        >
          <Plus size={20} className="text-violet-600" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-white rounded-lg shadow-md hover:bg-violet-50 transition-colors disabled:bg-violet-100 disabled:opacity-50"
          disabled={zoom < 2}
        >
          <Minus size={20} className="text-violet-600" />
        </button>
      </div>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 100,
        }}
        className="w-full h-full bg-blue-100"
      >
        <ZoomableGroup
          center={center}
          zoom={zoom}
          minZoom={1}
          maxZoom={3}
          onMoveEnd={({ coordinates, zoom }) => {
            setCenter(coordinates);
            setZoom(zoom);
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill:
                        geo.properties.name === "India" ? "#60aa41" : "#dffae0",
                      stroke: "#1E3A8A",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                    hover: {
                      fill:
                        geo.properties.name === "India" ? "#6d28d9" : "#c4b5fd",
                      stroke: "#ffffff",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                    pressed: {
                      fill:
                        geo.properties.name === "India" ? "#5b21b6" : "#ddd6fe",
                      stroke: "#ffffff",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>

          {locations.map((marker, index) => (
            <Marker
              key={index}
              coordinates={[
                marker.location.coordinates[1],
                marker.location.coordinates[0],
              ]}
            >
              <g transform="translate(-8, -8)" className="group">
                <circle
                  r={6}
                  fill="#8b5cf6"
                  stroke="#ffffff"
                  strokeWidth={1}
                  className="cursor-pointer group-hover:fill-violet-700 transition-colors"
                />
                <text
                  textAnchor="middle"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  y={-8}
                  style={{
                    fontFamily: "system-ui",
                    fill: "#0a070e",
                    fontSize: "6px",
                    fontWeight: "600",
                    stroke: "#ffffff",
                    strokeWidth: 0.4,
                    paintOrder: "stroke",
                  }}
                >
                  {marker.address.city}
                </text>
              </g>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default memo(DesignersMap);
