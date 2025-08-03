import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import AttractionMap from "../components/AttractionMap";
import NearbyHotels from "../components/NearbyHotels";
import NearbyRestaurants from "../components/NearbyRestaurants";
import AttractionPhotos from "../components/AttractionPhotos";
import AttractionTimetable from "../components/AttractionTimetable";
import AttractionDescription from "../components/AttractionDescription";
import Booking from "../components/Booking";


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

  const [coord, setCoord] = useState<Coord | null>(null);
  const [openingHours, setOpeningHours] = useState<string[]>([]);
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    async function getAttractionInfo() { 
      const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
      //const { Geocoder } = await google.maps.importLibrary("geocoding") as google.maps.GeocodingLibrary;

      const request = {
        textQuery: attract,
        fields: ["displayName", "formattedAddress", "id", "editorialSummary",  
          "location", "regularOpeningHours",], // or other needed fields
        locationBias: { lat: 25.033964, lng: 121.564468 },
        language: "en-US",
        maxResultCount: 1,
      };

      const { places } = await Place.searchByText(request); 
      const myAttraction = places[0];
      const summary = myAttraction.editorialSummary;
      const placeId = myAttraction.id;
      const placeLatLng = myAttraction.location;
      const hours = myAttraction.regularOpeningHours;

      console.log("LATLNG: " + placeLatLng);
      console.log(placeId);

      setDescription(summary || null);

      if (placeLatLng) {
        setCoord({
          lat: placeLatLng.lat(),
          lng: placeLatLng.lng(),
        });
      } else {
        setCoord(null);
      }

      if (hours?.weekdayDescriptions) {
      setOpeningHours(hours.weekdayDescriptions);
      }
    }

    getAttractionInfo();
  }, [attract]);  

  return (
    <div className="attraction-content-container">
      <div className="attraction-c1">
      {/* Attraction Page Title & 3 Attraction Photos */}
      <div className="">
          <h1 className="attraction-title">{formatAttractionName(attract)}</h1>
          <AttractionPhotos attract={formatAttractionName(attract)}></AttractionPhotos>
        </div>

        {/* Anchor Navigation Bar */}
        <nav className="section-nav">
          <ul>
            <HashLink to="#overview" className="anchor-link">Overview</HashLink>
            <HashLink to="#ai-description" className="anchor-link">Description</HashLink>
            <HashLink to="#attraction-map" className="anchor-link">Map</HashLink>
            <HashLink to="#hours" className="anchor-link">Hours</HashLink>
            <HashLink to="#hotels" className="anchor-link">Hotels</HashLink>
            <HashLink to="#restaurants" className="anchor-link">Restaurants</HashLink>
          </ul>
        </nav>

        <div className="">
          <div className="commodities-container">
            {description && (
              <div id="overview" className="attraction-description">
                <h2 className="attraction-sub-titles">Overview</h2>
                <p>{description}</p>
                <div className="map-and-hours-section">
                  <div id="attraction-map">
                    <h2 className="attraction-sub-titles">Map</h2>
                    {coord && <AttractionMap lat={coord.lat} lng={coord.lng}></AttractionMap>}
                  </div>
                </div>
              </div>
            )}
            
            <div id="ai-description">
            <AttractionDescription placeName={formatAttractionName(attract)}/>
            </div>
          </div>

          <div id="hours">
            <AttractionTimetable hours={openingHours} />
          </div>

          <div className="commodities-container">
            <div id="hotels">
              {coord && <NearbyHotels lat={coord.lat} lng={coord.lng}></NearbyHotels>}
            </div>
            <div id="restaurants">
              {coord && <NearbyRestaurants lat={coord.lat} lng={coord.lng}></NearbyRestaurants>}
            </div>
          </div>

        </div>  
      </div>
      <div className="attraction-c2">
        <Booking />
      </div>
    </div>
  )
}

export default Attraction
