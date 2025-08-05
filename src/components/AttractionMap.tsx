import { useEffect, useState } from 'react';
import {
  APIProvider,
  Map,
  Marker,
} from '@vis.gl/react-google-maps';

/**
 * This is a component for the map of an Attraction page.
 */

type Coord = {
  lat: number;
  lng: number;
};

/**
 * Renders a Google Map centered at the given coordinates with a custom marker.
 * @param Coord containing the latitude and longitude of the attraction
 * @returns a Google Map with a custom marker at the attraction's location
 */
const AttractionMap = ({ lat, lng }: Coord) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const [symbol, setSymbol] = useState<google.maps.Symbol | null>(null);

  /**
   * Sets a custom marker symbol for the map.
   */
  useEffect(() => {
    async function defineSymbol() {
      const baseSymbol: google.maps.Symbol = {
        //path for a custom drop pin marker
        path: "M0-48c-9.94,0-18,8.06-18,18c0,11.6,18,30,18,30s18-18.4,18-30C18-39.94,9.94-48,0-48z M0-34a6,6 0 1,0 0,12a6,6 0 1,0 0,-12",        
        fillColor: "crimson",
        fillOpacity: 1,
        scale: 0.75,
        strokeColor: "black",
        strokeWeight: 1,
      };
      
      setSymbol(baseSymbol);
    }

    defineSymbol();
  }, []);

  return (
    <div className="attraction-map" style={{ width: "500px", height: "350px"}}>
      <APIProvider apiKey={apiKey}>
        <Map
          center={{ lat, lng }}
          zoom={15}
          mapId=""
          style={{ width: "100%", height: "100%" }}
          fullscreenControl={false}
          streetViewControl={false}
          mapTypeControl={false}
          disableDefaultUI
          keyboardShortcuts={false}
          gestureHandling='none'
        >
          {/* If an symbol exists, render a marker with the symbol as icon at the attraction's coordinates. */}
          {symbol && (
            <Marker position={{ lat, lng }} icon={symbol} />
          )}
        </Map>
      </APIProvider>
    </div>
  );
};

export default AttractionMap;
