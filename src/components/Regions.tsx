import { APIProvider, Map, ColorScheme, Marker } from '@vis.gl/react-google-maps';
import { citiesLatLng } from '../data/cityData';
import { useEffect, useState } from 'react';
import RegionContent from '../components/RegionContent';

const Regions = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const [baseSymbol, setBaseSymbol] = useState<google.maps.Symbol | null>(null); // sets the appearance of the symbol 
  const [hoverSymbol, setHoverSymbol] = useState<google.maps.Symbol | null>(null); // sets the appearance of the symbol when hovered
  const [clickedBaseSymbol, setClickedBaseSymbol] = useState<google.maps.Symbol | null>(null); // sets the appearance of the symbol 
  const [clickedHoverSymbol, setClickedHoverSymbol] = useState<google.maps.Symbol | null>(null); // sets the appearance of the symbol when hovered
  const [activeSymbolID, setActiveSymbolID] = useState(""); 
  const [activeButton, setActiveButton] = useState("taipei"); 
  const [showComponent, setShowComponent] = useState(true); 
  const [cityName, setCityName] = useState("Taipei City");

  const taiwanLatLng = { lat: 23.6978, lng: 120.9605 }; 

  const mapOptions = { 
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    keyboardShortcuts: false,
    gestureHandling: 'none'
  }

  // API related code goes in useEffect
  useEffect(() => { 
    // defines the properties for the symbol icon
    async function defineSymbol() {

      const baseSymbol = {
        //path for a custom drop pin marker
        path: "M0-48c-9.94,0-18,8.06-18,18c0,11.6,18,30,18,30s18-18.4,18-30C18-39.94,9.94-48,0-48z M0-34a6,6 0 1,0 0,12a6,6 0 1,0 0,-12",
        fillColor: "crimson", 
        fillOpacity: 1,
        scale: 0.75,
        strokeColor: 'black',
        strokeWeight: 1,
      };
      const hoverSymbol = {
        ...baseSymbol,
        scale: 1.25,
      };
      const clickedHoveredSymbol = {
        ...hoverSymbol,
        fillColor: "DodgerBlue", 
      };
      const clickedSymbol = {
        ...baseSymbol,
        fillColor: "DodgerBlue",
      };

      setBaseSymbol(baseSymbol);
      setHoverSymbol(hoverSymbol);
      setClickedBaseSymbol(clickedSymbol);
      setClickedHoverSymbol(clickedHoveredSymbol);
    }
    defineSymbol(); // call function 
  }, [setActiveSymbolID, setActiveButton]); // add hovered state to useEffect dependency s.t. effect is applied only when hovered state is changed/modified

  return (
    <>
      <div id="dummy-map"></div>
      <h1 id="regions-title"><strong>Regions</strong> of Taiwan</h1>
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
              { citiesLatLng.map((city) => (
                <Marker   
                  key={city.id}
                  position={ city.coord }
                  icon={ (activeSymbolID === city.id) ? 
                    ((activeButton === city.id) ? clickedHoverSymbol : hoverSymbol) : ((activeButton === city.id) ? clickedBaseSymbol : baseSymbol) }
                  // when the user hovers over a marker perform this:
                  onMouseOver={() => {
                    setActiveSymbolID(city.id);
                  }}

                  // when the user hovers off a marker perform this:
                  onMouseOut={() => {
                    setActiveSymbolID("");
                  }}

                  onClick={() => {
                    setShowComponent(true);
                    setCityName(city.header);
                    setActiveButton(city.id);
                    
                  }}

                ></Marker>
              ))}

            </Map>
          </APIProvider>
        </div>
        <div className="region-content">{showComponent && <RegionContent key={cityName} cityname={cityName} />}</div>
      </div>
    </>
  )
};

export default Regions;
