import { useEffect, useState } from 'react';
import {
  APIProvider,
  Map,
  Marker,
} from '@vis.gl/react-google-maps';

type Coord = {
  lat: number;
  lng: number;
};

const AttractionMap = ({ lat, lng }: Coord) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const [symbol, setSymbol] = useState<google.maps.Symbol | null>(null);

  useEffect(() => {
    async function defineSymbol() {
      const { SymbolPath } = await google.maps.importLibrary("core") as google.maps.CoreLibrary;

      const baseSymbol: google.maps.Symbol = {
        path: SymbolPath.CIRCLE,
        fillColor: "red",
        fillOpacity: 0.7,
        scale: 16,
        strokeColor: "black",
        strokeWeight: 2,
      };
      
      setSymbol(baseSymbol);
    }

    defineSymbol();
  }, []);

  return (
    <div className="border-0 rounded-3xl overflow-hidden m-6" style={{ width: "600px", height: "400px" }}>
      <APIProvider apiKey={apiKey}>
        <Map
          center={{ lat, lng }}
          zoom={15}
          mapId=""
          style={{ width: "100%", height: "100%" }}
          gestureHandling="none"
          disableDefaultUI
        >
          {symbol && (
            <Marker position={{ lat, lng }} icon={symbol} />
          )}
        </Map>
        
      </APIProvider>
    </div>
  );
};

export default AttractionMap;
