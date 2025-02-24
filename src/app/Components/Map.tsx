"use client"
import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  height?: string;
  className?: string;
}

// Create marker icon configuration
const createIcon = () => L.icon({
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

// Scroll zoom controller component
const ScrollZoomController = () => {
  const map = useMap();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      if (typeof window === 'undefined') return;

      const mapElement = map.getContainer();
      const rect = mapElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distanceFromCenter = Math.abs(elementCenter - viewportCenter) / viewportHeight;
      const newZoom = 14 + ((1 - distanceFromCenter) * 4);

      map.setZoom(Math.min(Math.max(newZoom, 14), 18), {
        animate: true,
        duration: 0.5
      });
    };

    window?.addEventListener('scroll', handleScroll);
    return () => window?.removeEventListener('scroll', handleScroll);
  }, [map, isMounted]);

  return null;
};

const Map = ({ height = '170px', className = '' }: MapProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const targetLocation: [number, number] = [6.456559134970387, 3.3842979366622847];

  useEffect(() => {
    setIsMounted(true);

    if (!isMounted) return;

    // Initialize Leaflet icons
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .marker-bounce {
        animation: bounce 0.5s ease-in-out infinite alternate;
      }
      @keyframes bounce {
        from { transform: translateY(0); }
        to { transform: translateY(-10px); }
      }
      .leaflet-container {
        background: #1a1a1a !important;
        z-index: 1 !important;
      }
      .leaflet-tile-pane {
        filter: grayscale(80%) invert(100%) contrast(90%) hue-rotate(180deg) brightness(85%);
      }
      .leaflet-control-attribution {
        display: none;
      }
      .leaflet-pane {
        z-index: 1 !important;
      }
      .leaflet-top,
      .leaflet-bottom {
        z-index: 1 !important;
      }
      .leaflet-touch .leaflet-control-zoom {
        border: none;
        background: rgba(0,0,0,0.5);
      }
      .leaflet-control-zoom-in,
      .leaflet-control-zoom-out {
        color: white !important;
        background: transparent !important;
      }
      .leaflet-control-zoom a:hover {
        background: rgba(255,255,255,0.1) !important;
      }
      .leaflet-marker-icon {
        filter: brightness(1.2);
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [isMounted]);

  return (
    <div style={{
      height,
      width: '100%',
      position: 'relative',
      zIndex: 1
    }} className={className}>
      <MapContainer
        center={targetLocation}
        zoom={15}
        style={{
          height: '100%',
          width: '100%',
          borderRadius: '15px',
          position: 'relative',
          zIndex: 1
        }}
        zoomControl={true}
        scrollWheelZoom={true}
        dragging={true}
        doubleClickZoom={true}
        touchZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution=""
        />
        <Marker
          position={targetLocation}
          icon={createIcon()}
        />
        <ScrollZoomController />
      </MapContainer>
    </div>
  );
};

export default Map;
