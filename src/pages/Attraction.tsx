import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AttractionMap from "../components/AttractionMap";
import NearbyHotels from "../components/NearbyHotels";
import NearbyRestaurants from "../components/NearbyRestaurants";
import AttractionPhotos from "../components/AttractionPhotos";

type Coord = { lat: number; lng: number };

const Attraction = () => {
  const { attract } = useParams();

  function formatAttractionName(slug: string | undefined) {
    if (!slug) return '';
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }


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
    <>
    <div>
      <h1 className="attraction-title">{formatAttractionName(attract)}</h1>
      <AttractionPhotos attract={formatAttractionName(attract)}></AttractionPhotos>
      {/* opening hours */}
      <div className="container">
        {coord && <AttractionMap lat={coord.lat} lng={coord.lng}></AttractionMap>}
        <div className="commodities-container">
          {coord && <NearbyHotels lat={coord.lat} lng={coord.lng}></NearbyHotels>}
          {coord && <NearbyRestaurants lat={coord.lat} lng={coord.lng}></NearbyRestaurants>}
        </div>
      </div>
    </div>
      
    </>
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
