import { useState, useEffect, useRef } from "react";
import { MapPin } from "@phosphor-icons/react";
import { Map, MapMarker, MarkerContent, type MapRef } from "./ui/map";

const styles = {
  default: undefined,
  openstreetmap: "https://tiles.openfreemap.org/styles/bright",
  openstreetmap3d: "https://tiles.openfreemap.org/styles/liberty",
};

type StyleKey = keyof typeof styles;

export default function LocationMap() {
  const mapRef = useRef<MapRef>(null);
  const [style, setStyle] = useState<StyleKey>("openstreetmap");
  const selectedStyle = styles[style];
  const is3D = style === "openstreetmap3d";

  useEffect(() => {
    mapRef.current?.easeTo({ pitch: is3D ? 60 : 0, duration: 500 });
  }, [is3D]);

  return (
    <div className="relative h-[220px] w-full rounded-xl overflow-hidden shadow-xs border border-slate-200 mt-3 group">
      <Map
        ref={mapRef}
        center={[77.523719, 12.9614475]} // Cockroach IAS Academy location
        zoom={16}
        styles={
          selectedStyle
            ? { light: selectedStyle, dark: selectedStyle }
            : undefined
        }
      >
        <MapMarker longitude={77.523719} latitude={12.9614475}>
          <MarkerContent>
            <div className="text-brand-red bg-white rounded-full shadow-lg p-1 border-2 border-brand-red">
              <MapPin weight="fill" className="w-6 h-6" />
            </div>
          </MarkerContent>
        </MapMarker>
      </Map>
      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value as StyleKey)}
          className="bg-white text-slate-800 rounded-md border border-slate-200 px-2 py-1 text-[10px] shadow-sm font-mono outline-hidden cursor-pointer"
        >
          <option value="default">Default</option>
          <option value="openstreetmap">2D Map</option>
          <option value="openstreetmap3d">3D Map</option>
        </select>
      </div>
    </div>
  );
}
