import { APIProvider, Map, ColorScheme, useMap } from '@vis.gl/react-google-maps';
import { useEffect, useState, useRef } from 'react';

type TravelMode = 'DRIVING' | 'WALKING' | 'TRANSIT' | 'BICYCLING';


const colorBasedOnMode: Record<TravelMode, string> = {
  WALKING: '#06B6D4',   // cyan
  DRIVING: '#1E3A8A',   // dark blue
  TRANSIT: '#84CC16',   // lime green
  BICYCLING: '#F87171', // red
};



function RouteRenderer({ mode, fullRoute }: { mode: TravelMode; fullRoute: { lat: number; lng: number }[] }) {
  const map = useMap();
  const [duration, setDuration] = useState<string | null>(null);
  const directionRendererRef = useRef<google.maps.DirectionsRenderer[]>([]);
  const polylinesRef = useRef<google.maps.Polyline[]>([]);
  const markerRef = useRef<google.maps.Marker[]>([]);
  


  useEffect(() => {
    if (!map || typeof google === 'undefined') return;

    async function getDirections() {
      directionRendererRef.current.forEach(renderer => 
        renderer.setMap(null) // Clear previous directions
      );
      directionRendererRef.current = []; // Reset the ref

      polylinesRef.current.forEach(polyline => 
        polyline.setMap(null) // Clear previous polylines
      );
      polylinesRef.current = []; // Reset the polylines array

      markerRef.current.forEach(marker => 
        marker.setMap(null) // Clear previous markers
      );
      markerRef.current = []; // Reset the markers array

      
      
      await google.maps.importLibrary('geometry');
      const { DirectionsService } = await google.maps.importLibrary("routes") as google.maps.RoutesLibrary;
      const { DirectionsRenderer } = await google.maps.importLibrary('routes') as google.maps.RoutesLibrary;
      // const { DirectionsStatus } = await google.maps.importLibrary('routes') as google.maps.RoutesLibrary;
      
      let totalSeconds = 0; // Initialize total seconds for duration calculation
      const directionService = new DirectionsService();



      if (mode == google.maps.TravelMode.TRANSIT) {
        
        for(let i = 0; i < fullRoute.length - 1; i++) { // Loop through each segment of the full route if mode is transit
          const start = fullRoute[i];
          const end = fullRoute[i + 1];
          
          
          const request: google.maps.DirectionsRequest = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.TRANSIT,
            region: 'TW',
          };
          await new Promise<void>((resolve) => { 
            directionService.route(request, (result, status) => {
              if (status === google.maps.DirectionsStatus.OK && result) {
                const steps = result.routes[0]?.legs.flatMap(leg => leg.steps ?? []); // Flatten the steps from all legs to calculate total duration
                steps.forEach((step) => {
                  if (step.duration?.value) { // Check if duration is available for the step
                    totalSeconds += step.duration.value; // Sum the duration of all steps
                  }
                  // @ts-ignore: polyline is still supported by API even though deprecated
                  const decodedPath = google.maps.geometry.encoding.decodePath(step.polyline?.points || '');
                  const currentColor = colorBasedOnMode[step.travel_mode as TravelMode] || '#999999'; // Default to gray if mode is not recognized
                  const polyline = new google.maps.Polyline({
                    path: decodedPath,
                    strokeColor: currentColor,
                    strokeWeight: 4,
                    strokeOpacity: 1,
                    map: map,
                  });
                  polylinesRef.current.push(polyline); // Store the polyline for later cleanup
                });
                } else {
                console.error(`Transit segment failed from ${i}:`, status);
              }
              resolve();
            });
          });
        }
        fullRoute.forEach((location, index) => { 
        // Create a marker for each location in the full route
        // @ts-ignore: Marker is still supported by the Google Maps API
          const marker = new google.maps.Marker({
            position: location,
            map: map,
            label: {
              text: String.fromCharCode(65 + index), // Label markers with letters A, B, C, etc.
              color: 'white',
              fontWeight: 'bold',
            },
          });
          markerRef.current.push(marker); // Store the marker for later cleanup
        });
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
        setDuration(durationStr.trim());
      } else {
        // Request directions for the entire route if mode is not transit
        const origin = fullRoute[0];
        const destination = fullRoute[fullRoute.length - 1];
        const waypoints = fullRoute.slice(1, -1).map(location => ({ location, stopover: true })); // Create waypoints from the full route
        const request: google.maps.DirectionsRequest = {
          origin,
          destination,
          waypoints,
          travelMode: google.maps.TravelMode[mode],
          region: 'TW',
        };
        directionService.route(request, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            const directionRenderer = new DirectionsRenderer({
              polylineOptions: {
                strokeColor: colorBasedOnMode[mode], // Use color based on travel mode
                strokeWeight: 4, // Thickness of the route line 
              },
            });
            directionRenderer.setDirections(result); // Set the directions for the renderer
            directionRenderer.setMap(map); // Render the directions on the map
            directionRendererRef.current.push(directionRenderer); // Store the renderer in the ref
            const legs = result.routes[0].legs ?? [];
            totalSeconds = legs.reduce((acc, leg) => acc + (leg.duration?.value ?? 0), 0); // Calculate total duration in seconds
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
            setDuration(durationStr.trim());
          } else {
            console.error('Directions request failed:', status);
            setDuration(null); // Set duration to null if request fails
          }
        });
      }


      
      

      // const request: google.maps.DirectionsRequest = {
      //   origin: { lat: 25.033964, lng: 121.564468 }, // Taipei 101
      //   destination: { lat: 24.136829, lng: 120.684524 }, // Taichung TRA Station
      //   waypoints: [
      //     { location: { lat: 25.1372, lng: 121.5065 }, stopover: true }, // New Taipei City
      //     { location: { lat: 24.1332, lng: 120.6492 }, stopover: true }, // Rainbow Village, Taichung
      //   ],
      //   travelMode: mode, // Travel mode can be 'DRIVING', 'WALKING', 'BICYCLING', or 'TRANSIT'
      //   region: 'TW',
      // };

      // Request directions from the DirectionsService
      // directionService.route(request, (result, status) => {
      //   if (status !== google.maps.DirectionsStatus.OK || !result) { // Check if the result is valid, if not, set duration to null
      //     console.error('Directions request failed due to:', status);
      //     setDuration(null); 
      //     return;
      //   }

  
      
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

const PlanTripMap = ({ routeCoordinates }: { routeCoordinates: { lat: number; lng: number }[] }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const taiwanLatLng = { lat: 23.6978, lng: 120.9605 }; 
  const [mode, setMode] = useState<TravelMode | null>(null);
  const [isGoogleReady, setIsGoogleReady] = useState(false);
  const [mapOptions, setMapOptions] = useState<google.maps.MapOptions | undefined>(undefined);


  const fullRoute = routeCoordinates;

  useEffect(() => { // Delay setting the mode until Google Maps is loaded
    const interval = setInterval(() => {
      if (window.google?.maps?.TravelMode && window.google?.maps?.ControlPosition) {
        setIsGoogleReady(true);
        setMode('DRIVING'); // Default travel mode
        setMapOptions({
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT,
          },
          keyboardShortcuts: true,
          gestureHandling: 'greedy',
          restriction: {
            latLngBounds: {
              north: 25.4,
              south: 21.7,
              west: 119.3,
              east: 122.1,
            },
            strictBounds: true,
          },
          minZoom: 6,
          maxZoom: 18,
        });
        clearInterval(interval);
      }
    }, 100);
  }, []);

  


  return (
    <>
      <div id="regions-container" className='flex flex-col'>
        <div className='plan-map-container relative'>
          <APIProvider apiKey={apiKey} libraries={['geometry']}>
            {isGoogleReady && (
            <Map 
              id="map"
              defaultZoom={8} 
              defaultCenter={ taiwanLatLng }
              style={{ width: "40vw", height: "93vh" }}
              colorScheme={ColorScheme.LIGHT}
        
              // onCameraChanged={ (ev: MapCameraChangedEvent) =>
              //   console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
              // }
              // @ts-expect-error ensures expected errors
              options={ mapOptions }
              disableDefaultUI
            >
              {mode && fullRoute.length > 1 && <RouteRenderer mode={mode} fullRoute={fullRoute}/>} 
            </Map>
            )}
          </APIProvider>
        </div>
        <div className='absolute'>
          {/* Temp travel mode buttons */}
          {isGoogleReady && (['DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT'] as google.maps.TravelMode[]).map((m) => (
            <button
              key={m}
              className={`px-4 py-2 mr-2 ${
                mode === m ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setMode(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default PlanTripMap;
