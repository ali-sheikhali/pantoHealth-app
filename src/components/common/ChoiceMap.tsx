import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import type { LatLngExpression } from "leaflet";
import { useCitiesStore } from "../../store/useCitiesStore";
import type { TrainStationType } from "../../types/trainStationTypes";

interface ChoiceMapProps {
  data: TrainStationType[];
}

const GERMANY_CENTER: LatLngExpression = [52.4968124, 13.3794131];

/* ---------- Change map view when center changes ---------- */
function ChangeView({
  center,
  zoom,
}: {
  center: LatLngExpression;
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1 });
  }, [center, zoom, map]);

  return null;
}

export default function ChoiceMap({ data }: ChoiceMapProps) {
  const selectedCity = useCitiesStore((state) => state.selectedCity);
  const [selectedStation, setSelectedStation] =
    useState<TrainStationType | null>(null);

  const stationOfCity = data.filter(
    (station) => station.city === selectedCity
  );

  const mapCenter: LatLngExpression =
    selectedStation
      ? [selectedStation.lat, selectedStation.lng]
      : stationOfCity.length > 0
      ? [stationOfCity[0].lat, stationOfCity[0].lng]
      : GERMANY_CENTER;

  return (
    <>
      {/* ---------- Station List ---------- */}
      <div className="flex gap-10 mb-4">
        {stationOfCity.map((station) => (
          <div
            key={station.id}
            className="font-bold cursor-pointer hover:text-blue-600"
            onClick={() => setSelectedStation(station)}
          >
            {station.name}
          </div>
        ))}
      </div>

      {/* ---------- Map ---------- */}
      <MapContainer
        center={mapCenter}
        zoom={6}
        style={{ height: "500px", width: "100%" }}
      >
        <ChangeView center={mapCenter} zoom={12} />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {stationOfCity.map((station) => (
          <Marker
            key={station.id}
            position={[station.lat, station.lng]}
            eventHandlers={{
              click: () => {
                setSelectedStation(station);
              },
            }}
          >
            <Popup>
              <strong>{station.name}</strong>
              <br />
              {station.city}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}
