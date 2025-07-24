import { APIProvider, Map, ColorScheme } from '@vis.gl/react-google-maps';
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

  useEffect(() => {
    async function getDirections() {
      const { DirectionsService } = await google.maps.importLibrary("routes") as google.maps.RoutesLibrary;
      const { DirectionsRenderer } = await google.maps.importLibrary('routes') as google.maps.RoutesLibrary;
    }
  })

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
