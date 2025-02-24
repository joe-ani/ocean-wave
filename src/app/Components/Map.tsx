'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  height?: string;
  className?: string;
}

const ScrollZoomController = () => {
  const map = useMap();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;

    const handleScroll = () => {
      const mapElement = map.getContainer();
      const rect = mapElement.getBoundingClientRect();
      const viewportCenter = (window?.innerHeight || 0) / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distanceFromCenter = Math.abs(elementCenter - viewportCenter) / (window?.innerHeight || 1);
      const newZoom = 14 + ((1 - distanceFromCenter) * 4);

      map.setZoom(Math.min(Math.max(newZoom, 14), 18), {
        animate: true,
        duration: 0.5
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [map, isMounted]);

  return null;
};

const Map: React.FC<MapProps> = ({ height = '150px', className = '' }) => {
  const targetLocation: [number, number] = [6.456559134970387, 3.3842979366622847];
  const [mapIcon, setMapIcon] = useState<L.Icon | null>(null);

  useEffect(() => {
    const icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
      shadowAnchor: [12, 41],
      className: 'marker-bounce'
    });
    setMapIcon(icon);
  }, []);

  return (
    <div style={{ height, width: '100%', position: 'relative', zIndex: 0 }} className={className}>
      <MapContainer
        center={targetLocation}
        zoom={15}
        style={{
          height: '100%',
          width: '100%',
          borderRadius: '15px',
          zIndex: 0,
        }}
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution=""
        />
        {mapIcon && <Marker position={targetLocation} icon={mapIcon} />}
        <ScrollZoomController />
      </MapContainer>
      <style jsx global>{`
        .leaflet-pane,
        .leaflet-tile,
        .leaflet-marker-icon,
        .leaflet-marker-shadow,
        .leaflet-tile-container,
        .leaflet-map-pane svg,
        .leaflet-map-pane canvas,
        .leaflet-zoom-box,
        .leaflet-image-layer,
        .leaflet-layer {
          z-index: 1 !important;
        }
        .leaflet-overlay-pane {
          z-index: 2 !important;
        }
        .leaflet-marker-pane {
          z-index: 3 !important;
        }
        .leaflet-tooltip-pane {
          z-index: 4 !important;
        }
        .leaflet-popup-pane {
          z-index: 5 !important;
        }
        .leaflet-control {
          z-index: 6 !important;
        }
      `}</style>
    </div>
  );
};

export default Map;
