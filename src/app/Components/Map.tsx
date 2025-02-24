"use client"
import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface MapProps {
  height?: string;
  className?: string;
}

const Map = ({ height = '130px', className = '' }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const targetLocation = { lat: 6.456559134970387, lng: 3.3842979366622847 };

  useEffect(() => {
    let isMounted = true; // Add cleanup flag

    const initMap = async () => {
      if (!mapRef.current || !isMounted) return;

      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
          version: 'weekly',
        });

        const google = await loader.load();
        const { Map: GoogleMap } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        const { Marker } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

        mapInstanceRef.current = new GoogleMap(mapRef.current as HTMLElement, {
          center: targetLocation,
          zoom: 14,
          disableDefaultUI: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });

        new Marker({
          position: targetLocation,
          map: mapInstanceRef.current,
        });

        // Scroll handler
        const handleScroll = () => {
          if (!mapRef.current || !mapInstanceRef.current) return;

          const rect = mapRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const elementCenter = rect.top + rect.height / 2;
          const viewportCenter = viewportHeight / 2;

          const distanceFromCenter = Math.abs(elementCenter - viewportCenter) / viewportHeight;
          const newZoom = 14 + ((1 - distanceFromCenter) * 4);

          mapInstanceRef.current.setZoom(Math.min(Math.max(newZoom, 14), 18));
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: height,
        borderRadius: '15px',
      }}
      className={className}
    />
  );
};

export default Map;
