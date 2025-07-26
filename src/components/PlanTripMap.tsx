import { APIProvider, Map, ColorScheme, useMap } from '@vis.gl/react-google-maps';
import { useEffect } from 'react';

const PlanTripMap = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const taiwanLatLng = { lat: 23.6978, lng: 120.9605 }; 
  
  const mapOptions = { 
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    keyboardShortcuts: false,
    gestureHandling: 'none'
  }

  const map = useMap(); /* star */

  useEffect(() => {

    if (!map) return;
    async function getDirections() {
      const { DirectionsService } = await google.maps.importLibrary("routes") as google.maps.RoutesLibrary;
      const { DirectionsRenderer } = await google.maps.importLibrary('routes') as google.maps.RoutesLibrary;
      // const { DirectionsStatus } = await google.maps.importLibrary('routes') as google.maps.RoutesLibrary;

      const directionService = new DirectionsService();
      const directionRenderer = new DirectionsRenderer();
      directionRenderer.setMap(map); /* star */

      const request: google.maps.DirectionsRequest = {
        origin: { lat: 25.0330, lng: 121.5654 }, // Taipei 101
        destination: { lat: 24.1477, lng: 120.6736 }, // Taichung
        waypoints: [
          { location: { lat: 25.1372, lng: 121.5065 }, stopover: true }, // New Taipei City
          { location: { lat: 24.1332, lng: 120.6492 }, stopover: true }, // Rainbow Village, Taichung
        ],
        travelMode: google.maps.TravelMode.DRIVING,
        region: 'TW',
      };

      /* bug, when you click on to this page, you can't navigate to the other pages */

      directionService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log('Directions request successful:', result);
          // directionsRenderer.setMap(mapRef);
          directionRenderer.setDirections(result); /* star */
        } else {
          console.error('Directions request failed due to ' + status);
        }
      });

    }
    getDirections();
  }, [map]);

  return (
    <>
      <div id="regions-container" className='flex lg:flex-row flex-col w-full justify-center items-center'>
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
            </Map>
          </APIProvider>
        </div>
      </div>
    </>
  )
}

export default PlanTripMap;
