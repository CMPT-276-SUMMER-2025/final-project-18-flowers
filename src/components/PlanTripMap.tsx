import { APIProvider, Map, ColorScheme, useMap } from '@vis.gl/react-google-maps';
import { useEffect, useState, useRef } from 'react';

/**
 * This component renders a Google Map on the PlanTrip page.
 */

type TravelMode = 'DRIVING' | 'WALKING' | 'TRANSIT' | 'BICYCLING';

const colorBasedOnMode: Record<TravelMode, string> = {
  WALKING: '#06B6D4',   // cyan
  DRIVING: '#1E3A8A',   // dark blue
  TRANSIT: '#84CC16',   // lime green
  BICYCLING: '#F87171', // red
};

/**
 * Clear existing map and displays a map with marker, travel mode, travel time and route.
 * @param mode current travel mode
 * @param fullRoute array of coordinates
 * @returns a map with marker, travel mode, travel time and route
 */
function RouteRenderer({ mode, fullRoute }: { mode: TravelMode; fullRoute: { lat: number; lng: number }[] }) {
  const map = useMap();
  const [duration, setDuration] = useState<string | null>(null);
  const directionRendererRef = useRef<google.maps.DirectionsRenderer[]>([]);
  const polylinesRef = useRef<google.maps.Polyline[]>([]);
  const markerRef = useRef<google.maps.Marker[]>([]);
  
  useEffect(() => {
    //Ensures Google Maps is loaded before proceeding.
    if (!map || typeof google === 'undefined') return;

    /**
     * Handles rendering logic, chooses between full route or segment-by-segment rendering and updates duration state to be shown in UI.
     */
    async function getDirections() {
      directionRendererRef.current.forEach(renderer => 
        renderer.setMap(null) // Clears previous directions.
      );
      directionRendererRef.current = []; // Resets the ref.

      polylinesRef.current.forEach(polyline => 
        polyline.setMap(null) // Clears previous polylines.
      );
      polylinesRef.current = []; // Resets the polylines array.

      markerRef.current.forEach(marker => 
        marker.setMap(null) // Clears previous markers.
      );
      markerRef.current = []; // Resets the markers array.

      
      
      await google.maps.importLibrary('geometry');
      const { DirectionsService } = await google.maps.importLibrary("routes") as google.maps.RoutesLibrary;
      const { DirectionsRenderer } = await google.maps.importLibrary('routes') as google.maps.RoutesLibrary;
      // const { DirectionsStatus } = await google.maps.importLibrary('routes') as google.maps.RoutesLibrary;
      
      let totalSeconds = 0; // Initialize total seconds for duration calculation
      const directionService = new DirectionsService();

      /**
       * Draws a route segment between start and end points.
       * @param start start point
       * @param end end point
       * @param segmentMode travel mode
       * @returns rendered route on the map
       */
      const renderSegment = (start: google.maps.LatLngLiteral, end: google.maps.LatLngLiteral, segmentMode: google.maps.TravelMode) => {
        return new Promise<void>((resolve) => {
          const request: google.maps.DirectionsRequest = {
            origin: start,
            destination: end,
            travelMode: segmentMode,
            region: 'TW',
          };

          directionService.route(request, (result, status) => { 
            if (status === google.maps.DirectionsStatus.OK && result) {
              //Flatten the steps from all legs
              const steps = result.routes[0]?.legs.flatMap(leg => leg.steps ?? []); 
              //Calculates duration of the trip.
              steps.forEach((step) => {
                if (step.duration?.value) {
                  totalSeconds += step.duration.value;
                }
                // @ts-ignore: polyline is still supported by API even though deprecated
                const decodedPath = google.maps.geometry.encoding.decodePath(step.polyline?.points || '');
                const polyline = new google.maps.Polyline({
                  path: decodedPath,
                  strokeColor: colorBasedOnMode[step.travel_mode as TravelMode] || '#999999',
                  strokeWeight: 4,
                  strokeOpacity: 1,
                  map: map,
                });
                polylinesRef.current.push(polyline);
              });
            } else {
              console.warn(`Segment failed from ${start.lat},${start.lng} to ${end.lat},${end.lng}:`, status);
            }
            resolve();
          });
        });
      };
      //Decide whether to render the full route at once or segment it.
      if(mode != google.maps.TravelMode.TRANSIT && fullRoute.length <= 27) { // If mode is not transit and route is short enough
        // Create a DirectionsRenderer for the entire route
        const origin = fullRoute[0];
        const destination = fullRoute[fullRoute.length - 1];
        const waypoints = fullRoute.slice(1, -1).map(location => ({ location, stopover: true }));
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
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: colorBasedOnMode[mode],
                strokeWeight: 4,
              },
            });
            directionRenderer.setDirections(result);
            directionRenderer.setMap(map);
            directionRendererRef.current.push(directionRenderer);

            const legs = result.routes[0].legs ?? []; // Get all legs of the route
            totalSeconds = legs.reduce((acc, leg) => acc + (leg.duration?.value ?? 0), 0);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.round((totalSeconds % 3600) / 60);
            let durationStr = '';
            // Only add hours if they are greater than 0
            if (hours > 0) durationStr += `${hours} hour${hours > 1 ? 's' : ''}`; 
            // Only add minutes if they are greater than 0
            if (minutes > 0) durationStr += (durationStr ? ' ' : '') + `${minutes} min`; 
            setDuration(durationStr.trim());
          } else {
            console.error('Directions request failed:', status);
          }
        });
      } else {
        // If mode is transit or route is too long, render each segment individually
        for (let i = 0; i < fullRoute.length - 1; i++) {
          await renderSegment(fullRoute[i], fullRoute[i + 1], google.maps.TravelMode[mode]);
        }
      }
      // Add numbered markers for each location in the full route
      fullRoute.forEach((location, index) => {
        // @ts-ignore: Marker is still supported by the Google Maps API
        const marker = new google.maps.Marker({
          position: location,
          map: map,
          label: {
            text: (index + 1).toString(), // Label markers with numbers starting from 1
            color: 'white',
            fontWeight: 'bold',
          },
        });
        markerRef.current.push(marker);
      });
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.round((totalSeconds % 3600) / 60);
      let durationStr = '';
      if (hours > 0) durationStr += `${hours} hour${hours > 1 ? 's' : ''}`; // Only add hours if they are greater than 0
      if (minutes > 0) durationStr += (durationStr ? ' ' : '') + `${minutes} min`; // Only add minutes if they are greater than 0
      setDuration(durationStr.trim());
    }

    getDirections();
    return () => {
      // Cleanup: remove all polylines, markers, and direction renderers from the map
      polylinesRef.current.forEach(polyline => polyline.setMap(null));
      markerRef.current.forEach(marker => marker.setMap(null));
      directionRendererRef.current.forEach(renderer => renderer.setMap(null));
      polylinesRef.current = [];
      markerRef.current = [];
      directionRendererRef.current = [];
    }
  }, [map, mode, fullRoute]);

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

const PlanTripMap = ({ routeCoordinates, resetTrigger }: { routeCoordinates: { lat: number; lng: number }[]; resetTrigger: number; }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const taiwanLatLng = { lat: 23.6978, lng: 120.9605 }; 
  const [mode, setMode] = useState<TravelMode | null>(null);
  const [isGoogleReady, setIsGoogleReady] = useState(false);
  const [mapOptions, setMapOptions] = useState<google.maps.MapOptions | undefined>(undefined);
  const map = useMap();




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

  useEffect(() => {
    if (map) {
      map.setZoom(7);
      map.setCenter(taiwanLatLng);
    }
  }, [resetTrigger]);

  


  


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
              // @ts-expect-error ensures expected errors
              options={ mapOptions }
              disableDefaultUI
            >
              {mode && routeCoordinates.length > 1 && <RouteRenderer key={JSON.stringify(routeCoordinates)} mode={mode} fullRoute={routeCoordinates}/>} 
            </Map>
            )}
          </APIProvider>
        </div>
        <div className='absolute'>
          {/* Renders each travel mode button */}
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
