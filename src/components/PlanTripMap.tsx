import { APIProvider, Map, ColorScheme, useMap } from '@vis.gl/react-google-maps';
import { useEffect, useState, useRef } from 'react';

type TravelMode = google.maps.TravelMode; // Importing google maps TravelMode type


function RouteRenderer({ mode }: { mode: TravelMode }) {
  const map = useMap();
  const [duration, setDuration] = useState<string | null>(null);
  const directionRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!map) return;

    async function getDirections() {
      const { DirectionsService } = await google.maps.importLibrary("routes") as google.maps.RoutesLibrary;
      const { DirectionsRenderer } = await google.maps.importLibrary('routes') as google.maps.RoutesLibrary;
      // const { DirectionsStatus } = await google.maps.importLibrary('routes') as google.maps.RoutesLibrary;

      if (directionRendererRef.current) {
        directionRendererRef.current.setMap(null); // Clear previous directions
      }
      
      const directionService = new DirectionsService();
      const directionRenderer = new DirectionsRenderer();
      directionRenderer.setMap(map); /* star */
      directionRendererRef.current = directionRenderer;

      const request: google.maps.DirectionsRequest = {
        origin: { lat: 25.0478, lng: 121.5170 }, // Taipei 101
        destination: { lat: 24.1375, lng: 120.6869 }, // Taichung
        // waypoints: [
        //   { location: { lat: 25.1372, lng: 121.5065 }, stopover: true }, // New Taipei City
        //   { location: { lat: 24.1332, lng: 120.6492 }, stopover: true }, // Rainbow Village, Taichung
        // ],
        travelMode: mode, // Travel mode can be 'DRIVING', 'WALKING', 'BICYCLING', or 'TRANSIT'
        region: 'TW',
      };

      /* bug, when you click on to this page, you can't navigate to the other pages */

      setLoading(true);
      directionService.route(request, (result, status) => {
        setLoading(false);
        if (status === google.maps.DirectionsStatus.OK && result) {
          console.log('Directions request successful:', result);
          // directionsRenderer.setMap(mapRef);
          directionRenderer.setDirections(result); /* star */
          const legs = result.routes[0]?.legs ?? []; // Get the legs of the route
          const totalSeconds = legs.reduce((acc, leg) => acc + (leg.duration?.value ?? 0), 0); // Sum the duration of all legs
          const hours = Math.floor(totalSeconds / 3600); // Convert seconds to hours
          const minutes = Math.round((totalSeconds % 3600) / 60);
          // Format the duration string
          let durationStr = '';
          if (hours > 0) { // Only add hours if they are greater than 0
            durationStr += `${hours} hour${hours > 1 ? 's' : ''}`; 
          }
          if (minutes > 0) { // Only add minutes if they are greater than 0
            if (durationStr) {
              durationStr += ' ';
            }
            durationStr += `${minutes} min`;
          }
          console.log('Total duration:', durationStr);
          setDuration(durationStr);
        } else {
          console.error('Directions request failed:', status);
          setDuration(null);
        }
      });
    }

    getDirections();
  }, [map, mode]);

  return duration ? (
    <div
      style={{ // Temp. styling for the duration display
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        background: 'white',
        padding: '8px 12px',
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        zIndex: 1000,
      }}
    >
      Estimated time: {duration}
    </div>
  ) : null;
}

const PlanTripMap = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const taiwanLatLng = { lat: 23.6978, lng: 120.9605 }; 
  const [mode, setMode] = useState<TravelMode>(google.maps.TravelMode.DRIVING); // Default travel mode
  
  const mapOptions = { 
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    keyboardShortcuts: false,
    gestureHandling: 'none'
  }

  return (
    <>
      <div id="regions-container" className='flex lg:flex-row flex-col w-full justify-center items-center'>
        <div className="flex gap-4 mt-4">
          {/* Temp travel mode buttons */}
          {([ google.maps.TravelMode.DRIVING, google.maps.TravelMode.WALKING, google.maps.TravelMode.BICYCLING,
              google.maps.TravelMode.TRANSIT, ] as google.maps.TravelMode[]).map((m) => (
            <button
              key={m}
              className={`px-4 py-2 rounded ${
                mode === m ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setMode(m)}
            >
              {m}
            </button>
          ))}
        </div>
        <div className='map-container border-0 rounded-4xl overflow-hidden m-6'>
          <APIProvider apiKey={apiKey}>
            <Map 
              id="map"
              defaultZoom={8} 
              defaultCenter={ taiwanLatLng }
              style={{ width: "600px", height: "750px" }}
              colorScheme={ColorScheme.LIGHT}
        
              // onCameraChanged={ (ev: MapCameraChangedEvent) =>
              //   console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
              // }
              // @ts-expect-error ensures expected errors
              options={ mapOptions }
              disableDefaultUI
            >
              <RouteRenderer mode={mode} />
            </Map>
          </APIProvider>
        </div>
      </div>
    </>
  )
}

export default PlanTripMap;
