import { APIProvider, Map, type MapCameraChangedEvent, ColorScheme, Marker } from '@vis.gl/react-google-maps';

const Regions = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  return (
    <div id="regions-container" className='flex flex-col w-full justify-center items-center'>
      <h1 id="regions-title">Regions of Taiwan</h1>
      <div className='border-0 rounded-4xl overflow-hidden m-6'>
        <APIProvider apiKey={apiKey}>
          <Map 
            defaultZoom={8} 
            defaultCenter={{ lat: 23.6978, lng: 120.9605 }}
            style={{ width: "600px", height: "720px"}}
            colorScheme={ColorScheme.LIGHT}
            onCameraChanged={ (ev: MapCameraChangedEvent) =>
              console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
            }
            // @ts-expect-error ensures expected errors
            options={{
              fullscreenControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              disableDefaultUI: true,
              keyboardShorcuts: false,
              gestureHandling: 'none'
            }}
          >
            {/* taipei city marker */}
            <Marker position={{ lat: 25.0329, lng: 121.5654 }}></Marker>  
            {/* hualien city marker */}
            <Marker position={{ lat: 23.9742, lng: 121.6016 }}></Marker>  
            {/* yilan city marker */}
            <Marker position={{ lat: 24.7571, lng: 121.7539 }}></Marker>
            {/* taichung city marker */}
            <Marker position={{ lat: 25.0329, lng: 121.5654 }}></Marker>  
            {/* taipei city marker */}
            <Marker position={{ lat: 24.1477, lng: 120.6736 }}></Marker>  
            {/* taichung city marker */}
            <Marker position={{ lat: 23.0000, lng: 120.2270 }}></Marker> 
            {/* kaohsiung city marker */}
            <Marker position={{ lat: 22.6273, lng: 120.3014 }}></Marker>  
          </Map>
        </APIProvider>
      </div>
    </div>
  )
};

export default Regions;
