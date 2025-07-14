import City from "../components/City"
import { useEffect } from "react";

const Destinations = () => {

  // ensure that block of code is only loaded after the loading of the component
  useEffect(() => {
    async function initMap() {
      // get the Google Maps Library, specifically the Map object 
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

      // create new map object (2 required parameters)
      new Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 25.0330, lng: 121.5654}, // set coordinates to taipei city 
        zoom: 8, // set zoom to 8 
      });
    }
    // initialize the map 
    initMap();
  }, []); // empty array dependency so the effect only runs once

  // page content 
  return (
    <>
      <div>
        <div id="bg-image-half-size"></div>
      </div>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      <div>
        <City></City>
      </div>
    </>
  )
}

export default Destinations
