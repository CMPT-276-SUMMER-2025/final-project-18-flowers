import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AttractionMap from "../components/AttractionMap";

type Coord = { lat: number; lng: number };

const Attraction = () => {

  const { attract } = useParams();  
  console.log(attract);
  const [coord, setCoord] = useState<Coord | null>(null);

  useEffect(() => {
    async function getAttractionInfo() { 
      const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
      //const { Geocoder } = await google.maps.importLibrary("geocoding") as google.maps.GeocodingLibrary;

      const request = {
        textQuery: attract,
        fields: ["displayName", "formattedAddress", "id", "location"], // or other needed fields
        locationBias: { lat: 25.033964, lng: 121.564468 },
        language: "en-US",
        maxResultCount: 1,
      };

      const { places } = await Place.searchByText(request); 
      const myAttraction = places[0];
      const placeId = myAttraction.id;
      const placeLatLng = myAttraction.location;
      console.log("LATLNG: " + placeLatLng);
      console.log(placeId);
      if (placeLatLng) {
        setCoord({
          lat: placeLatLng.lat(),
          lng: placeLatLng.lng(),
        });
      } else {
        setCoord(null);
      }
    }
    getAttractionInfo();
  }, [attract]);  

  return (
    <div>
      <h1>{attract}</h1>
      {coord && <AttractionMap lat={coord.lat} lng={coord.lng}></AttractionMap>}
      {/* opening hours */}
      {/* restaurants v2 column style */}
      {/* hotels v2 column style */}
    </div>
  )
}


      /*
      const geofinder = new Geocoder();
      const geoRequest = {
        address: placeId,
      };
      geofinder.geocode(geoRequest, () => {
        // get the latitude and longitude of the place ID 
      });

      */

export default Attraction
