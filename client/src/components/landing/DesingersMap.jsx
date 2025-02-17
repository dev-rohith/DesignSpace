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

const colors = {
  primary: "#2563eb",
  highlight: "#1d4ed8",
  background: "#f8fafc",
  muted: "#cbd5e1",
  text: "#0f172a",
  light: "#ffffff",
};

const DesignersMap = ({ locations }) => {
  const [zoom, setZoom] = useState(5);
  const [center, setCenter] = useState([77.5, 12.9]);

  const handleZoomIn = () => {
    if (zoom < 8) setZoom(zoom + 1);
  };

  const handleZoomOut = () => {
    if (zoom > 1) setZoom(zoom - 1);
  };

  return (
    <div className="w-full md:max-w-2xl  border h-86 relative bg-slate-50 rounded-xl overflow-hidden shadow-sm">
      <div className="absolute right-4 bottom-4 z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="p-2 bg-white rounded-lg shadow-md hover:bg-slate-50 transition-colors disabled:bg-slate-100 disabled:opacity-50"
          disabled={zoom > 8}
        >
          <Plus size={20} className="text-slate-600" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-white rounded-lg shadow-md hover:bg-slate-50 transition-colors disabled:bg-slate-100 disabled:opacity-50"
          disabled={zoom < 2}
        >
          <Minus size={20} className="text-slate-600" />
        </button>
      </div>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 100,
        }}
        className="w-full h-full"
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
                        geo.properties.name === "India"
                          ? colors.primary
                          : colors.muted,
                      stroke: colors.light,
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                    hover: {
                      fill:
                        geo.properties.name === "India"
                          ? colors.highlight
                          : "#94a3b8",
                      stroke: colors.light,
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                    pressed: {
                      fill:
                        geo.properties.name === "India" ? "#1e40af" : "#cbd5e1",
                      stroke: colors.light,
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
              <circle
                r={4}
                fill={colors.primary}
                stroke={colors.light}
                strokeWidth={2}
                className="cursor-pointer hover:fill-blue-700 transition-colors"
              />
              <text
                textAnchor="middle"
                y={-8}
                style={{
                  fontFamily: "system-ui",
                  fill: colors.text,
                  fontSize: "8px",
                  fontWeight: "500",
                  stroke: colors.light,
                  strokeWidth: 0.5,
                  paintOrder: "stroke",
                }}
              >
                {marker.address.city}
              </text>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default memo(DesignersMap);
