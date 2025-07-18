import { APIProvider, Map, type MapCameraChangedEvent, ColorScheme, Marker } from '@vis.gl/react-google-maps';
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
    disableDefaultUI: true,
    keyboardShorcuts: false,
    gestureHandling: 'none'
  }

  

  // API related code goes in useEffect
  useEffect(() => { 
    // defines the properties for the symbol icon
    async function defineSymbol() {
      const { SymbolPath } = await google.maps.importLibrary("core") as google.maps.CoreLibrary; // gets the SymbolPath constants to access symbol types

      const baseSymbol = {
        path: SymbolPath.CIRCLE, // set the symbol to circle type 
        fillColor: "red", 
        fillOpacity: 0.5,
        scale: 16,
        strokeColor: 'black',
        strokeWeight: 2,
      };
      const hoverSymbol = {
        ...baseSymbol,
        scale: 32,
      };
      const clickedHoveredSymbol = {
        ...hoverSymbol,
        fillColor: "blue", 
      };
      const clickedSymbol = {
        ...baseSymbol,
        fillColor: "blue",
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
      <h1 id="regions-title">Regions of Taiwan</h1>

      <div id="regions-container" className='flex flex-col w-full justify-center items-center'>
        <div className='border-0 rounded-4xl overflow-hidden m-6'>
          <APIProvider apiKey={apiKey}>
            <Map 
              id="map"
              defaultZoom={8} 
              defaultCenter={ taiwanLatLng }
              style={{ width: "600px", height: "720px"}}
              colorScheme={ColorScheme.LIGHT}
              onCameraChanged={ (ev: MapCameraChangedEvent) =>
                console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
              }
              // @ts-expect-error ensures expected errors
              options={ mapOptions }
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
